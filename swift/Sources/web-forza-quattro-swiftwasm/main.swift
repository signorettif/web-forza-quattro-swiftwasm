import Foundation
import JavaScriptKit

struct GameState: Codable {
    var board: [[Int]]
    var player: Int
}

func predictAIUsingSwift (gameStateData: JSValue) -> JSValue {
    let decodedGameState: GameState = try! JSValueDecoder().decode(from: gameStateData)

    return JSValue.number(Double(decodedGameState.player))
}

let closure = JSClosure { (input: [JSValue]) -> JSValue in predictAIUsingSwift(gameStateData: input[0]) }

JSObject.global.predictAIUsingSwift = .function(closure)
