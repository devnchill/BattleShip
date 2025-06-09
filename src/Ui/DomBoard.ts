import { CellState, ICell } from "../Types/GameBoard.Types";
import PlayerType from "../Types/Player.Types";

class DomBoard {
  private board: HTMLDivElement;
  private playerType: PlayerType;

  constructor(playerType: PlayerType) {
    this.playerType = playerType;
    this.board = document.createElement("div");
    this.board.classList.add("domboard");
    this.registerEvents();
  }

  createBoard(): HTMLDivElement {
    for (let i = 0; i < 10; i++) {
      const row = document.createElement("div");
      row.classList.add("grid-row");
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.dataset.x = j.toString();
        cell.dataset.y = i.toString();
        row.appendChild(cell);
      }
      this.board.appendChild(row);
    }
    this.board.classList.add("gameboard");
    if (this.playerType == PlayerType.HUMAN) {
      this.board.classList.add("human-board");
    } else {
      this.board.classList.add("ai-board");
      this.board.style.pointerEvents = "none";
    }
    return this.board;
  }

  syncBoard(logicBoard: ICell[][]) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = this.board.querySelector(
          `.grid-cell[data-x="${j}"][data-y="${i}"]`,
        ) as HTMLDivElement;
        if (!cell) {
          throw new Error(`Cell at x:${i} y:${j} not found`);
        }
        cell.classList.remove("ship", "hit", "miss", "untouched");
        if (logicBoard[i][j].hasShip) {
          cell.classList.add("ship");
        }
        if (logicBoard[i][j].state == CellState.HIT) {
          cell.classList.add("hit");
        }
        if (logicBoard[i][j].state == CellState.UNTOUCHED) {
          cell.classList.add("untouched");
        }
        if (logicBoard[i][j].state == CellState.MISS) {
          cell.classList.add("miss");
        }
      }
    }
  }

  resetDomBoard(): void {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = this.board.querySelector(
          `.grid-cell[data-x="${j}"][data-y="${i}"]`,
        ) as HTMLDivElement;
        if (!cell) {
          throw new Error(`Cell at x:${i} y:${j} not found`);
        }
        cell.classList.remove("ship", "hit", "miss");
        cell.classList.add("untouched");
      }
    }
  }

  registerEvents(): void {
    this.board.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains("grid-cell")) return;

      const x = target.dataset.x;
      const y = target.dataset.y;
      console.log(`Clicked cell at (${x}, ${y})`);
    });
  }
}
export default DomBoard;
