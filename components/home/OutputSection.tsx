// Utils
import { classnames } from 'tailwindcss-classnames';
import { CONSTANTS } from '../../shared/config/constants';

// Game stuff
import GameState from '../../shared/gameHelpers/GameState';

// Types
interface OutputSectionProps {
  gameState: GameState;
}

export const OutputSection = ({ gameState }: OutputSectionProps) => {
  return (
    <>
      {gameState.board.map((row, index) => (
        <div className="contents" key={index}>
          <div className="text-center text-secondary">{index + 1}</div>
          {row.map((colValue, index) => (
            <div
              className={classnames('w-6', 'h-6', 'rounded-sm', 'm-auto', {
                [classnames('bg-blue-400')]:
                  colValue === CONSTANTS.HUMAN_PLAYER,
                [classnames('bg-red-400')]: colValue === CONSTANTS.AI_PLAYER,
                [classnames('bg-cell-bg')]: colValue === 0,
              })}
              key={index}
            >
              {/* nothing to see here */}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
