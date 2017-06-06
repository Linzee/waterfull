import Building from './Building';

export default class Reservior extends Building {

	constructor() {
		super(require("../images/reservoir.png"));
    this.water = 0;
	}

  waterIn() {
		return this.level;
	}

	waterOut() {
		return this.level;
	}

	canHoldWater() {
		return true;
	}

}
