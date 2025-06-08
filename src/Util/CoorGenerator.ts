import ShipOrientation from "../Types/Ship.Types";
import { Coor } from "../Types/GameBoard.Types";

/**
 * Generates all the coordinates that a ship would occupy based on
 * its starting position, length, and orientation.
 *
 * @param start - The starting coordinate [row, col].
 * @param length - The length of the ship.
 * @param orientation - The orientation of the ship (HORIZONTAL or VERTICAL).
 * @returns An array of coordinates that the ship would occupy.
 */
export default function generateShipCoordinates(
  start: Coor,
  length: number,
  orientation: ShipOrientation,
): Coor[] {
  const [row, col] = start;
  const coords: Coor[] = [];

  for (let i = 0; i < length; i++) {
    coords.push(
      orientation === ShipOrientation.HORIZONTAL
        ? [row, col + i]
        : [row + i, col],
    );
  }

  return coords;
}
