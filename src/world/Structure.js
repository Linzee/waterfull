import {animatedSprite} from '../common/Utils';

export default class Structure extends PIXI.Container {

	constructor() {
		super();
		this.level = 0;
		this.targetLevel = 1;
		this.water = 0;

		this.upgradeClock = animatedSprite([require('../images/time_0.png'), require('../images/time_1.png'), require('../images/time_2.png'), require('../images/time_3.png'), require('../images/time_4.png')]);
		this.upgradeClock.anchor.x = 0.5;
		this.upgradeClock.anchor.y = 0.5;
		this.addChild(this.upgradeClock);
	}

	getWater() {
		return this.water;
	}

	getCapacity() {
		return 1;
	}

	addWater(water) {
		if(this.isActive()) {
			this.water = Math.min(this.getCapacity(), this.water + water);
		} else {
			this.water += water;
			this.updateUpgradeClock();
		}
	}

	lowerWater(water) {
		this.water = Math.max(0, this.water - water);
	}

	isActive() {
		return this.level === this.targetLevel;
	}

	getRequiredWater() {
		return 100 * Math.abs(this.level - this.targetLevel);
	}

	upgrade() {
		if(Structure.LEVELING_ENABLED || this.targetLevel < 1) {
			this.targetLevel += 1;
			this.updateUpgradeClock();
		}
	}

	downgrade() {
		if(this.targetLevel > 0) {
			this.targetLevel -= 1;
			this.updateUpgradeClock();
		}
	}

	destructor() {
		this.parent.removeChild(this);
		//TODO spawn water particles
	}

	tick() {
		if(this.getWater() >= this.getRequiredWater()) {
			this.water -= this.getRequiredWater();
			this.level = this.targetLevel;
			this.updateUpgradeClock();
			if(this.level <= 0) {
				this.destructor();
			}
		}
	}

	updateUpgradeClock() {
		if(!this.isActive()) {
			this.upgradeClock.visible = true;
			this.upgradeClock.gotoAndStop(Math.round((this.water / this.getRequiredWater())* this.upgradeClock.totalFrames))
		} else {
			this.upgradeClock.visible = false;
		}
	}

}

Structure.LEVELING_ENABLED = false;
