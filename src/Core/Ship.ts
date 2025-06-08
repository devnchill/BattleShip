import ShipOrientation from "../Types/Ship.Types";

/**
 * Represents a generic ship on the game board.
 */
export class Ship {
  private _length: number;
  private noOfHits: number;
  private _orientation: ShipOrientation;

  /**
   * Creates a new ship instance.
   * @param length - The length of the ship.
   */
  constructor(length: number) {
    this._length = length;
    this.noOfHits = 0;
    this._orientation = ShipOrientation.HORIZONTAL;
  }

  /**
   * Records a hit on the ship.
   */
  hit(): void {
    this.noOfHits++;
  }

  /**
   * Checks if the ship is sunk.
   * @returns True if the ship is sunk, otherwise false.
   */
  isSunk(): boolean {
    return this._length <= this.noOfHits;
  }

  /**
   * Gets the total number of hits the ship has taken.
   */
  get totalHits(): number {
    return this.noOfHits;
  }

  /**
   * Gets the length of the ship.
   */
  get length(): number {
    return this._length;
  }

  /**
   * Gets the orientation of the ship.
   */
  get orientation(): ShipOrientation {
    return this._orientation;
  }

  /**
   * Toggles the orientation of the ship between horizontal and vertical.
   */
  toggleOrientation(): void {
    this._orientation =
      this._orientation === ShipOrientation.HORIZONTAL
        ? ShipOrientation.VERTICAL
        : ShipOrientation.HORIZONTAL;
  }
}

/**
 * A ship of length 2.
 */
export class Destroyer extends Ship {
  constructor() {
    super(2);
  }
}

/**
 * A ship of length 3.
 */
export class Submarine extends Ship {
  constructor() {
    super(3);
  }
}

/**
 * A ship of length 4.
 */
export class Battleship extends Ship {
  constructor() {
    super(4);
  }
}

/**
 * A ship of length 5.
 */
export class Carrier extends Ship {
  constructor() {
    super(5);
  }
}

/**
 * A ship of length 3.
 */
export class Cruiser extends Ship {
  constructor() {
    super(3);
  }
}
