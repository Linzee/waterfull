import Building from './Building';

export default class Out extends Building {

  constructor() {
    super(require("../images/out.png"))
  }

	getCapacity() {
		return this.level;
	}

  tick() {
    super.tick();
    if(this.isActive()) {
      this.water = 0;
    }
  }

}
