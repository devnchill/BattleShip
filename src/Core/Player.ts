import GameBoard from "./GameBoard";

class Player {
  gameBoard: GameBoard;
  name: string;
  constructor(name: string) {
    this.gameBoard = new GameBoard();
    this.name = name;
  }
}

class Human extends Player {}

class Ai extends Player {
  constructor() {
    super("AI");
  }
}

export { Human, Ai };
