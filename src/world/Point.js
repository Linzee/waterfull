import Building from './Building';

export default class Point extends Building {

	constructor() {
		super(require("../images/point_0.png"));
		this.sprite.scale.x = 0.1;
    this.sprite.scale.y = 0.1;
	}

	getCapacity() {
		return this.level;
	}

}
