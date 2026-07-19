## j_matrix_bridge.nim
## Spawns J interpreter in-memory, pipes tacit matrix code,
## captures mutated arrays as native memory vectors.
## No disk I/O. Pure RAM pipeline.
##
## Ahmad Ali Parr · SnapKitty Collective · 2026

import std/[osproc, streams, strutils, sequtils, os, times]

const PHI = 1.6180339887498948482

type
  MatrixVector = seq[string]

  TransformResult = object
    rows: int
    cols: int
    vectors: MatrixVector
    elapsed: Duration

proc executeJ(script: string): TransformResult =
  ## Spawn ijconsole, stream script in-memory, capture output vectors.
  let t0 = now()

  let jProc = startProcess(
    command = "ijconsole",
    options = {poUsePath, poStdErrToStdOut}
  )

  # Pipe script directly into J's stdin buffer (RAM only)
  let input = jProc.inputStream()
  input.write(script)
  input.flush()
  input.close()

  # Capture stdout as memory vectors
  let output = jProc.outputStream()
  var line = ""
  var vectors: MatrixVector = @[]

  while output.readLine(line):
    let stripped = line.strip(trailing = true)
    if stripped.len > 0:
      vectors.add(stripped)

  jProc.close()

  result.vectors = vectors
  result.rows = vectors.len
  result.cols = if vectors.len > 0: vectors[0].len else: 0
  result.elapsed = now() - t0

proc phiWeight(index: int): float =
  ## Golden ratio decay weight for Born-collapse consensus.
  PHI ** float(-index)

proc bornCollapse(results: seq[TransformResult]): MatrixVector =
  ## Phi-weighted selection across multiple J execution results.
  ## Same principle as measurement_head.f90 Born rule.
  if results.len == 0: return @[]

  # Weight each result by phi^(-i), take vectors from heaviest
  var bestWeight = 0.0
  var bestIdx = 0
  for i, r in results:
    let w = phiWeight(i) * float(r.vectors.len)
    if w > bestWeight:
      bestWeight = w
      bestIdx = i

  return results[bestIdx].vectors

# =========================================================================
# J PAYLOADS — tacit matrix transformations
# =========================================================================

const seedPayload = """
canvas =: 3 50 $ 'J ENGINE:  NB. ASCII Reshapes                  BQN LOGIC:  Tensor Rotations                NIM RUNTIME: Systems Validation             '
getRows =: {. @ $
getCols =: {: @ $
padRight =: ] ,. (getRows@] $ 4 $ ' '"_)
addFooter =: ] , (getCols@] + 4"_) {. 'NB. J AUTOMATED GROWTH STEP GENERATED'"_
growCanvasTacit =: addFooter @: padRight
echo growCanvasTacit canvas
echo '---DIMS---'
echo ": $ growCanvasTacit canvas
exit 0
"""

const shiftPayload = """
canvas =: 3 50 $ 'J ENGINE:  NB. ASCII Reshapes                  BQN LOGIC:  Tensor Rotations                NIM RUNTIME: Systems Validation             '
shiftRight =: _3 |. ]
echo shiftRight canvas
echo '---DIMS---'
echo ": $ shiftRight canvas
exit 0
"""

const evolvePayload = """
canvas =: 3 50 $ 'J ENGINE:  NB. ASCII Reshapes                  BQN LOGIC:  Tensor Rotations                NIM RUNTIME: Systems Validation             '
getRows =: {. @ $
getCols =: {: @ $
padRight =: ] ,. (getRows@] $ 4 $ ' '"_)
addFooter =: ] , (getCols@] + 4"_) {. 'NB. J AUTOMATED GROWTH STEP GENERATED'"_
growCanvasTacit =: addFooter @: padRight
evolve =: growCanvasTacit ^: ]
echo 5 evolve canvas
echo '---DIMS---'
echo ": $ 5 evolve canvas
exit 0
"""

# =========================================================================
# MAIN — Pipeline execution
# =========================================================================

when isMainModule:
  echo "=== [NIM IN-MEMORY J PIPELINE] ==="
  echo "PHI constant: ", PHI
  echo ""

  # Execute three independent J transforms
  echo "--- Executing SEED transform ---"
  let r1 = executeJ(seedPayload)
  echo "  Captured: ", r1.rows, " vectors in ", r1.elapsed
  for i, v in r1.vectors:
    if i < 6: echo "  [", i, "] ", v
  echo ""

  echo "--- Executing SHIFT transform ---"
  let r2 = executeJ(shiftPayload)
  echo "  Captured: ", r2.rows, " vectors in ", r2.elapsed
  for i, v in r2.vectors:
    if i < 6: echo "  [", i, "] ", v
  echo ""

  echo "--- Executing EVOLVE (5 steps) ---"
  let r3 = executeJ(evolvePayload)
  echo "  Captured: ", r3.rows, " vectors in ", r3.elapsed
  for i, v in r3.vectors:
    if i < 10: echo "  [", i, "] ", v
  echo ""

  # Born-collapse across all three
  echo "--- Born-Collapse Selection ---"
  let collapsed = bornCollapse(@[r1, r2, r3])
  echo "  Winner vectors: ", collapsed.len
  echo ""

  echo "=== [PIPELINE COMPLETE] ==="
