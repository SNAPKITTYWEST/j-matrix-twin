// J Matrix Twin Playground - Main Application
// WebSocket-based J execution with WASM fallback

class JMatrixPlayground {
    constructor() {
        this.ws = null;
        this.connected = false;
        this.execCount = 0;
        this.execTimes = [];
        this.currentExample = 'canvas';
        
        this.initElements();
        this.initExamples();
        this.initEventListeners();
        this.initChat();
        this.loadExample('canvas');
    }

    initElements() {
        // Editor
        this.editor = document.getElementById('codeEditor');
        this.output = document.getElementById('output');
        this.runBtn = document.getElementById('runBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.clearOutputBtn = document.getElementById('clearOutputBtn');
        
        // Status
        this.statusDot = document.getElementById('statusDot');
        this.statusText = document.getElementById('statusText');
        this.execCountEl = document.getElementById('execCount');
        this.avgTimeEl = document.getElementById('avgTime');
        
        // Header
        this.connectBtn = document.getElementById('connectBtn');
        this.docsBtn = document.getElementById('docsBtn');
        this.githubBtn = document.getElementById('githubBtn');
        
        // Chat
        this.chatContainer = document.getElementById('chatContainer');
        this.chatToggle = document.getElementById('chatToggle');
        this.chatBadge = document.getElementById('chatBadge');
        this.closeChatBtn = document.getElementById('closeChatBtn');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendChatBtn = document.getElementById('sendChatBtn');
    }

    initExamples() {
        this.examples = {
            canvas: {
                name: 'Canvas Transform',
                code: `NB. Tacit Matrix Transformation
canvas =: 3 50 $ 'J ENGINE:  NB. ASCII Reshapes                  BQN LOGIC:  Tensor Rotations                NIM RUNTIME: Systems Validation             '

NB. Tacit verbs (point-free)
getRows =: {. @ $
getCols =: {: @ $
padRight =: ] ,. (getRows@] $ 4 $ ' '"_)
addFooter =: ] , (getCols@] + 4"_) {. 'NB. J AUTOMATED GROWTH STEP GENERATED'"_
growCanvasTacit =: addFooter @: padRight

NB. Execute
echo '--- Original Canvas ---'
echo canvas
echo ''
echo '--- After Growth ---'
echo growCanvasTacit canvas
echo ''
echo 'Dimensions: ' , ": $ growCanvasTacit canvas`
            },
            subleq: {
                name: 'SUBLEQ Attention',
                code: `NB. SUBLEQ Attention Mechanism
NB. Replaces softmax with memory-addressed branching

PHI =: 1.6180339887
PHI_INV =: % PHI

NB. Phi-weighted Born collapse
phi_weights =: PHI_INV ^ i. @ #
born_collapse =: 3 : 0
  w =. phi_weights y
  <. 256 | +/ w * y
)

NB. Convert activations to SUBLEQ triads [A,B,C]
activations_to_triads =: 3 : 0
  addrs =. 1 >. 255 <. <. 256 * | y
  n =. 3 * <. (# addrs) % 3
  (n {. addrs) $ ~ ((<. n%3) , 3)
)

NB. Test with sample activations
activations =: 0.5 0.8 0.3 0.9 0.2 0.7 0.4 0.6

echo '--- Input Activations ---'
echo ": activations
echo ''

echo '--- SUBLEQ Triads ---'
triads =: activations_to_triads activations
echo ": triads
echo ''

echo '--- Phi Weights ---'
echo ": phi_weights activations
echo ''

echo '--- Born Collapse Result ---'
echo ": born_collapse 128 64 192 32 224 96 160 48`
            },
            resonance: {
                name: 'ResonanceWord',
                code: `NB. Goldilocks Field Arithmetic
P_GOLD =: 18446744069414584321x

NB. Field operations
gf_add =: P_GOLD & |@+
gf_mul =: P_GOLD & |@*
gf_sub =: P_GOLD & |@-

NB. Class tags
CLASS_PRIME =: 16b01
CLASS_LATTICE =: 16b02
CLASS_SOVEREIGN =: 16b0A

NB. Pack ResonanceWord
rw_pack =: 4 : 0
  cls =. x
  payload =. y
  (cls * 2^56) + (payload * 2^56 <. payload)
)

NB. Test field arithmetic
echo '--- Goldilocks Prime ---'
echo ": P_GOLD
echo ''

echo '--- Field Addition: 999 + 888 ---'
echo ": 999 gf_add 888
echo ''

echo '--- Field Multiplication: 123 * 456 ---'
echo ": 123 gf_mul 456
echo ''

echo '--- Pack ResonanceWord (CLASS_SOVEREIGN, payload=53) ---'
word =: CLASS_SOVEREIGN rw_pack 53
echo ": word
echo ''

echo '--- Lattice Index (mod 12288) ---'
echo ": 12288 | word`
            },
            custom: {
                name: 'Custom Code',
                code: `NB. Write your own J code here!
NB. Try some examples:

NB. 1. Simple array operations
echo 'Sum of 1 to 10:'
echo +/ 1 + i. 10

NB. 2. Matrix creation
echo ''
echo '3x3 Identity Matrix:'
echo =i.3

NB. 3. Tacit programming
double =: +~
echo ''
echo 'Double of 5:'
echo double 5

NB. 4. Array manipulation
echo ''
echo 'Reverse array:'
echo |. 1 2 3 4 5

NB. Your code below:
`
            }
        };
    }

    initEventListeners() {
        // Run code
        this.runBtn.addEventListener('click', () => this.runCode());
        this.editor.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.runCode();
            }
        });
        
        // Editor actions
        this.clearBtn.addEventListener('click', () => {
            this.editor.value = '';
            this.editor.focus();
        });
        
        this.copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(this.editor.value);
            this.showNotification('Code copied to clipboard');
        });
        
        this.clearOutputBtn.addEventListener('click', () => {
            this.output.innerHTML = '<div class="output-placeholder"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="8" width="32" height="32" rx="4"/><line x1="16" y1="16" x2="32" y2="16"/><line x1="16" y1="24" x2="32" y2="24"/><line x1="16" y1="32" x2="24" y2="32"/></svg><p>Run code to see output</p></div>';
        });
        
        // Examples
        document.querySelectorAll('.example-item').forEach(item => {
            item.addEventListener('click', () => {
                const example = item.dataset.example;
                this.loadExample(example);
                
                // Update active state
                document.querySelectorAll('.example-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
        
        // Header actions
        this.connectBtn.addEventListener('click', () => this.connect());
        this.docsBtn.addEventListener('click', () => window.open('../README.md', '_blank'));
        this.githubBtn.addEventListener('click', () => window.open('https://github.com/jessicalw34/j-matrix-twin', '_blank'));
        
        // Chat
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.closeChatBtn.addEventListener('click', () => this.toggleChat());
        this.sendChatBtn.addEventListener('click', () => this.sendChatMessage());
        this.chatInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.sendChatMessage();
            }
        });
        
        // Auto-resize chat input
        this.chatInput.addEventListener('input', () => {
            this.chatInput.style.height = 'auto';
            this.chatInput.style.height = this.chatInput.scrollHeight + 'px';
        });
    }

    initChat() {
        this.chatOpen = false;
        this.chatHistory = [];
    }

    loadExample(name) {
        this.currentExample = name;
        const example = this.examples[name];
        if (example) {
            this.editor.value = example.code;
        }
    }

    async connect() {
        if (this.connected) {
            this.disconnect();
            return;
        }

        try {
            // Try WebSocket connection
            this.ws = new WebSocket('ws://localhost:8080');
            
            this.ws.onopen = () => {
                this.connected = true;
                this.updateStatus('connected', 'Connected');
                this.connectBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="2"/></svg>Disconnect';
                this.showNotification('Connected to J execution server');
            };
            
            this.ws.onclose = () => {
                this.connected = false;
                this.updateStatus('disconnected', 'Disconnected');
                this.connectBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="2"/></svg>Connect';
            };
            
            this.ws.onerror = () => {
                this.connected = false;
                this.updateStatus('error', 'Connection Error');
                this.showNotification('Failed to connect. Using WASM fallback.', 'error');
            };
            
            this.ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.handleServerResponse(data);
            };
            
        } catch (error) {
            this.showNotification('WebSocket not available. Using WASM fallback.', 'error');
            this.updateStatus('disconnected', 'Offline Mode');
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.connected = false;
        this.updateStatus('disconnected', 'Disconnected');
        this.connectBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="2"/></svg>Connect';
    }

    async runCode() {
        const code = this.editor.value.trim();
        if (!code) {
            this.showNotification('Please enter some code', 'error');
            return;
        }

        this.runBtn.disabled = true;
        this.runBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="spin"><circle cx="8" cy="8" r="6" stroke="currentColor" fill="none" stroke-width="2"/></svg>Running...';

        const startTime = performance.now();

        try {
            let result;
            
            if (this.connected && this.ws) {
                // Use WebSocket
                result = await this.executeViaWebSocket(code);
            } else {
                // Use WASM fallback (simulated for now)
                result = await this.executeViaWASM(code);
            }

            const elapsed = performance.now() - startTime;
            this.updateStats(elapsed);
            this.displayOutput(result, elapsed);
            
        } catch (error) {
            this.displayError(error.message);
        } finally {
            this.runBtn.disabled = false;
            this.runBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6V2z"/></svg>Run Code';
        }
    }

    executeViaWebSocket(code) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Execution timeout'));
            }, 30000);

            const messageHandler = (event) => {
                clearTimeout(timeout);
                this.ws.removeEventListener('message', messageHandler);
                
                const data = JSON.parse(event.data);
                if (data.error) {
                    reject(new Error(data.error));
                } else {
                    resolve(data.output);
                }
            };

            this.ws.addEventListener('message', messageHandler);
            this.ws.send(JSON.stringify({ type: 'execute', code }));
        });
    }

    async executeViaWASM(code) {
        // Simulated J execution (replace with actual WASM when available)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Parse and simulate basic J operations
        const lines = code.split('\n').filter(line => {
            const trimmed = line.trim();
            return trimmed && !trimmed.startsWith('NB.');
        });

        const output = [];
        
        for (const line of lines) {
            if (line.includes('echo')) {
                const match = line.match(/echo\s+(.+)/);
                if (match) {
                    const expr = match[1].trim();
                    if (expr.startsWith("'") || expr.startsWith('"')) {
                        output.push(expr.slice(1, -1));
                    } else {
                        output.push(`[Simulated] ${expr}`);
                    }
                }
            }
        }

        if (output.length === 0) {
            output.push('[WASM Mode] Code executed successfully');
            output.push('Note: Full J execution requires WebSocket connection');
            output.push('Install J and run the server: node playground/server/server.js');
        }

        return output.join('\n');
    }

    displayOutput(output, elapsed) {
        this.output.innerHTML = '';
        
        const lines = output.split('\n');
        lines.forEach(line => {
            const div = document.createElement('div');
            div.className = 'output-line';
            div.textContent = line;
            this.output.appendChild(div);
        });

        // Add execution info
        const info = document.createElement('div');
        info.className = 'output-line output-success';
        info.textContent = `\n✓ Executed in ${elapsed.toFixed(2)}ms`;
        this.output.appendChild(info);
    }

    displayError(message) {
        this.output.innerHTML = '';
        const div = document.createElement('div');
        div.className = 'output-line output-error';
        div.textContent = `✗ Error: ${message}`;
        this.output.appendChild(div);
    }

    updateStats(elapsed) {
        this.execCount++;
        this.execTimes.push(elapsed);
        
        // Keep last 10 executions
        if (this.execTimes.length > 10) {
            this.execTimes.shift();
        }

        const avgTime = this.execTimes.reduce((a, b) => a + b, 0) / this.execTimes.length;
        
        this.execCountEl.textContent = this.execCount;
        this.avgTimeEl.textContent = `${avgTime.toFixed(0)}ms`;
    }

    updateStatus(state, text) {
        this.statusDot.className = 'status-dot';
        if (state === 'connected') {
            this.statusDot.classList.add('connected');
        } else if (state === 'error') {
            this.statusDot.classList.add('error');
        }
        this.statusText.textContent = text;
    }

    toggleChat() {
        this.chatOpen = !this.chatOpen;
        this.chatContainer.classList.toggle('open', this.chatOpen);
        this.chatToggle.classList.toggle('hidden', this.chatOpen);
        
        if (this.chatOpen) {
            this.chatBadge.classList.add('hidden');
            this.chatInput.focus();
        }
    }

    sendChatMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Add user message
        this.addChatMessage('user', message);
        this.chatInput.value = '';
        this.chatInput.style.height = 'auto';

        // Simulate AI response
        setTimeout(() => {
            const response = this.generateAIResponse(message);
            this.addChatMessage('assistant', response);
        }, 500);
    }

    addChatMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${role}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = role === 'user' ? 'U' : 'AI';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = this.formatChatMessage(content);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    formatChatMessage(content) {
        // Simple markdown-like formatting
        return content
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    generateAIResponse(message) {
        const lower = message.toLowerCase();
        
        if (lower.includes('tacit') || lower.includes('point-free')) {
            return `Tacit programming in J means writing functions without naming arguments. For example:\n\n\`double =: +~\` (fork: + with itself)\n\`sum =: +/\` (insert + between elements)\n\nThe key is composition: \`@\` (at), \`@:\` (at co), and trains (fork/hook).`;
        }
        
        if (lower.includes('subleq')) {
            return `SUBLEQ is a one-instruction computer: [A,B,C] means:\n1. M[B] := M[B] - M[A]\n2. If M[B] ≤ 0, jump to C\n\nIn attention, this replaces softmax! Activations become memory addresses, SUBLEQ executes, Born collapse selects the winner. No exponentials needed.`;
        }
        
        if (lower.includes('goldilocks') || lower.includes('field')) {
            return `Goldilocks field uses prime p = 2^64 - 2^32 + 1. It's ZK-SNARK friendly (used in Plonky2) and fits in 64-bit integers. ResonanceWord packs 8-bit class + 56-bit payload into one field element.`;
        }
        
        if (lower.includes('born') || lower.includes('collapse')) {
            return `Born collapse uses golden ratio (φ) weights: φ^(-i) for index i. This creates exponential decay without actual exponentials! Sum the weighted values, mod by address space. Same principle as quantum measurement.`;
        }
        
        return `I can help with J syntax, SUBLEQ attention, Goldilocks fields, or matrix operations. Try asking about:\n- Tacit programming\n- SUBLEQ mechanics\n- Field arithmetic\n- Born collapse\n\nOr just run the examples!`;
    }

    showNotification(message, type = 'info') {
        // Simple notification (could be enhanced with a toast library)
        console.log(`[${type.toUpperCase()}] ${message}`);
    }

    handleServerResponse(data) {
        // Handle server messages
        if (data.type === 'status') {
            this.updateStatus(data.status, data.message);
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new JMatrixPlayground();
    });
} else {
    window.app = new JMatrixPlayground();
}

// Add spin animation for loading
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .spin { animation: spin 1s linear infinite; }
`;
document.head.appendChild(style);

// Made with Bob
