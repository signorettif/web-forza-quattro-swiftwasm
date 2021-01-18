//
//  main.swift
//
//
//  Created by Francesco S on 18/01/21.
//

import Foundation
import JavaScriptKit

struct GameState: Codable {
    var board: [[Int]]
    var player: Int
}

func predictAIUsingSwift (gameStateData: JSValue, maxDepth: JSValue) -> JSValue {
    let decodedGameState: GameState = try! JSValueDecoder().decode(from: gameStateData)
    
    let decodedMaxDepth: Int = try! JSValueDecoder().decode(from: maxDepth)
    
    let valueToReturn = predictAIBestNextMove(state: decodedGameState, maxDepth: decodedMaxDepth)
    
    print(valueToReturn)

    return JSValue.number(Double(valueToReturn))
}

let closure = JSClosure { (input: [JSValue]) -> JSValue in predictAIUsingSwift(gameStateData: input[0], maxDepth: input[1]) }

JSObject.global.predictAIUsingSwift = .function(closure)
