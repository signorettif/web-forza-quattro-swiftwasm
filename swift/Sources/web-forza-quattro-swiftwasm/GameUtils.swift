//
//  GameUtils.swift
//
//
//  Created by Francesco S on 18/01/21.
//

import Foundation


// Board setup
let N_ROWS = 6
let N_COLS = 7

// Players
let AI_PLAYER = -1
let HUMAN_PLAYER = 1
let WINNING_SCORE = 1000000

// Search algorithm
let MAX_DEPTH = 4


// Scores a position
public func scorePosition (board: [[Int]], startRow: Int, startColumn: Int, delta_y: Int, delta_x: Int) -> Int {
    var human_points = 0;
    var computer_points = 0;
    var row = startRow
    var column = startColumn

    // Determine score through amount of available chips
    for _ in 0..<4 {
      if (board[row][column] == HUMAN_PLAYER) {
        human_points += 1; // Add for each human chip
      } else if (board[row][column] == AI_PLAYER) {
        computer_points += 1; // Add for each computer chip
      }

      // Moving through our board
      row += delta_y;
      column += delta_x;
    }

    // Marking winning/returning score
    if (human_points == 4) {
      return -WINNING_SCORE;
    } else if (computer_points == 4) {
      return WINNING_SCORE;
    } else {
      // Return normal points
      return computer_points - human_points;
    }
}



// Scores the whole board
func score (board: [[Int]]) -> Int {
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
            let score = scorePosition(board: board, startRow: row, startColumn: column, delta_y: 1, delta_x: 0);
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
        for column in 0..<(N_COLS-3) {
            let score = scorePosition(board: board, startRow: row, startColumn: column, delta_y: 0, delta_x: 1);
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
    for column in 0..<(N_COLS-3) {
        let score = scorePosition(board: board, startRow: row, startColumn: column, delta_y: 1, delta_x: 1);
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
    for row in 3..<(N_ROWS) {
        for column in 0..<(N_COLS-4) {
            let score = scorePosition(board: board, startRow: row, startColumn: column, delta_y: -1, delta_x: 1);
            diagonal_points2 += score;
        }
    }

    points = horizontal_points + vertical_points + diagonal_points1 + diagonal_points2;

    return points;
}



// Predicts the next move for AI (using minmax algorithm)
func predictAIBestNextMove (board: [[Int]], player: Int, maxDepth: Int) -> Int {
    
//    var bestPlay = -1;
//
//    if (state.player == AI_PLAYER) {
//        let resultsArray = minMax(state: state, isMaximizing: true, maxDepth: maxDepth)
//
//        let bestScore = resultsArray[0]
//        let bestMove = resultsArray[1]
//
//        print("[SWIFT_AI] Playing in \(bestMove + 1) with expected payoff of \(bestScore)")
//
//        bestPlay = bestMove
//    } else {
//        print("[SWIFT_AI_ERROR] Player is not AI but I am asked to run a prediction");
//    }
//
//    print(bestPlay)
//    return bestPlay;
    
    return state.player
 };






// Game playing utils
func allowedColumns (board: [[Int]]) -> [Int] {
    var allowedColumns: [Int] = []
    
    for row in board {
        for column in row {
            if (column == 0) {
                allowedColumns.append(column)
            }
        }
    }
    
    return Array(Set(allowedColumns))
}


func playInColumn (state: GameState, col: Int) -> GameState {
    var tempBoard = state.board
    
    for row in stride(from: tempBoard.count - 1, through: 0, by: -1) {
      // Only places if allowed
      if (tempBoard[row][col] == 0) {
        tempBoard[row][col] = state.player;
        break;
      }
    }
    
    return GameState(board: tempBoard, player: -state.player)
    
    

//    return GameState(board: tempGameState, -state.player);
};


func isTerminal (board: [[Int]]) -> Bool {
    // Checks if the score is very high or very low (could be improved)
    if score(board: board) > 100000 || score(board: board) < -100000 {
        return true
    }
    
    return false
};
