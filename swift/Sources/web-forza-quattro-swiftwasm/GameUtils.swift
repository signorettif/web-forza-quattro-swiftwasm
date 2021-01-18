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


func scorePosition (board: [[Int]], row: Int, column: Int, delta_y: Int, delta_x: Int) => {
    var human_points = 0;
    var computer_points = 0;

    // Determine score through amount of available chips
    for i in 0..<4 {
      if (board[row][column] == HUMAN_PLAYER) {
        human_points++; // Add for each human chip
      } else if (board[row][column] == AI_PLAYER) {
        computer_points++; // Add for each computer chip
      }

      // Moving through our board
      row += delta_y;
      column += delta_x;
    }

    // Marking winning/returning score
    if (human_points == 4) {
      return -CONSTANTS.WINNING_SCORE;
    } else if (computer_points == 4) {
      return CONSTANTS.WINNING_SCORE;
    } else {
      // Return normal points
      return computer_points - human_points;
    }
};

static score = (state: GameState) => {
    var points = 0;
    const { board } = state;

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
    for (var row = 0; row < N_ROWS - 3; row++) {
      for (var column = 0; column < N_COLS; column++) {
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
    for (var row = 0; row < N_ROWS; row++) {
      for (var column = 0; column < N_COLS - 3; column++) {
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
    for (var row = 0; row < N_ROWS - 3; row++) {
      for (var column = 0; column < N_COLS - 3; column++) {
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
    for (var row = 3; row < N_ROWS; row++) {
      for (var column = 0; column <= N_COLS - 4; column++) {
        var score = GameUtils.scorePosition(board, row, column, -1, +1);
        diagonal_points2 += score;
      }
    }

    points =
      horizontal_points + vertical_points + diagonal_points1 + diagonal_points2;

    return points;
  };
