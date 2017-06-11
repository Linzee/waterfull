import Building from './Building';

export default class Out extends Building {

  constructor(stagePlay) {
    super([require("../images/out_0.png"), require("../images/out_1.png"), require("../images/out_2.png")]);
    this.stagePlay = stagePlay;
    this.sprite.scale.x = 0.2;
    this.sprite.scale.y = 0.2;
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
