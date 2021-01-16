// Game stuff
import GameState from '../../../shared/gameHelpers/GameState';
import GameUtils from '../../../shared/gameHelpers/GameUtils';
import { WidgetFrame } from './WidgetFrame';

// Types
interface AIStatsProps {
  gameState: GameState;
}

export const AIStats = ({ gameState }: AIStatsProps) => {
  return (
    <WidgetFrame title="🤖 AI statistics">
      <p className="text-sd-seconday mt-4">
        Score assigned to current board:{' '}
        <span className="text-white">{GameUtils.score(gameState)}</span>
      </p>
    </WidgetFrame>
  );
};
