import Board from "./components/board";
import FlagButton from "./components/flagButton";
import MinesCount from "./minesCount";

function App() {
  return (
    <>
      <MinesCount />
      <Board />
      <br />
      <FlagButton />
    </>
  );
}

export default App;
