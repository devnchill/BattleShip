import { CellState, ICell } from "../Types/GameBoard.Types";
import PlayerType from "../Types/Player.Types";

class DomBoard {
  private board: HTMLDivElement;
  private playerType: PlayerType;

  constructor(playerType: PlayerType) {
    this.playerType = playerType;
    this.board = document.createElement("div");
    this.board.classList.add("domboard");
  }

  createBoard(): HTMLDivElement {
    for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
      const row = document.createElement("div");
      row.classList.add("grid-row");
      for (let colIndex = 0; colIndex < 10; colIndex++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.dataset.row = rowIndex.toString();
        cell.dataset.column = colIndex.toString();
        row.appendChild(cell);
      }
      this.board.appendChild(row);
    }
    this.board.classList.add("gameboard");
    if (this.playerType == PlayerType.HUMAN) {
      this.board.classList.add("human-board");
      this.board.style.pointerEvents = "none";
    } else {
      this.board.classList.add("ai-board");
    }
    return this.board;
  }

  syncBoard(logicBoard: ICell[][]) {
    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        const cell = this.board.querySelector(
          `.grid-cell[data-row="${row}"][data-column="${column}"]`,
        ) as HTMLDivElement;
        if (!cell) {
          throw new Error(`Cell at row:${row} col:${column} not found`);
        }
        cell.classList.remove("ship", "hit", "miss", "untouched");
        const logicCell = logicBoard[row][column];
        if (logicCell.hasShip) cell.classList.add("ship");
        if (logicCell.state === CellState.HIT) cell.classList.add("hit");
        if (logicCell.state === CellState.UNTOUCHED)
          cell.classList.add("untouched");
        if (logicCell.state === CellState.MISS) cell.classList.add("miss");
      }
    }
  }

  resetDomBoard(): void {
    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        const cell = this.board.querySelector(
          `.grid-cell[data-row="${row}"][data-column="${column}"]`,
        ) as HTMLDivElement;
        if (!cell) {
          throw new Error(`Cell at row:${row} column:${column} not found`);
        }
        cell.classList.remove("ship", "hit", "miss");
        cell.classList.add("untouched");
      }
    }
  }
}
export default DomBoard;
