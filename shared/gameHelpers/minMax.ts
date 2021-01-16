// Game stuff
import GameState from './GameState';
import GameUtils from './GameUtils';

// Constants
import { CONSTANTS } from './../config/constants';

export const minMax = (state: GameState, isMaximizing = true, depth = 0) => {
  // If it is a terminal node, then we can call it a day

  let bestMove = -1;
  let bestScore = isMaximizing === true ? -Infinity : Infinity;

  for (const col in GameUtils.allowedColumns(state)) {
    const tempGame = GameUtils.playInColumn(state, parseInt(col));
    const tempGameScore = GameUtils.score(tempGame);
    var newBestScore: number;

    if (!tempGame.isTerminal() && depth < CONSTANTS.MAX_DEPTH) {
      newBestScore = minMax(tempGame, !isMaximizing, depth + 1)[0];
    } else {
      newBestScore = tempGameScore;
    }

    if (isMaximizing && newBestScore > bestScore) {
      bestScore = newBestScore;
      bestMove = parseInt(col);
    }

    if (!isMaximizing && newBestScore < bestScore) {
      bestScore = newBestScore;
      bestMove = parseInt(col);
    }
  }

  return [bestScore, bestMove];
};
