import "./Css/styles.css";
import GameController from "./Controller/GameController";

window.addEventListener("DOMContentLoaded", () => {
  const game = new GameController();
  game.start();
});
