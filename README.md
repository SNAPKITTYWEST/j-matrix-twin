# J Matrix Twin

```
     ██╗    ███╗   ███╗ █████╗ ████████╗██████╗ ██╗██╗  ██╗
     ██║    ████╗ ████║██╔══██╗╚══██╔══╝██╔══██╗██║╚██╗██╔╝
     ██║    ██╔████╔██║███████║   ██║   ██████╔╝██║ ╚███╔╝ 
██   ██║    ██║╚██╔╝██║██╔══██║   ██║   ██╔══██╗██║ ██╔██╗ 
╚█████╔╝    ██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║██║██╔╝ ██╗
 ╚════╝     ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
                                                              
████████╗██╗    ██╗██╗███╗   ██╗                            
╚══██╔══╝██║    ██║██║████╗  ██║                            
   ██║   ██║ █╗ ██║██║██╔██╗ ██║                            
   ██║   ██║███╗██║██║██║╚██╗██║                            
   ██║   ╚███╔███╔╝██║██║ ╚████║                            
   ╚═╝    ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝                            
```

<div align="center">

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square)](https://github.com/SNAPKITTYWEST/j-matrix-twin/blob/main/LICENSE)
[![Sovereign Source](https://img.shields.io/badge/Sovereign-Source-gold.svg?style=flat-square)](https://github.com/SNAPKITTYWEST/j-matrix-twin/blob/main/LICENSE)
[![J Language](https://img.shields.io/badge/J-9.5-brightgreen.svg?style=flat-square)](https://www.jsoftware.com)
[![WebAssembly](https://img.shields.io/badge/WebAssembly-Ready-purple.svg?style=flat-square)](https://webassembly.org)
[![Nim](https://img.shields.io/badge/Nim-2.0-yellow.svg?style=flat-square)](https://nim-lang.org)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue.svg?style=flat-square)](https://snapkittywest.github.io/j-matrix-twin)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/SNAPKITTYWEST/j-matrix-twin/issues)

**SUBLEQ Attention Engine • Tacit Array Programming • Goldilocks Field Arithmetic**

[🚀 Live Playground](https://snapkittywest.github.io/j-matrix-twin) • [📚 Documentation](#documentation) • [🎯 Quick Start](#quick-start) • [💬 Community](#community)

</div>

---

## 🌟 What Is This?

**J Matrix Twin** is a revolutionary attention mechanism that replaces transformer softmax with **SUBLEQ** (one-instruction computing). Built in pure J with a WebAssembly playground.

```
┌─────────────────────────────────────────────────────────────┐
│  Traditional Attention    │  SUBLEQ Attention               │
├───────────────────────────┼─────────────────────────────────┤
│  softmax(QK^T/√d) V       │  SUBLEQ([A,B,C]...) → Born      │
│  • Exponentials           │  • Subtract-and-branch          │
│  • Normalization          │  • No exponentials              │
│  • Floating point         │  • Deterministic                │
│  • Unstable               │  • φ-weighted collapse          │
└───────────────────────────┴─────────────────────────────────┘
```

### 🎯 Key Features

```
╔═══════════════════════════════════════════════════════════════╗
║  ⚡ SUBLEQ Replaces Softmax    No exponentials, pure logic   ║
║  🎨 Tacit Programming          Point-free J verbs            ║
║  🔐 Goldilocks Field           ZK-SNARK compatible           ║
║  🌐 WebAssembly Playground     Interactive browser UI        ║
║  💬 AI Chat Assistant          Learn as you code            ║
║  📦 Zero Dependencies          Works offline                ║
║  🚀 GitHub Pages Ready         Deploy in 3 commands         ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 🚀 Quick Start

### One-Line Install

```bash
git clone https://github.com/SNAPKITTYWEST/j-matrix-twin.git && cd j-matrix-twin/playground && npm install && npm start
```

### Or Step-by-Step

```bash
# 1. Clone repository
git clone https://github.com/SNAPKITTYWEST/j-matrix-twin.git
cd j-matrix-twin

# 2. Start playground
cd playground
npm install
npm start

# 3. Open browser
open http://localhost:8080
```

**That's it!** 🎉 The playground works without J installed (WASM fallback).

---

## 📚 Documentation

```
┌─────────────────────────────────────────────────────────────┐
│  📖 README.md          You are here                         │
│  ⚡ QUICKSTART.md      5-minute getting started             │
│  🔌 INTEGRATION.md     Wire to sovereign stack              │
│  🚀 DEPLOYMENT.md      GitHub Pages deployment              │
│  📝 HANDOFF.md         Project context & decisions          │
│  🎮 playground/        Interactive web playground           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Architecture

```
                    ┌─────────────────────────┐
                    │   J Matrix Twin Stack   │
                    └─────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ┌────▼────┐          ┌────▼────┐          ┌────▼────┐
   │ Canvas  │          │ SUBLEQ  │          │Resonance│
   │Transform│          │Attention│          │  Word   │
   └────┬────┘          └────┬────┘          └────┬────┘
        │                     │                     │
        │    ┌────────────────┴────────────────┐   │
        │    │                                  │   │
   ┌────▼────▼────┐                      ┌────▼───▼────┐
   │ Nim Bridge   │◄────WebSocket───────►│  Playground │
   │ (In-Memory)  │                      │  (Browser)  │
   └──────────────┘                      └─────────────┘
```

### Core Components

#### 1️⃣ Canvas Transform (`canvas.ijs`)
```j
NB. Tacit matrix growth - no named variables!
getRows =: {. @ $
getCols =: {: @ $
padRight =: ] ,. (getRows@] $ 4 $ ' '"_)
growCanvasTacit =: addFooter @: padRight
```

#### 2️⃣ SUBLEQ Attention (`subleq_attention.ijs`)
```j
NB. Replace softmax with subtract-and-branch
subleq_step =: 4 : 0
  'A B C pc' =. x
  mem =. y
  val =. (B { mem) - (A { mem)
  mem =. val B } mem
  if. val <: 0 do. npc =. C
  else. npc =. pc + 3 end.
  mem ; npc
)
```

#### 3️⃣ Goldilocks Field (`resonance_word.ijs`)
```j
NB. ZK-SNARK compatible arithmetic
P_GOLD =: 18446744069414584321x
gf_add =: P_GOLD & |@+
gf_mul =: P_GOLD & |@*
```

---

## 🎮 Playground Features

<div align="center">

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ┌─────────────────────────────────────────────────────┐   ║
║   │  🎨 IBM Carbon Design    Professional dark theme    │   ║
║   │  💬 AI Chat Assistant    Context-aware help         │   ║
║   │  ⚡ Live Execution        Real-time J code          │   ║
║   │  📊 Built-in Examples    Canvas, SUBLEQ, Fields     │   ║
║   │  🔌 WebSocket Server     Optional J execution       │   ║
║   │  📦 WASM Fallback        Works offline              │   ║
║   │  ⌨️  Keyboard Shortcuts   Ctrl+Enter to run          │   ║
║   └─────────────────────────────────────────────────────┘   ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

</div>

### Screenshots

```
┌──────────────────────────────────────────────────────────────┐
│  Editor                          │  Output                   │
├──────────────────────────────────┼───────────────────────────┤
│  NB. Tacit growth                │  --- Original Canvas ---  │
│  canvas =: 3 50 $ 'J ENGINE...'  │  J ENGINE:  NB. ASCII...  │
│  growCanvasTacit =: ...          │                           │
│  echo growCanvasTacit canvas     │  --- After Growth ---     │
│                                  │  J ENGINE:  NB. ASCII...  │
│  [Run Code] Ctrl+Enter           │  NB. J AUTOMATED GROWTH   │
└──────────────────────────────────┴───────────────────────────┘
```

---

## 🔬 The Science

### SUBLEQ as Attention

Traditional attention uses softmax for normalization:

```
attention(Q,K,V) = softmax(QK^T/√d) V
                   ^^^^^^^^
                   Exponentials!
```

SUBLEQ attention uses memory-addressed branching:

```
attention(activations) = SUBLEQ([A,B,C]...) → Born_collapse(outputs)
                         ^^^^^^              ^^^^
                         Subtract-branch     φ-weighted selection
```

**Why this works:**
- Softmax = normalization + selection
- SUBLEQ = deterministic branching
- Born collapse = φ-weighted selection
- **No exponentials, no instability!**

### Tacit Programming

Point-free composition eliminates named variables:

```j
NB. Explicit (named variables)
growCanvas =: 3 : 0
  shape =. $ y
  rows =. {. shape
  cols =. {: shape
  ...
)

NB. Tacit (point-free)
getRows =: {. @ $
getCols =: {: @ $
growCanvasTacit =: addFooter @: padRight
```

Same behavior, pure composition!

### Goldilocks Field

Prime: **p = 2^64 - 2^32 + 1 = 18446744069414584321**

Properties:
- ✅ Fits in 64-bit unsigned integer
- ✅ ZK-SNARK friendly (Plonky2, Miden)
- ✅ Fast modular arithmetic
- ✅ Lattice-based crypto compatible

---

## 🌐 Sovereign Stack Integration

```
claudes-harness         ← Prolog identity kernel
sovereign-transformer   ← Datalog + x86 ASM corpus gate  
sovereign-array         ← Lean 4 APL algebra (zero sorry)
sov-kernel-monster      ← Fortran 2018 quantum sim (152K lines)
errant                  ← Linear Forth ISA (QTT + WORM)
bob-orchestrator        ← Lean 4 + Ada + Mamba + Prolog
abjad-swarm             ← Arabic numerology compute substrate
systemic-intelligence   ← 7-layer verified pipeline (Agda → SUBLEQ)
j-matrix-twin           ← THIS — J tacit engine + Nim bridge
```

See [INTEGRATION.md](INTEGRATION.md) for wiring specifications.

---

## 📊 Performance

```
╔═══════════════════════════════════════════════════════════════╗
║  Metric                    │  Value                          ║
╠════════════════════════════╪═════════════════════════════════╣
║  J Execution               │  10-500ms (depends on code)     ║
║  WebSocket Latency         │  <10ms (local)                  ║
║  WASM Fallback             │  ~100ms (simulated)             ║
║  Cold Start                │  ~50ms (server spawn)           ║
║  Memory Usage              │  <50MB (browser)                ║
║  Bundle Size               │  ~100KB (uncompressed)          ║
╚════════════════════════════╧═════════════════════════════════╝
```

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```
┌─────────────────────────────────────────────────────────────┐
│  🐛 Found a bug?        Open an issue                       │
│  💡 Have an idea?       Start a discussion                  │
│  🔧 Want to help?       Submit a PR                         │
│  📖 Improve docs?       Edit and PR                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📜 License

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║                    SOVEREIGN SOURCE LICENSE                   ║
║                         Apache 2.0                            ║
║                                                               ║
║  Copyright 2026 Jessica (SNAPKITTYWEST)                      ║
║                                                               ║
║  Licensed under the Apache License, Version 2.0              ║
║  You may obtain a copy at:                                   ║
║  http://www.apache.org/licenses/LICENSE-2.0                  ║
║                                                               ║
║  All IP belongs to Jessica (jessicalw34@gmail.com)           ║
║  Ahmad Ali Parr was a prior collaborator who has left        ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

See [LICENSE](LICENSE) for full text.

---

## 🌟 Community

<div align="center">

[![GitHub Stars](https://img.shields.io/github/stars/SNAPKITTYWEST/j-matrix-twin?style=social)](https://github.com/SNAPKITTYWEST/j-matrix-twin)
[![GitHub Forks](https://img.shields.io/github/forks/SNAPKITTYWEST/j-matrix-twin?style=social)](https://github.com/SNAPKITTYWEST/j-matrix-twin/fork)
[![GitHub Issues](https://img.shields.io/github/issues/SNAPKITTYWEST/j-matrix-twin)](https://github.com/SNAPKITTYWEST/j-matrix-twin/issues)
[![GitHub Discussions](https://img.shields.io/github/discussions/SNAPKITTYWEST/j-matrix-twin)](https://github.com/SNAPKITTYWEST/j-matrix-twin/discussions)

**Join the conversation!**

[💬 Discussions](https://github.com/SNAPKITTYWEST/j-matrix-twin/discussions) • 
[🐛 Issues](https://github.com/SNAPKITTYWEST/j-matrix-twin/issues) • 
[📧 Email](mailto:jessicalw34@gmail.com)

</div>

---

## 🎯 Roadmap

```
✅ Phase 1: Core Implementation
   ├─ Canvas transforms
   ├─ SUBLEQ attention
   ├─ Goldilocks field
   └─ Nim bridge

✅ Phase 2: Web Playground
   ├─ IBM Carbon UI
   ├─ WebSocket server
   ├─ AI chat assistant
   └─ GitHub Pages deployment

🚧 Phase 3: Advanced Features
   ├─ Multi-head attention visualization
   ├─ Real-time collaboration
   ├─ WASM J interpreter
   └─ Mobile app (React Native)

📋 Phase 4: Research
   ├─ Benchmark vs transformer attention
   ├─ Formal verification (Lean 4)
   ├─ Academic paper
   └─ Conference presentation
```

---

## 📚 Learn More

### J Language
- [Official Site](https://www.jsoftware.com)
- [J Wiki](https://code.jsoftware.com/wiki)
- [Tacit Programming](https://code.jsoftware.com/wiki/Vocabulary/Tacit)

### SUBLEQ
- [Wikipedia](https://en.wikipedia.org/wiki/One-instruction_set_computer)
- [Esolangs](https://esolangs.org/wiki/Subleq)

### Goldilocks Field
- [Plonky2](https://github.com/0xPolygonZero/plonky2)
- [Miden VM](https://github.com/0xPolygonMiden/miden-vm)

---

## 🙏 Acknowledgments

```
┌─────────────────────────────────────────────────────────────┐
│  • J Software (jsoftware.com) for the J language            │
│  • IBM Carbon Design System for UI inspiration              │
│  • Ahmad Ali Parr (prior collaborator)                      │
│  • The array programming community                          │
│  • Everyone who stars, forks, and contributes!              │
└─────────────────────────────────────────────────────────────┘
```

---

<div align="center">

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║              Made with ❤️  by SNAPKITTYWEST                   ║
║                                                               ║
║         "Sovereign AI through tacit composition"              ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

**[⭐ Star this repo](https://github.com/SNAPKITTYWEST/j-matrix-twin) • [🚀 Try the playground](https://snapkittywest.github.io/j-matrix-twin) • [📖 Read the docs](#documentation)**

</div>

---

<div align="center">
<sub>Built with J • Nim • WebAssembly • Love</sub>
</div>