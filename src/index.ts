import DomController from "./Ui/DomController";
import GameController from "./Core/GameController";

const dom = new DomController();
const game = new GameController(dom);

game.start();
