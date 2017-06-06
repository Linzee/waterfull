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

}
