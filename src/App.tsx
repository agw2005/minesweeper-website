import Board from "./components/board";

const numberOfTiles = 64;

function App() {
  return (
    <>
      <h1>Minesweeper</h1>
      <Board n={numberOfTiles} />
    </>
  );
}

export default App;
