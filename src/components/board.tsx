import Tile from "./tile";

interface ListGroupTile {
  n: number;
}

function Board({ n }: ListGroupTile) {
  const elements = Array(n)
    .fill(null)
    .map((_, index) => <Tile key={index} />);
  return <div id="board">{elements}</div>;
}

export default Board;
