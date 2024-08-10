import { useState } from "react";
import styles from "./TicTacToe.module.css";
import NavigationButton from "../utility/components/NavigationButton";
import homeImage from "../assets/home.png";

function TicTacToe() {
  const rows = 3;
  const cols = 3;

  const initialGrid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => "")
  );

  const [grid, setGrid] = useState(initialGrid);
  const [currMark, setCurrMark] = useState("X");
  const [result, setResult] = useState("X Turn");
  const [isFinish, setIsFinish] = useState(false);

  const handleClick = (row, col) => {
    if (isFinish || grid[row][col] !== "") {
      return;
    }

    const newGrid = grid.map((rowArr, rowIndex) =>
      rowArr.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? currMark : cell
      )
    );

    setGrid(newGrid);

    const flag = checkIsFinish(newGrid);
    if (flag == 1) {
      setIsFinish(true);
      setResult(`${currMark} Wins`);
    } else if (flag == -1) {
      setIsFinish(true);
      setResult("Draw");
    } else {
      setCurrMark(currMark === "X" ? "O" : "X");
      setResult(`${currMark === "X" ? "O" : "X"} Turn`);
    }
  };

  function checkIsFinish(grid) {
    for (let i = 0; i < rows; ++i) {
      const row = grid[i];
      if (row.every((value) => value === row[0] && value !== "")) {
        return 1;
      }
    }

    for (let i = 0; i < cols; ++i) {
      if (grid.every((row) => row[i] === grid[0][i] && row[i] !== "")) {
        return 1;
      }
    }

    if (
      grid[0][0] === grid[1][1] &&
      grid[1][1] === grid[2][2] &&
      grid[0][0] !== ""
    ) {
      return 1;
    }

    if (
      grid[0][2] === grid[1][1] &&
      grid[1][1] === grid[2][0] &&
      grid[0][2] !== ""
    ) {
      return 1;
    }

    for (let row of grid) {
      for (let value of row) {
        if (value === "") {
          return 0;
        }
      }
    }

    return -1;
  }

  const handleRestart = () => {
    setCurrMark("X");
    setIsFinish(false);
    setResult("X Turn");
    setGrid(initialGrid);
  };

  return (
    <div className={styles.container}>
      <h1>Tic-Tac-Toe</h1>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((mark, colIndex) => (
            <button
              key={colIndex}
              onClick={() => handleClick(rowIndex, colIndex)}
              className={`${styles.button} ${
                mark === "X"
                  ? styles["x-mark"]
                  : mark === "O"
                  ? styles["o-mark"]
                  : ""
              }`}
            >
              {mark}
            </button>
          ))}
        </div>
      ))}
      <p className={styles.result}>{result}</p>
      <button onClick={handleRestart} className={styles.restart}>
        Start New Game
      </button>
      <NavigationButton to="/" className={styles.homeButton}>
        <img src={homeImage} alt="home" className={styles.homeImage}></img>
      </NavigationButton>
    </div>
  );
}

export default TicTacToe;
