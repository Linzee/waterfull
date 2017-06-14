import Building from './Building';

export default class In extends Building {

	constructor() {
		super(require("../images/in_0.png"));
		this.sprite.scale.x = 0.2;
    this.sprite.scale.y = 0.2;
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
