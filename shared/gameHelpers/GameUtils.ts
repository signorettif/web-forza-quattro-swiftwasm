import { minMax } from './minMax';
import { CONSTANTS } from '../config/constants';
import GameState from './GameState';

const N_ROWS = CONSTANTS.N_ROWS;
const N_COLS = CONSTANTS.N_COLS;

const AI_PLAYER = CONSTANTS.AI_PLAYER;
const HUMAN_PLAYER = CONSTANTS.HUMAN_PLAYER;

//todo@ improve manual process
const defaultBoard = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const checkPrototype = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

class GameUtils {
  static startGame = () => {
    let newBoard = defaultBoard.map((row) => row.slice());
    return new GameState(newBoard, 1);
  };

  //
  // Returns an array of the valid columns that an user can play
  //
  static allowedColumns = (state: GameState) => {
    const validColumns = state?.board.map((row) =>
      row.map((col, index) => (col === 0 ? index : null))
    );

    return [...new Set([].concat.apply([], validColumns))].filter(
      (val) => val !== null
    ) as number[];
  };

  //
  // Plays the selected column
  //
  static playInColumn = (state: GameState, col: number) => {
    const tempGameState = state.board.map((row) => row.slice());

    for (var row = N_ROWS - 1; row > -1; row--) {
      // Only places if allowed
      if (tempGameState[row][col] === 0) {
        tempGameState[row][col] = state.player;
        break;
      }
    }

    return new GameState(tempGameState, -state.player);
  };

  //
  // Scores a specific position
  //
  static scorePosition = (board, row, column, delta_y, delta_x) => {
    var human_points = 0;
    var computer_points = 0;

    // Determine score through amount of available chips
    for (var i = 0; i < 4; i++) {
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

  /**
   * Scoring of the board taken from https://github.com/Gimu/connect-four-js/blob/master/plain/minimax/js/board.js
   *
   * @return {number}
   */
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

  //
  // Runs the prediction for the next best move
  //
  static predictAIBestNextMove = (state: GameState) => {
    let bestPlay = -1;

    if (state.player === AI_PLAYER) {
      const [bestScore, bestMove] = minMax(state);

      console.log(
        `[AI] Playing in ${bestMove + 1} with expected payoff of ${bestScore}`
      );

      bestPlay = bestMove;
    } else {
      console.error(
        '[ERROR] Player is not AI but I am asked to run a prediction'
      );
    }

    return bestPlay;
  };

  //
  // Plays the best next move for
  //
  static playAIBestNextMove = (state: GameState) => {
    const colToPlay = GameUtils.predictAIBestNextMove(state);
    return GameUtils.playInColumn(state, colToPlay);
  };

  //
  //todo@ rewrite in your own code
  //Return the winner of the game (https://github.com/quasimik/medium-mcts/blob/master/game-c4.js)
  //
  static winner = (state: GameState) => {
    // if board is full, there's no winner
    if (
      !isNaN(state.board[0].reduce((acc, cur) => (cur == 0 ? NaN : acc + cur)))
    )
      return 0;

    // one board for each possible winning run orientation
    let checkBoards = new Map();
    checkBoards.set(
      'horiz',
      checkPrototype.map((row) => row.slice())
    );
    checkBoards.set(
      'verti',
      checkPrototype.map((row) => row.slice())
    );
    checkBoards.set(
      'ldiag',
      checkPrototype.map((row) => row.slice())
    );
    checkBoards.set(
      'rdiag',
      checkPrototype.map((row) => row.slice())
    );

    // iterate over the board
    for (let row = 0; row < N_ROWS; row++) {
      for (let col = 0; col < N_COLS; col++) {
        let cell = state.board[row][col];
        for (let [key, val] of checkBoards) {
          // accumulator
          let acc;
          switch (key) {
            case 'horiz':
              acc = val[row + 1][col]; // left
              break;
            case 'verti':
              acc = val[row][col + 1]; // top
              break;
            case 'ldiag':
              acc = val[row][col]; // top left
              break;
            case 'rdiag':
              acc = val[row][col + 2]; // top right
              break;
          }

          val[row + 1][col + 1] = cell;
          if ((cell < 0 && acc < 0) || (cell > 0 && acc > 0)) {
            val[row + 1][col + 1] += acc;
          }
          if (val[row + 1][col + 1] == 4) return 1;
          if (val[row + 1][col + 1] == -4) return -1;
        }
      }
    }
    return null;
  };
}

export default GameUtils;
