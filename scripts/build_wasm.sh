#!/bin/bash


echo 'Removing old file...'
rm public/main.wasm
export PATH=/Library/Developer/Toolchains/swift-latest.xctoolchain/usr/bin:"${PATH}"
echo 'Compiling new file...'
cd swift
# swiftc -target wasm32-unknown-wasi Sources/web-forza-quattro-swiftwasm/main.swift -o public/main.wasm -Xlinker --export=predictAIBestNextMove
swift package clean
swift build --triple wasm32-unknown-wasi
cd ../
cp swift/.build/debug/web-forza-quattro-swiftwasm.wasm public/main.wasm
echo 'Done!'