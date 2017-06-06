import Building from './Building';

export default class Point extends Building {

	constructor() {
		super(require("../images/point.png"));
	}

	getCapacity() {
		return this.level;
	}

}
