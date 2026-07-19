# J Matrix Twin

**SUBLEQ Attention Engine in Pure J + Nim Bridge**

A tacit array programming implementation of attention mechanisms using SUBLEQ (one-instruction computing) instead of softmax, with Goldilocks field arithmetic for zero-knowledge compatibility.

## Overview

This project implements a novel attention mechanism where:
- **SUBLEQ replaces softmax**: Three memory addresses [A,B,C] = one instruction = one attention step
- **No exponentials, no normalization**: Just subtract-and-branch
- **Born collapse**: Golden ratio (φ) weighted selection picks the winner
- **Goldilocks field**: ZK-compatible arithmetic (p = 2^64 - 2^32 + 1)

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  J MATRIX TWIN — Sovereign AI Stack Component               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  canvas.ijs              Tacit matrix transforms            │
│  ├─ growCanvas           Explicit (named variables)         │
│  ├─ growCanvasTacit      Point-free (no arguments)          │
│  └─ evolve               Power conjunction (N iterations)   │
│                                                              │
│  subleq_attention.ijs    SUBLEQ replaces softmax            │
│  ├─ subleq_step          [A,B,C] instruction                │
│  ├─ attention_head       Activations → SUBLEQ → output      │
│  ├─ multihead_attention  N heads + Born collapse            │
│  └─ born_collapse        φ-weighted selection               │
│                                                              │
│  resonance_word.ijs      Goldilocks field wire format       │
│  ├─ gf_add/mul/sub       Field arithmetic mod p             │
│  ├─ rw_pack/unpack       8-bit class + 56-bit payload       │
│  ├─ tokenize             Text → ResonanceWord stream        │
│  ├─ lattice_route        Map to |G| = 12288 lattice         │
│  └─ uref_dispatch        11 involutions → agent selection   │
│                                                              │
│  j_matrix_bridge.nim     In-memory Nim→J pipeline           │
│  ├─ executeJ             Spawn ijconsole, pipe scripts      │
│  ├─ bornCollapse         φ-weighted consensus               │
│  └─ Three payloads       seed, shift, evolve                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Installation

### 1. Install J Programming Language

Download and install J from: https://www.jsoftware.com

**Windows:**
```powershell
# Download installer from jsoftware.com
# Add J bin directory to PATH
# Verify installation:
ijconsole --version
```

**Linux/Mac:**
```bash
# Download from jsoftware.com or use package manager
sudo apt install j  # Debian/Ubuntu
brew install j      # macOS

# Verify:
ijconsole --version
```

### 2. Install Nim (Optional - for bridge testing)

Download from: https://nim-lang.org

```bash
# Verify:
nim --version
```

## Usage

### Run All Tests

```bash
cd j-matrix-twin
bash run_tests.sh
```

### Individual Tests

**Test 1: Canvas Transforms**
```bash
ijconsole < canvas.ijs
```
Output: Matrix growth with tacit verbs, dimension tracking

**Test 2: SUBLEQ Attention**
```bash
ijconsole < subleq_attention.ijs
```
Output: Attention heads using SUBLEQ instead of softmax

**Test 3: ResonanceWord + Goldilocks**
```bash
ijconsole < resonance_word.ijs
```
Output: Field arithmetic, tokenization, lattice routing, agent dispatch

**Test 4: Nim Bridge (requires both nim and ijconsole)**
```bash
nim c -r j_matrix_bridge.nim
```
Output: In-memory J execution, Born collapse consensus

## Key Concepts

### SUBLEQ Attention

Traditional transformer attention:
```
attention(Q,K,V) = softmax(QK^T/√d) V
```

SUBLEQ attention:
```
attention(activations) = SUBLEQ([A,B,C]...) → Born_collapse(outputs)
```

**Why this works:**
- Softmax is just normalization + selection
- SUBLEQ provides deterministic branching based on memory state
- Born collapse (φ-weighted) provides the selection mechanism
- No floating point instability, no exponentials

### Tacit Programming in J

**Explicit (named variables):**
```j
growCanvas =: 3 : 0
  shape =. $ y
  rows =. {. shape
  cols =. {: shape
  paddedCols =. y ,. (rows , 4) $ ' '
  newFooter =. (cols + 4) {. 'NB. J AUTOMATED GROWTH STEP GENERATED'
  paddedCols , newFooter
)
```

**Tacit (point-free):**
```j
getRows =: {. @ $
getCols =: {: @ $
padRight =: ] ,. (getRows@] $ 4 $ ' '"_)
addFooter =: ] , (getCols@] + 4"_) {. 'NB. J AUTOMATED GROWTH STEP GENERATED'"_
growCanvasTacit =: addFooter @: padRight
```

Same behavior, no named arguments. Composition chains replace variable assignment.

### Goldilocks Field

**Prime:** p = 2^64 - 2^32 + 1 = 18446744069414584321

**Properties:**
- Fits in 64-bit unsigned integer
- ZK-SNARK friendly (used in Plonky2, Miden)
- Fast modular arithmetic
- Compatible with lattice-based cryptography

**ResonanceWord Format:**
```
┌────────┬──────────────────────────────────────────────────────┐
│ 8 bits │                    56 bits                           │
│ CLASS  │                    PAYLOAD                           │
└────────┴──────────────────────────────────────────────────────┘
```

Classes: PRIME, LATTICE, ORBIT, SEAL, TRANSITION, INVOLUTION, ANCHOR, CERTIFICATE, WORM, SOVEREIGN

### URef 11 Involutions

11 commuting XOR generators dispatch to 11 agents:
- BOB, METATRON, EDAULC, SENTINEL, PRISM, NEXUS, AUTONOMOUS, ORACLE, AXIOM, SHREW, RAT

Each involution is self-inverse: f(f(x)) = x

Entropy bits select which involutions to apply, creating 2^11 = 2048 possible routing paths.

## Integration with Sovereign Stack

This component wires into the larger sovereign AI architecture:

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

**Integration Points:**

1. **sov-kernel-monster**: Born collapse in `subleq_attention.ijs` produces memory addresses that map to SPE encoder frame indices. Bridge: J output → ResonanceWord → Goldilocks field element → density matrix eigenvalue.

2. **sovereign-array**: Tacit J verbs translate to APL/BQN array operations, verified in Lean 4.

3. **abjad-swarm**: Abjad tokenizer in `resonance_word.ijs` converts Arabic text to numeric values, feeding the SUBLEQ attention mechanism.

4. **bob-orchestrator**: Nim bridge provides the runtime glue between J's array engine and the Lean 4 orchestration layer.

## File Structure

```
j-matrix-twin/
├── HANDOFF.md              Full context for next developer
├── README.md               This file
├── canvas.ijs              Tacit matrix transforms
├── j_matrix_bridge.nim     In-memory Nim→J pipeline
├── subleq_attention.ijs    SUBLEQ replaces softmax
├── resonance_word.ijs      Goldilocks field + lattice routing
└── run_tests.sh            Test runner
```

## Performance Characteristics

**J Execution:**
- Tacit verbs compile to optimized array operations
- No intermediate allocations in point-free chains
- Memory-mapped arrays for large matrices

**SUBLEQ:**
- O(n) instruction execution (no nested loops)
- Deterministic branching (no backtracking)
- 256-cell address space (cache-friendly)

**Born Collapse:**
- O(n) weighted sum
- φ decay prevents overflow
- Modular arithmetic (no floating point)

## Testing

All tests are self-contained and produce human-readable output:

```bash
# Expected output structure:
=== J MATRIX TWIN — TEST SUITE ===

--- TEST 1: Canvas Tacit Transforms ---
--- ORIGINAL SEED CANVAS ---
[3x50 character matrix]
--- AFTER TACIT GROWTH (1 step) ---
[4x54 character matrix]
VERIFICATION: explicit vs tacit
Match: 1

--- TEST 2: SUBLEQ Attention Layer ---
Input activations (4 heads x 8 dims):
[activation matrix]
Attention head 0 output:
[memory addresses]
Born collapse: [final address]

--- TEST 3: ResonanceWord + Lattice ---
Goldilocks prime: 18446744069414584321
Field arithmetic: 999 + 888 mod p = 1887
Pack CLASS_SOVEREIGN + payload 53: [packed value]
Lattice route: [p, b, index]
URef dispatch: BOB

--- TEST 4: Nim In-Memory Bridge ---
PHI constant: 1.618033988749895
Executing SEED transform
  Captured: 6 vectors in 23ms
Born-Collapse Selection
  Winner vectors: 6
```

## Troubleshooting

**"ijconsole not found"**
- Install J from jsoftware.com
- Add J bin directory to PATH
- Restart terminal

**"Tacit verb parsing error"**
- J's tacit parser is strict about fork/hook structure
- Check verb train composition with `5!:2 <'verbname'` (display tree)
- Ensure all constant functions use `"_` rank

**"Nim compilation error"**
- Ensure both `nim` and `ijconsole` are in PATH
- Check Nim version >= 1.6.0
- Verify osproc module is available

**"SUBLEQ infinite loop"**
- Check halt instruction: `_1 _1 _1` at end of program
- Verify max steps parameter (default 500)
- Ensure memory addresses are in range [0, 255]

## License

All IP belongs to Jessica (jessicalw34@gmail.com) — SNAPKITTYWEST

Ahmad Ali Parr was a prior collaborator who has left the project.

## References

- J Language: https://www.jsoftware.com
- SUBLEQ: https://esolangs.org/wiki/Subleq
- Goldilocks Field: https://github.com/0xPolygonMiden/miden-vm
- Born Rule: https://en.wikipedia.org/wiki/Born_rule
- Tacit Programming: https://code.jsoftware.com/wiki/Vocabulary/Tacit

## Next Steps

1. **Run tests** — Verify all components work
2. **Fix tacit verbs** — If parsing errors occur
3. **Wire to sov-kernel-monster** — Connect Born collapse to density matrix
4. **Push to GitHub** — Create standalone repo or merge into sovereign-array
5. **Benchmark** — Compare SUBLEQ attention vs traditional softmax
6. **Extend** — Add more ResonanceWord classes, expand lattice order

---

**Status:** Ready for testing and integration  
**Last Updated:** 2026-07-19  
**Maintainer:** Jessica (SNAPKITTYWEST)