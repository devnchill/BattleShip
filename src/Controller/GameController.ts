import { Ai, Human } from "../Core/Player";
import DomController from "./DomController";
import {
  Cruiser,
  Submarine,
  Destroyer,
  Battleship,
  Carrier,
  Ship,
} from "../Core/Ship";
import { randomCoor } from "../Util/CoorGenerator";
import ShipOrientation from "../Types/Ship.Types";
import PlayerType from "../Types/Player.Types";

class GameController {
  private static getFreshShips(): Ship[] {
    return [
      new Cruiser(),
      new Carrier(),
      new Battleship(),
      new Destroyer(),
      new Submarine(),
    ];
  }
  private human!: Human;
  private ai!: Ai;
  private currentPlayer!: Human | Ai;
  private isGameOver = false;
  private dom: DomController;
  constructor() {
    this.dom = new DomController();
  }

  async start(): Promise<void> {
    const playerName = await this.dom.getName();
    this.human = new Human(playerName);
    this.ai = new Ai();
    this.currentPlayer = this.human;
    this.deployShips();
    await this.gameLoop();
  }

  private deployShips(): void {
    this.deployAiShips();
    this.deployHumanShips();
  }

  private deployHumanShips(): void {
    this.human.gameBoard.resetLogicalBoard();
    for (const ship of GameController.getFreshShips()) {
      ship.orientation =
        Math.random() < 0.5
          ? ShipOrientation.HORIZONTAL
          : ShipOrientation.VERTICAL;
      let placed = false;
      while (!placed) {
        placed = this.human.gameBoard.placeShip(ship, randomCoor());
      }
    }
    this.dom.syncHumanBoard(this.human.gameBoard.board);
  }

  private deployAiShips(): void {
    this.ai.gameBoard.resetLogicalBoard();
    for (const ship of GameController.getFreshShips()) {
      ship.orientation =
        Math.random() < 0.5
          ? ShipOrientation.HORIZONTAL
          : ShipOrientation.VERTICAL;
      let placed = false;
      while (!placed) {
        placed = this.ai.gameBoard.placeShip(ship, randomCoor());
      }
    }
    this.dom.syncAiBoard(this.ai.gameBoard.board);
  }

  private switchTurns(): void {
    this.currentPlayer =
      this.currentPlayer === this.human ? this.ai : this.human;
  }

  private async gameLoop(): Promise<void> {
    const humanDomBoard = document.querySelector(
      ".human-board",
    ) as HTMLDivElement;
    if (!humanDomBoard) {
      throw new Error("Human Board not found in gameLoop");
    }
    const aiDomBoard = document.querySelector(".ai-board") as HTMLDivElement;
    if (!aiDomBoard) {
      throw new Error("ai Board not found in gameLoop");
    }
    while (!this.isGameOver) {
      if (this.currentPlayer == this.human) {
        const coor = await this.dom.getClickedCoordinates(aiDomBoard);
        this.ai.gameBoard.receiveAttach(coor);
        if (this.ai.gameBoard.areAllShipsSunk()) {
          this.quitGame(PlayerType.HUMAN);
        }
      } else {
        // randomCoor returns Coordinate;
        this.human.gameBoard.receiveAttach(randomCoor());
        if (this.human.gameBoard.areAllShipsSunk()) {
          this.quitGame(PlayerType.AI);
        }
      }
      // make changes appear visually
      this.dom.syncBoards(this.human.gameBoard.board, this.ai.gameBoard.board);
      this.switchTurns();
    }
  }

  private quitGame(player: PlayerType) {
    console.log(player + "wins");
    this.dom.declareWinner(player);
    this.isGameOver = true;
  }
}

export default GameController;
