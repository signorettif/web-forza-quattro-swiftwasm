// Game stuff
import GameState from "shared/gameHelpers/GameState";
import GameUtils from "shared/gameHelpers/GameUtils";

// Styles
import styles from "styles/components/navbar.module.scss";

export const AIStats = ({ gameState }: { gameState: GameState }) => (
  <span className={styles.navbarComponent}>{GameUtils.score(gameState)}</span>
);
