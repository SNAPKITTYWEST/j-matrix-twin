NB. =========================================================================
NB. SUBLEQ ATTENTION — J Implementation
NB. Replaces softmax with deterministic [A,B,C] memory-addressed branching
NB. Ahmad Ali Parr · SnapKitty Collective · 2026
NB. =========================================================================

NB. SUBLEQ: the one-instruction universal machine
NB. Given memory M and instruction [A, B, C]:
NB.   M[B] := M[B] - M[A]
NB.   if M[B] <= 0: jump to C
NB.   else: advance to next instruction (PC + 3)

NB. =========================================================================
NB. CORE SUBLEQ MACHINE
NB. =========================================================================

NB. Memory: 256-cell address space
MEM =: 256 $ 0

NB. Step: (A,B,C) subleq on memory
NB. Returns: (new_memory ; next_pc)
subleq_step =: 4 : 0
  'A B C pc' =. x
  mem =. y
  val =. (B { mem) - (A { mem)
  mem =. val B } mem
  npc =. pc + 3
  if. val <: 0 do. npc =. C end.
  mem ; npc
)

NB. Run N steps from PC=0
subleq_run =: 4 : 0
  'maxsteps' =. x
  mem =. y
  pc =. 0
  out =. 0 $ 0
  for_step. i. maxsteps do.
    if. pc >: # mem do. break. end.
    if. pc < 0 do. break. end.
    A =. pc { mem
    B =. (pc+1) { mem
    C =. (pc+2) { mem
    if. A = _1 do.
      NB. Output instruction: emit M[B]
      out =. out , B { mem
      pc =. pc + 3
    elseif. B = _1 do.
      NB. Halt
      break.
    elseif. 1 do.
      'mem pc' =. (A,B,C,pc) subleq_step mem
    end.
  end.
  out ; mem
)

NB. =========================================================================
NB. ABJAD TOKENIZER — Arabic → memory addresses
NB. =========================================================================

NB. Abjad values (simplified — full 28 in abjad.py)
NB. alif=1 ba=2 jim=3 dal=4 ha=5 waw=6 zayn=7 haa=8 taa=9 ya=10
NB. kaf=20 lam=30 mim=40 nun=50 sin=60 ayn=70 fa=80 sad=90
NB. qaf=100 ra=200 shin=300 ta=400

NB. Convert activation vector to [A,B,C] triads
NB. This IS the attention mechanism — no softmax needed
activations_to_triads =: 3 : 0
  NB. Scale float activations to memory addresses
  addrs =. 1 >. 255 <. <. 256 * | y
  NB. Reshape into triads (groups of 3)
  n =. 3 * <. (# addrs) % 3
  (n {. addrs) $ ~ ((<. n%3) , 3)
)

NB. =========================================================================
NB. PHI-WEIGHTED BORN COLLAPSE
NB. =========================================================================

PHI =: 1.6180339887
PHI_INV =: % PHI

NB. Weight vector by phi^(-i)
phi_weights =: PHI_INV ^ i. @ #

NB. Born collapse: phi-weighted sum mod address space
born_collapse =: 3 : 0
  w =. phi_weights y
  <. 256 | +/ w * y
)

NB. =========================================================================
NB. ATTENTION LAYER — SUBLEQ replaces softmax
NB. =========================================================================

NB. Single attention head: activations → SUBLEQ → output address
attention_head =: 3 : 0
  NB. y is activation vector (e.g., from embedding)
  triads =. activations_to_triads y

  NB. Load triads as SUBLEQ program
  prog =. , triads
  NB. Append halt instruction
  prog =. prog , _1 _1 _1

  NB. Pad to full memory
  mem =. (256 $ 0)
  mem =. prog (i. # prog) } mem

  NB. Seed weight region (addresses 128+) with activation magnitudes
  waddrs =. 128 + i. <. (# y) <. 64
  wvals =. <. 1000 * (64 {. y)
  mem =. wvals waddrs } mem

  NB. Run SUBLEQ (max 500 steps)
  'out final_mem' =. 500 subleq_run mem
  out
)

NB. Multi-head: run N heads, Born-collapse the outputs
multihead_attention =: 3 : 0
  NB. y is (N x D) matrix of head activations
  heads =. attention_head"1 y
  NB. Collapse each head's output via Born rule
  born_collapse &> heads
)

NB. =========================================================================
NB. TEST
NB. =========================================================================

echo '--- SUBLEQ ATTENTION TEST ---'

NB. Simulate 4 attention heads with random activations
test_activations =: 4 8 $ ? 32 $ 0

echo 'Input activations (4 heads x 8 dims):'
echo ": test_activations
echo ''

echo 'Triads from head 0:'
echo ": activations_to_triads 0 { test_activations
echo ''

echo 'Attention head 0 output:'
echo ": attention_head 0 { test_activations
echo ''

echo 'Phi weights for 8 elements:'
echo ": phi_weights 8 $ 1
echo ''

echo 'Born collapse of [10 20 30 40 50 60 70 80]:'
echo ": born_collapse 10 20 30 40 50 60 70 80

exit 0
