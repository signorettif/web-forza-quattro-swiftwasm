// WASM stuff
import { WASI } from '@wasmer/wasi';
import { WasmFs } from '@wasmer/wasmfs';

// CONSTANTS
import { CONSTANTS } from './../config/constants';

export const loadWasmUtil = async () => {
  const wasmFs = new WasmFs();

  let wasi = new WASI({
    args: [],
    env: {},
    bindings: {
      ...WASI.defaultBindings,
      fs: wasmFs.fs,
    },
  });

  const response = await fetch(CONSTANTS.WASM_FILE_PATH);
  const wasmBinary = await response.arrayBuffer();

  // Create the WASM instance
  const { instance }: any = await WebAssembly.instantiate(wasmBinary, {
    wasi_snapshot_preview1: wasi.wasiImport,
  });
  // Get the exported function
  return instance.exports.predictAIBestNextMove;
};
