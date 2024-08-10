import NavigationButton from "./NavigationButton";
import styles from "./Home.module.css";
import Hamster from "../../hamster/Hamster";

function Home() {
  return (
    <div className={styles.container}>
      <h1 className="homeTitle">React Games</h1>
      <NavigationButton to="/tetris">Tetris</NavigationButton>
      <NavigationButton to="/tic-tac-toe">Tic-Tac-Toe</NavigationButton>
      {/* <NavigationButton to="/favTrack">Favorite Track</NavigationButton> */}
      <Hamster></Hamster>
    </div>
  );
}

export default Home;
