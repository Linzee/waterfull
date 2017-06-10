import Structure from './Structure';
import {animatedSprite, avg} from '../common/Utils';

export default class Building extends Structure {

	constructor(image) {
		super();
		this.pipes = [];

		if(Array.isArray(image)) {
			this.sprite = animatedSprite(image);
			this.waterLevelImages = true;
			this.waterLevels = Array.apply(null, Array(Building.WATER_IMAGE_SMOOTHING_LEVEL)).map(Number.prototype.valueOf,0);
			this.waterLevelsPointer = 0;
		} else {
			this.sprite = new PIXI.Sprite.fromImage(image);
			this.waterLevelImages = false;
		}
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		this.addChildAt(this.sprite, 0);
	}

	addWater(water) {
		super.addWater(water);
		this.updateImage();
	}

	lowerWater(water) {
		super.lowerWater(water);
		this.updateImage();
	}

	destructor() {
		super.destructor();
		this.pipes.forEach((pipe) => {
			var ob = pipe.getOther(this);
			ob[0].pipes.splice(ob[0].pipes.indexOf(pipe), 1);
			pipe.parent.removeChild(pipe);
		});
	}

	updateImage() {
		if(this.waterLevelImages && this.isActive()) {

			this.waterLevels[this.waterLevelsPointer] = this.water;
			this.waterLevelsPointer += 1;
			if(this.waterLevelsPointer >= this.waterLevels.length) {
				this.waterLevelsPointer = 0;
			}

			let water = avg(this.waterLevels);

			this.sprite.gotoAndStop(Math.round((water / this.getCapacity()) * (this.sprite.totalFrames-1)));
		}
	}

}

Building.WATER_IMAGE_SMOOTHING_LEVEL = 23;
