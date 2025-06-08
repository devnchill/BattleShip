import GameBoard from "../src/Core/GameBoard";
import { Carrier } from "../src/Core/Ship";
import { CellState } from "../src/Types/GameBoard.Types";

test("test for GameBoard class", () => {
  const board = new GameBoard();
  expect(board.board).toEqual(
    Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ({
        state: CellState.UNTOUCHED,
      })),
    ),
  );
  expect(board.areAllShipsSunk()).toBeTruthy();
  board.placeShip(new Carrier(), [0, 0]);
  expect(board.areAllShipsSunk()).toBeFalsy();
});
