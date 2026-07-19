#!/usr/bin/env node
/**
 * J Matrix Twin WebSocket Server
 * Executes J code via ijconsole and streams results to browser
 */

const WebSocket = require('ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = path.join(__dirname, '../public');

// Create HTTP server for static files
const server = http.createServer((req, res) => {
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
    
    const extname = path.extname(filePath);
    const contentTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.svg': 'image/svg+xml'
    };
    
    const contentType = contentTypes[extname] || 'text/plain';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Check if ijconsole is available
function checkJInstallation() {
    return new Promise((resolve) => {
        const proc = spawn('ijconsole', ['--version'], { shell: true });
        proc.on('error', () => resolve(false));
        proc.on('close', (code) => resolve(code === 0));
    });
}

// Execute J code
async function executeJCode(code) {
    return new Promise((resolve, reject) => {
        const jProc = spawn('ijconsole', [], { shell: true });
        
        let stdout = '';
        let stderr = '';
        
        jProc.stdout.on('data', (data) => {
            stdout += data.toString();
        });
        
        jProc.stderr.on('data', (data) => {
            stderr += data.toString();
        });
        
        jProc.on('error', (error) => {
            reject(new Error(`Failed to spawn ijconsole: ${error.message}`));
        });
        
        jProc.on('close', (code) => {
            if (code !== 0 && stderr) {
                reject(new Error(stderr));
            } else {
                // Clean up J output (remove prompts, etc.)
                const cleaned = stdout
                    .split('\n')
                    .filter(line => !line.trim().startsWith('   '))
                    .join('\n')
                    .trim();
                resolve(cleaned);
            }
        });
        
        // Send code to J
        jProc.stdin.write(code + '\n');
        jProc.stdin.write('exit 0\n');
        jProc.stdin.end();
        
        // Timeout after 30 seconds
        setTimeout(() => {
            jProc.kill();
            reject(new Error('Execution timeout (30s)'));
        }, 30000);
    });
}

// WebSocket connection handler
wss.on('connection', async (ws) => {
    console.log('Client connected');
    
    // Check J installation
    const jAvailable = await checkJInstallation();
    
    if (jAvailable) {
        ws.send(JSON.stringify({
            type: 'status',
            status: 'connected',
            message: 'J interpreter available'
        }));
    } else {
        ws.send(JSON.stringify({
            type: 'status',
            status: 'error',
            message: 'J interpreter not found. Install from jsoftware.com'
        }));
    }
    
    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            
            if (data.type === 'execute') {
                console.log('Executing J code...');
                
                if (!jAvailable) {
                    ws.send(JSON.stringify({
                        error: 'J interpreter not available'
                    }));
                    return;
                }
                
                try {
                    const output = await executeJCode(data.code);
                    ws.send(JSON.stringify({
                        type: 'result',
                        output: output
                    }));
                    console.log('Execution successful');
                } catch (error) {
                    ws.send(JSON.stringify({
                        type: 'result',
                        error: error.message
                    }));
                    console.error('Execution error:', error.message);
                }
            }
        } catch (error) {
            console.error('Message handling error:', error);
            ws.send(JSON.stringify({
                error: 'Invalid message format'
            }));
        }
    });
    
    ws.on('close', () => {
        console.log('Client disconnected');
    });
    
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

// Start server
server.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log('J Matrix Twin Playground Server');
    console.log('='.repeat(60));
    console.log(`HTTP Server: http://localhost:${PORT}`);
    console.log(`WebSocket: ws://localhost:${PORT}`);
    console.log('');
    
    checkJInstallation().then(available => {
        if (available) {
            console.log('✓ J interpreter found');
        } else {
            console.log('✗ J interpreter not found');
            console.log('  Install from: https://www.jsoftware.com');
            console.log('  Server will run in demo mode');
        }
        console.log('');
        console.log('Press Ctrl+C to stop');
        console.log('='.repeat(60));
    });
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    wss.clients.forEach(client => {
        client.close();
    });
    server.close(() => {
        console.log('Server stopped');
        process.exit(0);
    });
});

// Made with Bob
