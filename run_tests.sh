#!/bin/bash
# Run all J matrix twin tests
# Requires: ijconsole (J software) in PATH
# Optional: nim compiler for bridge test

set -e

echo "=== J MATRIX TWIN — TEST SUITE ==="
echo ""

# Test 1: Canvas transforms
echo "--- TEST 1: Canvas Tacit Transforms ---"
if command -v ijconsole &> /dev/null; then
    ijconsole < canvas.ijs
    echo ""
else
    echo "SKIP: ijconsole not in PATH"
    echo "Install J from: https://www.jsoftware.com"
    echo ""
fi

# Test 2: SUBLEQ Attention
echo "--- TEST 2: SUBLEQ Attention Layer ---"
if command -v ijconsole &> /dev/null; then
    ijconsole < subleq_attention.ijs
    echo ""
else
    echo "SKIP: ijconsole not in PATH"
    echo ""
fi

# Test 3: ResonanceWord / Goldilocks
echo "--- TEST 3: ResonanceWord + Lattice ---"
if command -v ijconsole &> /dev/null; then
    ijconsole < resonance_word.ijs
    echo ""
else
    echo "SKIP: ijconsole not in PATH"
    echo ""
fi

# Test 4: Nim bridge (if nim available)
echo "--- TEST 4: Nim In-Memory Bridge ---"
if command -v nim &> /dev/null && command -v ijconsole &> /dev/null; then
    nim c -r j_matrix_bridge.nim
    echo ""
else
    echo "SKIP: nim or ijconsole not in PATH"
    echo ""
fi

echo "=== ALL TESTS COMPLETE ==="
