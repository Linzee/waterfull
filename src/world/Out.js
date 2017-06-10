import Building from './Building';

export default class Out extends Building {

  constructor(stagePlay) {
    super([require("../images/out_0.png"), require("../images/out_1.png"), require("../images/out_2.png")]);
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
