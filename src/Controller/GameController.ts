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
  private static allShips: Ship[] = [
    new Cruiser(),
    new Carrier(),
    new Battleship(),
    new Destroyer(),
    new Submarine(),
  ];
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
    this.gameLoop();
  }

  private deployShips(): void {
    this.deployAiShips();
    this.deployHumanShips();
  }

  private deployHumanShips(): void {
    this.human.gameBoard.resetLogicalBoard();
    for (const ship of GameController.allShips) {
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
    for (const ship of GameController.allShips) {
      this.ai.gameBoard.placeShip(ship, randomCoor());
    }
    this.dom.syncAiBoard(this.ai.gameBoard.board);
  }

  private async gameLoop(): Promise<void> {
    while (!this.isGameOver) {
      if (this.currentPlayer == this.human) {
        // human would click on ai domboard .
        // get coordinate from aidomboard
        this.ai.gameBoard.recieveAttach([2, 3]);
        if (this.ai.gameBoard.areAllShipsSunk()) {
          this.quitGame(PlayerType.AI);
        }
      } else {
        // randomCoor returns Coordinate;
        this.human.gameBoard.recieveAttach(randomCoor());
        if (this.human.gameBoard.areAllShipsSunk()) {
          this.quitGame(PlayerType.HUMAN);
        }
      }
      // make changes appear visually
      this.dom.syncBoards(this.human.gameBoard.board, this.ai.gameBoard.board);
    }
  }

  private quitGame(player: PlayerType) {
    this.dom.declareWinner(player);
    this.isGameOver = true;
  }
}

export default GameController;
