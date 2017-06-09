import Building from './Building';

export default class Out extends Building {

  constructor(stagePlay) {
    super(require("../images/out.png"));
    this.stagePlay = stagePlay;
  }

	getCapacity() {
		return this.level;
	}

  tick() {
    super.tick();
    if(this.isActive()) {
      this.stagePlay.waterDelivered += this.water;
      this.water = 0;
    }
  }

}
