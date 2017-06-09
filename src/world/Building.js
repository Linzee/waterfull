import Structure from './Structure';
import {animatedSprite} from '../common/Utils';

export default class Building extends Structure {

	constructor(image) {
		super();
		this.pipes = [];

		if(Array.isArray(image)) {
			this.sprite = animatedSprite(image);
			this.waterLevelImages = true;
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
			this.sprite.gotoAndStop(Math.round((this.water / this.getCapacity()) * (this.sprite.totalFrames-1)));
		}
	}

}
