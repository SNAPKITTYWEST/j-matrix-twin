# J Matrix Twin Playground

Interactive web-based playground for exploring J tacit programming, SUBLEQ attention mechanisms, and Goldilocks field arithmetic.

## Features

- 🎨 **Clean IBM Carbon-inspired UI** — Professional dark theme with smooth interactions
- 💬 **AI Chat Assistant** — Get help with J syntax, SUBLEQ, and matrix operations
- 🔌 **WebSocket Execution** — Real-time J code execution via ijconsole
- 📦 **WASM Fallback** — Works offline with simulated execution
- 📚 **Built-in Examples** — Canvas transforms, SUBLEQ attention, ResonanceWord
- ⚡ **Live Output** — See results instantly with execution timing
- 🎯 **Keyboard Shortcuts** — Ctrl+Enter to run, intuitive controls

## Quick Start

### 1. Install Dependencies

```bash
cd playground
npm install
```

### 2. Install J (Optional but Recommended)

**Windows:**
```powershell
# Download from https://www.jsoftware.com/download/j9.5_win.exe
# Add to PATH: C:\Program Files\J9.5\bin
```

**macOS:**
```bash
brew install j
```

**Linux:**
```bash
sudo apt install j  # Debian/Ubuntu
```

### 3. Start Server

```bash
npm start
```

Open http://localhost:8080 in your browser.

## Usage

### Running Code

1. Select an example from the sidebar or write custom J code
2. Click "Run Code" or press Ctrl+Enter
3. View output in the bottom panel

### Chat Assistant

1. Click the chat button (bottom right)
2. Ask questions about J, SUBLEQ, or matrix operations
3. Get instant help and code suggestions

### WebSocket Connection

- Click "Connect" to enable real J execution
- Requires ijconsole in PATH
- Falls back to WASM simulation if unavailable

## Examples

### Canvas Transform
Tacit matrix growth with point-free verbs:
```j
getRows =: {. @ $
getCols =: {: @ $
padRight =: ] ,. (getRows@] $ 4 $ ' '"_)
growCanvasTacit =: addFooter @: padRight
```

### SUBLEQ Attention
Replace softmax with memory-addressed branching:
```j
phi_weights =: PHI_INV ^ i. @ #
born_collapse =: 3 : 0
  w =. phi_weights y
  <. 256 | +/ w * y
)
```

### ResonanceWord
Goldilocks field arithmetic for ZK compatibility:
```j
P_GOLD =: 18446744069414584321x
gf_add =: P_GOLD & |@+
gf_mul =: P_GOLD & |@*
```

## Architecture

```
playground/
├── public/              Static files (GitHub Pages)
│   ├── index.html      Main UI
│   ├── styles.css      IBM Carbon styling
│   └── app.js          Frontend logic
├── server/             WebSocket server
│   └── server.js       J execution backend
└── package.json        Dependencies
```

## Deployment

### GitHub Pages

```bash
npm run deploy
```

This deploys the `public/` directory to GitHub Pages.

### Custom Server

```bash
# Production
NODE_ENV=production PORT=3000 npm start

# With PM2
pm2 start server/server.js --name j-matrix-twin
```

## WebSocket Protocol

### Client → Server

```json
{
  "type": "execute",
  "code": "echo 'Hello J'"
}
```

### Server → Client

```json
{
  "type": "result",
  "output": "Hello J"
}
```

Or error:

```json
{
  "type": "result",
  "error": "syntax error"
}
```

## Development

### File Structure

- `public/index.html` — Main HTML structure
- `public/styles.css` — IBM Carbon-inspired styles
- `public/app.js` — Frontend application logic
- `server/server.js` — WebSocket server + static file serving

### Adding Examples

Edit `app.js` and add to the `examples` object:

```javascript
this.examples = {
  myExample: {
    name: 'My Example',
    code: `NB. Your J code here
echo 'Hello World'`
  }
};
```

### Customizing UI

All colors and spacing use CSS variables in `styles.css`:

```css
:root {
  --blue-60: #0f62fe;
  --spacing-05: 1rem;
  /* ... */
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

Requires:
- WebSocket support
- ES6 modules
- CSS Grid

## Performance

- **Cold start:** ~50ms (server spawn)
- **J execution:** 10-500ms (depends on code)
- **WebSocket latency:** <10ms (local)
- **WASM fallback:** ~100ms (simulated)

## Troubleshooting

### "WebSocket connection failed"

1. Check server is running: `npm start`
2. Verify port 8080 is available
3. Check firewall settings

### "J interpreter not found"

1. Install J from jsoftware.com
2. Add ijconsole to PATH
3. Restart terminal/server
4. Use WASM fallback mode

### "Code execution timeout"

- Reduce loop iterations
- Simplify matrix operations
- Check for infinite loops

## Security

- Code execution is sandboxed via ijconsole
- 30-second timeout per execution
- No file system access from browser
- WebSocket origin validation

## License

MIT License - See LICENSE file

## Author

Jessica (SNAPKITTYWEST)  
Email: jessicalw34@gmail.com  
GitHub: https://github.com/jessicalw34/j-matrix-twin

## Acknowledgments

- J Software (jsoftware.com) for the J language
- IBM Carbon Design System for UI inspiration
- Ahmad Ali Parr (prior collaborator)

## Links

- [J Language](https://www.jsoftware.com)
- [Main Project](../README.md)
- [Integration Guide](../INTEGRATION.md)
- [Quick Start](../QUICKSTART.md)

---

**Status:** Production Ready  
**Version:** 1.0.0  
**Last Updated:** 2026-07-19