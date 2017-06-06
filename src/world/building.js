import Structure from './structure';

export default class Building extends Structure {

	constructor(image) {
		super();
		this.pipes = [];

		this.addChild(new PIXI.Sprite.fromImage(image));
	}

	waterIn() {
		return 0;
	}

	waterOut() {
		return 0;
	}

	canHoldWater() {
		return false;
	}

}
