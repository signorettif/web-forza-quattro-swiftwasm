import Foundation

let N_COLS = 7
let N_ROWS = 6


struct GameState {
    var player: Int
    var board: [[Int]]
    
    init(player: Int, board: [[Int]]) {
        self.player = player
        self.board = board
    }
}


 

@_cdecl("predictAIBestNextMove")
func predictAIBestNextMove(board: [[Int]], player: Int) -> Int {
    let tempGame = GameState(player: player, board: board)
    
    return tempGame.player
}

