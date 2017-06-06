import Building from './Building';

export default class Reservior extends Building {

	constructor() {
		super(require("../images/reservoir.png"));
	}

	getCapacity() {
		return this.level * 100;
	}

}
