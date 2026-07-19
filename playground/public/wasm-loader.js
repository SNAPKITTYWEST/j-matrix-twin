// J Matrix Twin - WebAssembly Loader
// Minimal JavaScript glue code for WASM module

let wasmModule = null;
let wasmMemory = null;
let wasmExports = null;

// Initialize WASM module
async function initWASM() {
    try {
        const response = await fetch('j-matrix.wasm');
        const buffer = await response.arrayBuffer();
        
        const importObject = {
            env: {
                abort: (msg, file, line, column) => {
                    console.error(`WASM abort: ${msg} at ${file}:${line}:${column}`);
                },
                seed: () => Date.now()
            }
        };
        
        const result = await WebAssembly.instantiate(buffer, importObject);
        wasmModule = result.instance;
        wasmExports = result.instance.exports;
        wasmMemory = wasmExports.memory;
        
        console.log('✓ WASM module loaded:', wasmExports.getVersion());
        return true;
    } catch (error) {
        console.error('✗ WASM load failed:', error);
        return false;
    }
}

// WASM function wrappers
const WASM = {
    // Born collapse with phi weighting
    bornCollapse: (values) => {
        if (!wasmExports) return 0;
        const ptr = wasmExports.allocate(values.length * 4);
        const view = new Int32Array(wasmMemory.buffer, ptr, values.length);
        view.set(values);
        const result = wasmExports.bornCollapse(ptr, values.length);
        wasmExports.deallocate(ptr);
        return result;
    },
    
    // Phi weight calculation
    phiWeight: (index) => {
        return wasmExports ? wasmExports.phiWeight(index) : 0;
    },
    
    // SUBLEQ attention head
    attentionHead: (activations) => {
        if (!wasmExports) return new Int32Array(8);
        const ptr = wasmExports.allocate(activations.length * 4);
        const view = new Float32Array(wasmMemory.buffer, ptr, activations.length);
        view.set(activations);
        const resultPtr = wasmExports.attentionHead(ptr, activations.length);
        const result = new Int32Array(wasmMemory.buffer, resultPtr, 8);
        wasmExports.deallocate(ptr);
        return Array.from(result);
    },
    
    // Goldilocks field operations
    gfAdd: (a, b) => wasmExports ? wasmExports.gfAdd(a, b) : 0n,
    gfMul: (a, b) => wasmExports ? wasmExports.gfMul(a, b) : 0n,
    
    // ResonanceWord operations
    packResonanceWord: (classTag, payload) => {
        return wasmExports ? wasmExports.packResonanceWord(classTag, payload) : 0n;
    },
    
    latticeRoute: (word) => {
        return wasmExports ? wasmExports.latticeRoute(word) : 0;
    },
    
    // Utility functions
    hashString: (str) => {
        return wasmExports ? wasmExports.hashString(str) : 0;
    },
    
    getMemoryUsage: () => {
        return wasmExports ? wasmExports.getMemoryUsage() : 0;
    },
    
    getVersion: () => {
        return wasmExports ? wasmExports.getVersion() : 'WASM not loaded';
    }
};

// Export for use in app
window.WASM = WASM;
window.initWASM = initWASM;

// Auto-initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWASM);
} else {
    initWASM();
}

// Made with Bob
