import { Ai, Human } from "../Core/Player";
import DomController from "./DomController";

class GameController {
  private human!: Human;
  private ai!: Ai;
  private dom: DomController;
  constructor() {
    this.dom = new DomController();
  }

  async start(): Promise<void> {
    const playerName = await this.dom.getName();
    this.human = new Human(playerName);
    this.ai = new Ai();
    let isGameOver = false;
    while (!isGameOver) {
      this.dom.syncBoards(this.human.gameBoard.board, this.ai.gameBoard.board);
      isGameOver = true;
    }
  }
}

export default GameController;
