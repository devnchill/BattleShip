import "./Css/styles.css";

import DomController from "./Controller/DomController";
import GameController from "./Controller/GameController";

window.addEventListener("DOMContentLoaded", () => {
  const dom = new DomController();
  const game = new GameController(dom);
  game.start();
});
