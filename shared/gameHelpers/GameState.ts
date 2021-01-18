/** Class representing a game state. */

import GameUtils from "./GameUtils";

// Helper to transpose
const transpose = (m) => m[0].map((x, i) => m.map((x) => x[i]));

class GameState {
  board: number[][];
  player: 1 | -1;

  constructor(board, player) {
    this.board = board;
    this.player = player;
  }

  getColumns() {
    return transpose(this.board);
  }

  isTerminal() {
    return GameUtils.winner(this) !== null;
  }
}

export default GameState;
