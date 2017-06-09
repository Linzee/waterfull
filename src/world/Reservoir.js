import Building from './Building';

export default class Reservior extends Building {

	constructor() {
		super([require("../images/reservoir_0.png"), require("../images/reservoir_1.png"), require("../images/reservoir_2.png"), require("../images/reservoir_3.png"), require("../images/reservoir_4.png")]);
	}

	getCapacity() {
		return this.level * 1000;
	}

}
