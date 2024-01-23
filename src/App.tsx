import Canvas from "./components/Canvas";
import "./App.scss";
import useGameInitialization from "./hooks/useGameInitialization";

function App() {
  const { score, gameOver } = useGameInitialization();

  return (
    <main className="main">
      <header>
        <h2>A Fun Breakout game!</h2>
      </header>

      <section className="info">
        {!gameOver ? (
          <p>
            Use the left and right arrow keys to move the paddle. Try to break
            all the bricks! Tap the spacebar to start.
          </p>
        ) : (
          <p>Game Over! Tap the spacebar to restart.</p>
        )}
        <span className="info__score">{score}</span>
      </section>

      <section>
        <Canvas />
      </section>
    </main>
  );
}

export default App;
