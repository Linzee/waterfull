import Building from './Building';

export default class In extends Building {

	constructor() {
		super(require("../images/in.png"))
	}

	getCapacity() {
		return 0;
	}

	tick() {
		super.tick();
		if(this.isActive()) {
    	this.water = this.level;
		}
  }

}
