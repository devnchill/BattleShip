import { Carrier, Destroyer, Submarine } from "../src/Core/Ship";
test("Check Length For Ships", () => {
  const carrier = new Carrier();
  const destroyer = new Destroyer();
  const submarine = new Submarine();

  expect(carrier.isSunk()).toBeFalsy();
  expect(submarine.isSunk()).toBeFalsy();
  expect(destroyer.isSunk()).toBeFalsy();

  carrier.hit();
  carrier.hit();
  carrier.hit();
  carrier.hit();
  carrier.hit();

  expect(carrier.isSunk()).toBeTruthy();
});
