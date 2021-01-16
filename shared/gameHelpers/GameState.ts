/** Class representing a game state. */

import GameUtils from './GameUtils';

class GameState {
  board: number[][];
  player: 1 | -1;

  constructor(board, player) {
    this.board = board;
    this.player = player;
  }

  isTerminal() {
    return GameUtils.winner(this) !== null;
  }
}

export default GameState;
