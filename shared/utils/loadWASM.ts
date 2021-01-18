// // WASM stuff
// import { WASI } from '@wasmer/wasi';
// import { WasmFs } from '@wasmer/wasmfs';

// // CONSTANTS
// import { CONSTANTS } from './../config/constants';

// export const loadWasmUtil = async () => {
//   try {
//     const wasmFs = new WasmFs();

//     let wasi = new WASI({
//       args: [],
//       env: {},
//       bindings: {
//         ...WASI.defaultBindings,
//         fs: wasmFs.fs,
//       },
//     });
//     const response = await fetch(CONSTANTS.WASM_FILE_PATH);
//     const wasmBinary = await response.arrayBuffer();

//     console.log(wasmBinary);

//     // Create the WASM instance
//     const { instance }: any = await WebAssembly.instantiate(wasmBinary, {
//       wasi_snapshot_preview1: wasi.wasiImport,
//     });

//     console.log(instance.exports.memory);

//     var enc = new TextEncoder();
//     const myString = enc.encode('dafdsfsadfdsa');
//     console.log(myString);

//     // Get the exported function
//     console.log(instance.exports.predictAIBestNextMove(myString, 6));
//     return instance.exports.predictAIBestNextMove(
//       JSON.stringify({ board: [[3]], player: 5 }),
//       6
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// WASM stuff
import { SwiftRuntime } from 'javascript-kit-swift';
import { WASI } from '@wasmer/wasi';
import { WasmFs } from '@wasmer/wasmfs';

// Game stuff
import GameState from '../gameHelpers/GameState';

const swift = new SwiftRuntime();
// Instantiate a new WASI Instance
const wasmFs = new WasmFs();

// Output stdout and stderr to console
const originalWriteSync = wasmFs.fs.writeSync;
wasmFs.fs.writeSync = (fd, buffer, offset, length, position) => {
  const text = new TextDecoder('utf-8').decode(buffer);

  // Filter out standalone "\n" added by every `print`, `console.log`
  // always adds its own "\n" on top.
  if (text !== '\n') {
    switch (fd) {
      case 1:
        console.log(text);
        break;
      case 2:
        console.error(text);
        break;
    }
  }
  return originalWriteSync(fd, buffer, offset, length, position);
};

let wasi = new WASI({
  args: [],
  env: {},
  bindings: {
    ...WASI.defaultBindings,
    fs: wasmFs.fs,
  },
});

export const loadWasmUtil = async () => {
  // Fetch our Wasm File
  const response = await fetch('main.wasm');
  const responseArrayBuffer = await response.arrayBuffer();

  // Instantiate the WebAssembly file
  const wasm_bytes = new Uint8Array(responseArrayBuffer).buffer;
  let { instance } = await WebAssembly.instantiate(wasm_bytes, {
    wasi_snapshot_preview1: wasi.wasiImport,
    javascript_kit: swift.importObjects(),
  });

  var predictAIUsingSwift = 0;

  swift.setInstance(instance);
  // Start the WebAssembly WASI instance!
  wasi.start(instance);

  // Required because TS has no idea about what's actually happening in the global scope from Swift
  let returnFunc = ((window as unknown) as {
    predictAIUsingSwift: (gameState: GameState, maxDepth: number) => number;
  }).predictAIUsingSwift;

  return returnFunc;
};

// startWasiTask();
