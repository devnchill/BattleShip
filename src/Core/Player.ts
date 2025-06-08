import GameBoard from "./GameBoard";

class Player {
  gameBoard: GameBoard;
  name: string;
  constructor(name = "AI") {
    this.gameBoard = new GameBoard();
    this.name = name;
  }
}

class Human extends Player {
  constructor() {
    super(name);
  }
}

class Ai extends Player {}
