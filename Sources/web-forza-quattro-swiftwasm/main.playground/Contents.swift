import Foundation

let N_COLS = 7
let N_ROWS = 6


//
// GameState main Struct
//
//
struct GameState {
    var player: Int
    var board: [[Int]]
    
    init(player: Int, board: [[Int]]) {
        self.player = player
        self.board = board
    }
    
}

extension GameState {
    func score () -> Int {
        var points = 0;

        var vertical_points = 0;
        var horizontal_points = 0;
        var diagonal_points1 = 0;
        var diagonal_points2 = 0;

        // Board-size: 7x6 (height x width)
        // Array indices begin with 0
        // => e.g. height: 0, 1, 2, 3, 4, 5

        // Vertical points
        // Check each column for vertical score
        //
        // Possible situations
        //  0  1  2  3  4  5  6
        // [x][ ][ ][ ][ ][ ][ ] 0
        // [x][x][ ][ ][ ][ ][ ] 1
        // [x][x][x][ ][ ][ ][ ] 2
        // [x][x][x][ ][ ][ ][ ] 3
        // [ ][x][x][ ][ ][ ][ ] 4
        // [ ][ ][x][ ][ ][ ][ ] 5
        for row in 0..<(N_ROWS - 3) {
            for column in 0..<N_COLS {
                var score = GameUtils.scorePosition(board, row, column, 1, 0);
                vertical_points += score;
            }
        }

        // Horizontal points
        // Check each row's score
        //
        // Possible situations
        //  0  1  2  3  4  5  6
        // [x][x][x][x][ ][ ][ ] 0
        // [ ][x][x][x][x][ ][ ] 1
        // [ ][ ][x][x][x][x][ ] 2
        // [ ][ ][ ][x][x][x][x] 3
        // [ ][ ][ ][ ][ ][ ][ ] 4
        // [ ][ ][ ][ ][ ][ ][ ] 5
        for row in 0..<(N_ROWS) {
            for column in 0..<(N_COLS - 3) {
                var score = GameUtils.scorePosition(board, row, column, 0, 1);
                horizontal_points += score;
            }
        }

        // Diagonal points 1 (left-bottom)
        //
        // Possible situation
        //  0  1  2  3  4  5  6
        // [x][ ][ ][ ][ ][ ][ ] 0
        // [ ][x][ ][ ][ ][ ][ ] 1
        // [ ][ ][x][ ][ ][ ][ ] 2
        // [ ][ ][ ][x][ ][ ][ ] 3
        // [ ][ ][ ][ ][ ][ ][ ] 4
        // [ ][ ][ ][ ][ ][ ][ ] 5
        for row in 0..<(N_ROWS - 3) {
            for column in 0..<(N_COLS - 3) {
                var score = GameUtils.scorePosition(board, row, column, 1, 1);
                diagonal_points1 += score;
            }
        }

        // Diagonal points 2 (right-bottom)
        //
        // Possible situation
        //  0  1  2  3  4  5  6
        // [ ][ ][ ][x][ ][ ][ ] 0
        // [ ][ ][x][ ][ ][ ][ ] 1
        // [ ][x][ ][ ][ ][ ][ ] 2
        // [x][ ][ ][ ][ ][ ][ ] 3
        // [ ][ ][ ][ ][ ][ ][ ] 4
        // [ ][ ][ ][ ][ ][ ][ ] 5
        for row in 0..<(N_ROWS) {
            for column in 0..<(N_COLS - 4) {
                var score = GameUtils.scorePosition(board, row, column, -1, +1);
                diagonal_points2 += score;
            }
        }

        points =
          horizontal_points + vertical_points + diagonal_points1 + diagonal_points2;

        return points;
    }
}


 

@_cdecl("predictAIBestNextMove")
func predictAIBestNextMove(board: [[Int]], player: Int) -> Int {
    let tempGame = GameState(player: player, board: board)
    
    return tempGame.player
}

