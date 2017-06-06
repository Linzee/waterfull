import Building from './Building';

export default class In extends Building {

	constructor() {
		super(require("../images/in.png"))
	}

	getCapacity() {
		return 0;
	}

	tick() {
    this.water = this.level;
  }

}
