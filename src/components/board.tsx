import Tile from "./tile";

let x: number[] = Array(64).fill(0);

function Board() {
  return (
    <div className="w-BoardWidth h-BoardHeight border-BoardBorderWidth bg-gray-500 border-gray-700 mx-auto flex flex-wrap">
      {x.map(() => (
        <Tile />
      ))}
    </div>
  );
}

export default Board;
