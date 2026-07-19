NB. =========================================================================
NB. J ARRAY TWIN — Tacit Matrix Transformation Engine
NB. Ahmad Ali Parr · SnapKitty Collective · 2026
NB. =========================================================================

NB. 1. Seed Canvas — 2D character matrix (the code state)
canvas =: 3 50 $ 'J ENGINE:  NB. ASCII Reshapes                  BQN LOGIC:  Tensor Rotations                NIM RUNTIME: Systems Validation             '

NB. =========================================================================
NB. EXPLICIT PRIMITIVES
NB. =========================================================================

NB. Right-shift: rotate rows by -3 (wraps trailing edge to front)
shiftRight =: _3 |. ]

NB. Explicit growth: pad right + append footer
growCanvas =: 3 : 0
  shape =. $ y
  rows =. {. shape
  cols =. {: shape
  paddedCols =. y ,. (rows , 4) $ ' '
  newFooter =. (cols + 4) {. 'NB. J AUTOMATED GROWTH STEP GENERATED'
  paddedCols , newFooter
)

NB. =========================================================================
NB. TACIT REFACTOR — Point-free, no arguments named
NB. =========================================================================

NB. Dimension extractors (composition @)
getRows =: {. @ $
getCols =: {: @ $

NB. Tacit padding: stitch 4-wide space block onto right edge
padRight =: ] ,. (getRows@] $ 4 $ ' '"_)

NB. Tacit footer: append dynamic-width header string
addFooter =: ] , (getCols@] + 4"_) {. 'NB. J AUTOMATED GROWTH STEP GENERATED'"_

NB. Unified tacit verb — one pass, no variables
growCanvasTacit =: addFooter @: padRight

NB. =========================================================================
NB. MULTI-STEP EVOLUTION (iterated growth)
NB. =========================================================================

NB. Power conjunction: apply growth N times
evolve =: growCanvasTacit ^: ]

NB. =========================================================================
NB. EXECUTION
NB. =========================================================================

echo '--- ORIGINAL SEED CANVAS ---'
echo canvas
echo 'Dimensions: ' , ": $ canvas
echo ''

echo '--- AFTER 3-STEP RIGHT SHIFT ---'
shifted =: shiftRight canvas
echo shifted
echo ''

echo '--- AFTER TACIT GROWTH (1 step) ---'
grown1 =: growCanvasTacit shifted
echo grown1
echo 'Dimensions: ' , ": $ grown1
echo ''

echo '--- AFTER TACIT GROWTH (3 steps via power) ---'
grown3 =: 3 evolve shifted
echo grown3
echo 'Dimensions: ' , ": $ grown3
echo ''

echo '--- VERIFICATION: explicit vs tacit ---'
echo 'Match: ' , ": (growCanvas shifted) -: (growCanvasTacit shifted)

exit 0
