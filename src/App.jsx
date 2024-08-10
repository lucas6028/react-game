import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./utility/components/Home";
import Tetris from "./tetris/Tetris";
import TicTacToe from "./tic-tac-toe/TicTacToe";
import "./index.css";
import Hamster from "./hamster/Hamster";
// import FavTrack from "./spotify/FavTrack";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/tetris" element={<Tetris></Tetris>}></Route>
          <Route path="/tic-tac-toe" element={<TicTacToe></TicTacToe>}></Route>
          <Route path="/hamster" element={<Hamster></Hamster>}></Route>
          {/* <Route path="/favTrack" element={<FavTrack></FavTrack>}></Route>y */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
