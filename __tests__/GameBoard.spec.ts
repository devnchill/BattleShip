import GameBoard from "../src/Core/GameBoard";
import { Carrier } from "../src/Core/Ship";
import { CellState } from "../src/Types/GameBoard.Types";

test("test for GameBoard class", () => {
  const gameBoard = new GameBoard();
  expect(gameBoard.board).toEqual(
    Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ({
        state: CellState.UNTOUCHED,
        hasShip: false,
      })),
    ),
  );
  expect(gameBoard.areAllShipsSunk()).toBeTruthy();
  gameBoard.placeShip(new Carrier(), [0, 0]);
  expect(gameBoard.areAllShipsSunk()).toBeFalsy();
});
