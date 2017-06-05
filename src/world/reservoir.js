import Building from './building';

export default class Reservior extends Building {

	constructor(x, y) {
		super(x, y);
    this.water = 0;
	}

  waterIn() {
		return level;
	}

	waterOut() {
		return level;
	}

	canHoldWater() {
		return true;
	}

}
