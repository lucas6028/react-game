import React from "react";
import { CellOptions } from "../Types";
import Cell from "./Cell";

interface Props {
  currentBoard: CellOptions[][];
}

function Board({ currentBoard }: Props) {
  return (
    <>
      <h1>Tetris</h1>
      <div className="board">
        {currentBoard.map((row, rowIndex) => (
          <div className="row" key={`${rowIndex}`}>
            {row.map((cell, colIndex) => (
              <Cell key={`${rowIndex}-${colIndex}`} type={cell} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
