// React stuff
import { Dispatch, SetStateAction } from 'react';
import { CONSTANTS } from '../../shared/config/constants';

// Game stuff
import GameState from '../../shared/gameHelpers/GameState';
import GameUtils from '../../shared/gameHelpers/GameUtils';

// Types
interface InputSectionProps {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
}

export const InputSection = ({
  gameState,
  setGameState,
}: InputSectionProps) => {
  const columns = [...Array(CONSTANTS.N_COLS + 1).keys()];
  const allowedColumns = GameUtils.allowedColumns(gameState);

  const playColumn = (col: number) => {
    setGameState(() => GameUtils.playInColumn(gameState, col));
  };

  return (
    <>
      {columns.map((column) => (
        <div
          key={column}
          className="text-center cursor-pointer text-blue-700"
          onClick={() => playColumn(column - 1)}
        >
          {column !== 0 ? column : ''}
        </div>
      ))}
    </>
  );
};
