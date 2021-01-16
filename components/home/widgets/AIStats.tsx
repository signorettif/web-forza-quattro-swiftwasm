// Game stuff
import GameUtils from '../../../shared/gameHelpers/GameUtils';

// Types
interface AIStatsProps {
  gameState: GameState;
}

export const AIStats = ({ gameState }: AIStatsProps) => {
  return (
    <section className="bg-sidebar-element-bg rounded-2xl p-6 w-full shadow-md">
      <h2 className="font-medium text-xl">🤖 AI statistics</h2>
      <p className="text-sd-seconday mt-4">
        Score assigned to current board:{' '}
        <span className="text-white">{GameUtils.score(gameState)}</span>
      </p>
    </section>
  );
};
