# J Matrix Twin — Quick Start Guide

Get up and running with SUBLEQ attention in 5 minutes.

## Prerequisites

You need **J programming language** installed. That's it.

### Install J (Choose your platform)

**Windows:**
1. Download installer: https://www.jsoftware.com/download/j9.5_win.exe
2. Run installer (default location: `C:\Program Files\J9.5`)
3. Add to PATH: `C:\Program Files\J9.5\bin`
4. Verify: Open PowerShell → `ijconsole --version`

**macOS:**
```bash
brew install j
# or download from jsoftware.com
```

**Linux:**
```bash
# Debian/Ubuntu
sudo apt install j

# Arch
yay -S j

# Or download from jsoftware.com
```

**Verify Installation:**
```bash
ijconsole --version
# Should output: j9.5.x or similar
```

## 60-Second Test

```bash
cd j-matrix-twin
bash run_tests.sh
```

**Expected output:**
```
=== J MATRIX TWIN — TEST SUITE ===

--- TEST 1: Canvas Tacit Transforms ---
--- ORIGINAL SEED CANVAS ---
J ENGINE:  NB. ASCII Reshapes                  
BQN LOGIC:  Tensor Rotations                
NIM RUNTIME: Systems Validation             
Dimensions: 3 50

--- AFTER TACIT GROWTH (1 step) ---
[Expanded matrix with footer]
Dimensions: 4 54

VERIFICATION: explicit vs tacit
Match: 1

--- TEST 2: SUBLEQ Attention Layer ---
[SUBLEQ execution output]

--- TEST 3: ResonanceWord + Lattice ---
[Goldilocks field arithmetic]

=== ALL TESTS COMPLETE ===
```

## What Just Happened?

1. **Canvas Transform** — Tacit J verbs grew a 3×50 matrix to 4×54 without naming variables
2. **SUBLEQ Attention** — Replaced softmax with subtract-and-branch instructions
3. **ResonanceWord** — Packed data into Goldilocks field elements for ZK compatibility

## Interactive J Session

Want to play with the code interactively?

```bash
ijconsole
```

Then paste any code from the `.ijs` files:

```j
   NB. Define tacit growth verb
   getRows =: {. @ $
   getCols =: {: @ $
   padRight =: ] ,. (getRows@] $ 4 $ ' '"_)
   
   NB. Create test matrix
   m =: 2 10 $ 'HELLO     WORLD     '
   
   NB. Apply transform
   padRight m
HELLO     
WORLD     

   NB. Check dimensions
   $ padRight m
2 14
```

## Understanding the Output

### Canvas Transform
```
--- ORIGINAL SEED CANVAS ---
[3×50 matrix]
Dimensions: 3 50

--- AFTER TACIT GROWTH (1 step) ---
[4×54 matrix with footer]
Dimensions: 4 54
```
- **Tacit verbs** = point-free functions (no named arguments)
- **Growth** = pad right + append footer
- **Verification** = explicit vs tacit produce identical output

### SUBLEQ Attention
```
Input activations (4 heads x 8 dims):
[activation matrix]

Attention head 0 output:
[memory addresses]

Born collapse: [final address]
```
- **Activations** → **SUBLEQ triads [A,B,C]** → **Execute** → **Output addresses**
- **Born collapse** = φ-weighted selection (golden ratio decay)
- **No softmax** = no exponentials, no normalization

### ResonanceWord
```
Goldilocks prime: 18446744069414584321
Pack CLASS_SOVEREIGN + payload 53: [packed value]
Lattice route: [p, b, index]
URef dispatch: BOB
```
- **Goldilocks field** = ZK-SNARK compatible arithmetic
- **ResonanceWord** = 8-bit class + 56-bit payload
- **Lattice routing** = map to 12288-element group
- **URef dispatch** = 11 involutions select agent

## Common Issues

### "ijconsole not found"
```bash
# Check if J is installed
which ijconsole  # Linux/Mac
where ijconsole  # Windows

# If not found, add J bin directory to PATH
export PATH=$PATH:/path/to/j/bin  # Linux/Mac
$env:PATH += ";C:\Program Files\J9.5\bin"  # PowerShell
```

### "Tacit verb parsing error"
J's tacit parser is strict. If you see errors like:
```
|domain error
```

Check:
1. All constant functions use `"_` rank: `'text'"_` not `'text'`
2. Fork/hook structure is valid: `(f g h)` or `(f g)`
3. Composition chains use `@` or `@:`: `f @ g` not `f g`

Display verb tree to debug:
```j
   5!:2 <'growCanvasTacit'
```

### "SUBLEQ infinite loop"
If SUBLEQ doesn't halt:
1. Check halt instruction at end: `_1 _1 _1`
2. Verify max steps (default 500)
3. Ensure addresses are in [0, 255]

## Next Steps

### 1. Explore the Code
```bash
# Read the implementations
cat canvas.ijs
cat subleq_attention.ijs
cat resonance_word.ijs
```

### 2. Modify and Experiment
```j
NB. Try different matrix sizes
canvas =: 5 100 $ 'YOUR TEXT HERE'

NB. Try different evolution steps
10 evolve canvas

NB. Try different SUBLEQ programs
test_activations =: 8 16 $ ? 128 $ 0
multihead_attention test_activations
```

### 3. Wire to Your Stack
See `INTEGRATION.md` for connecting to:
- sov-kernel-monster (Fortran quantum sim)
- sovereign-array (Lean 4 APL algebra)
- bob-orchestrator (Lean 4 + Ada + Mamba)

### 4. Optional: Nim Bridge
If you want the in-memory pipeline:
```bash
# Install Nim
curl https://nim-lang.org/choosenim/init.sh -sSf | sh

# Compile and run
nim c -r j_matrix_bridge.nim
```

## Learning Resources

**J Language:**
- Official site: https://www.jsoftware.com
- Tutorial: https://code.jsoftware.com/wiki/NuVoc
- Tacit programming: https://code.jsoftware.com/wiki/Vocabulary/Tacit

**SUBLEQ:**
- Wikipedia: https://en.wikipedia.org/wiki/One-instruction_set_computer
- Esolangs: https://esolangs.org/wiki/Subleq

**Goldilocks Field:**
- Plonky2: https://github.com/0xPolygonZero/plonky2
- Miden VM: https://github.com/0xPolygonMiden/miden-vm

## Support

**Owner:** Jessica (jessicalw34@gmail.com) — SNAPKITTYWEST

**Issues:** Open an issue in the repo or email directly.

**Contributing:** All IP belongs to Jessica. Ahmad Ali Parr was a prior collaborator who has left.

---

**You're ready!** Run the tests, explore the code, and integrate into your sovereign AI stack.