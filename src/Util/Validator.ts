import { Coor } from "../Types/GameBoard.Types";

/**
 * Validates whether a given coordinate is within the bounds of the game board.
 *
 * @param coor - The coordinate [row, col] to validate.
 * @returns True if the coordinate is within the 10x10 board bounds; false otherwise.
 */
export default function validate(coor: Coor): boolean {
  const [row, col] = coor;
  return row >= 0 && row < 10 && col >= 0 && col < 10;
}
