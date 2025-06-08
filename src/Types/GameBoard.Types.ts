import { Ship } from "../Core/Ship";

/**
 * A coordinate on the game board.
 *
 * Represented as a tuple of two numbers: [row, column].
 */
export type Coor = [number, number];

/**
 * Represents the possible states of a cell on the game board.
 */
export enum CellState {
  /** The cell has not been touched yet. */
  UNTOUCHED,

  /** A shot was fired at this cell and it missed. */
  MISS,

  /** A shot was fired at this cell and it hit a ship. */
  HIT,
}

/**
 * Represents a single cell on the game board.
 */
export interface ICell {
  /** The current state of the cell. */
  state: CellState;

  /** The ship (if any) occupying this cell. */
  ship?: Ship;
  hasShip: boolean;
}
