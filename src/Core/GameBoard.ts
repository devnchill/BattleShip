import { CellState } from "../Types/GameBoard.Types";
import { ICell, Coor } from "../Types/GameBoard.Types";
import generateShipCoordinates from "../Util/CoorGenerator";
import validate from "../Util/Validator";
import { Ship } from "./Ship";

/**
 * Represents the game board containing ships and their state.
 */
export default class GameBoard {
  private _board: ICell[][];
  private allShips: Ship[] = [];

  /**
   * Initializes a 10x10 board with all cells set to UNTOUCHED.
   */
  constructor() {
    this._board = Array.from({ length: 10 }, (): ICell[] =>
      Array.from(
        { length: 10 },
        (): ICell => ({
          state: CellState.UNTOUCHED,
          hasShip: false,
        }),
      ),
    );
  }

  /**
   * Places a ship on the board starting at a given coordinate.
   * @param ship - The ship instance to be placed.
   * @param start - The starting coordinate (row, col) for placement.
   * @returns True if placement is successful, false otherwise.
   */
  placeShip(ship: Ship, start: Coor): boolean {
    const orientation = ship.orientation;
    const length = ship.length;
    const coordsToPlace: Coor[] = [];

    for (const coor of generateShipCoordinates(start, length, orientation)) {
      if (!validate(coor) || this._board[coor[0]][coor[1]].hasShip) {
        return false;
      }
      coordsToPlace.push(coor);
    }

    for (const c of coordsToPlace) {
      this._board[c[0]][c[1]].hasShip = true;
      this._board[c[0]][c[1]].ship = ship;
    }

    this.allShips.push(ship);
    return true;
  }

  /**
   * Handles an attack at a specific coordinate.
   * @param c - The coordinate (row, col) being attacked.
   */
  recieveAttach(c: Coor): void {
    const [x, y] = c;
    if (this._board[x][y].hasShip) {
      this._board[x][y].state = CellState.HIT;
      this._board[x][y].ship?.hit();
    } else {
      this._board[x][y].state = CellState.MISS;
    }
  }

  /**
   * Checks whether all ships on the board have been sunk.
   * @returns True if all ships are sunk, false otherwise.
   */
  public areAllShipsSunk(): boolean {
    return this.allShips.every((ship: Ship): boolean => ship.isSunk());
  }

  /**
   * Gets the current state of the board.
   */
  get board(): ICell[][] {
    return this._board;
  }
}
