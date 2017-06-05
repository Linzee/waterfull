import Structure from './structure';

export default class Building extends Structure {

	constructor(x, y) {
		super();
		this.x = x;
		this.y = y;
		this.pipes = [];
	}

	waterIn() {
		return 0;
	}

	waterOut() {
		return 0;
	}

	canHoldWater() {
		return false;
	}

}
