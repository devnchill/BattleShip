import DomController from "./DomController";

class GameController {
  constructor(private dom: DomController) {}

  async start() {
    const playerName = await this.dom.getName();
    console.log(playerName);
  }
}

export default GameController;
