import Structure from './Structure';

export default class Building extends Structure {

	constructor(image) {
		super();
		this.pipes = [];
		this.water = 0;

		this.addChild(new PIXI.Sprite.fromImage(image));
	}

	getWater() {
		return this.water;
	}

	getCapacity() {
		return 1;
	}

	addWater(water) {
		this.water = Math.min(this.getCapacity(), this.water + water);
	}

	lowerWater(water) {
		this.water = Math.max(0, this.water - water);
	}

	tick() {

	}

	destructor() {
		super.destructor();
		this.pipes.forEach((pipe) => {
			var ob = pipe.getOther(this);
			ob[0].pipes.splice(ob[0].pipes.indexOf(pipe), 1);
			pipe.parent.removeChild(pipe);
		});
	}

}
