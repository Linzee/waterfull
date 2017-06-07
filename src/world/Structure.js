
export default class Structure extends PIXI.Container {

	constructor() {
		super();
		this.level = 0;
		this.targetLevel = 1;
		this.water = 0;
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

	isActive() {
		return this.level === this.targetLevel;
	}

	getRequiredWater() {
		return 300 * Math.abs(this.level - this.targetLevel);
	}

	upgrade() {
		this.targetLevel += 1;
	}

	downgrade() {
		this.targetLevel -= 1;
	}

	destructor() {
		this.parent.removeChild(this);
		//TODO spawn water particles
	}

	tick() {
		if(this.getWater() >= this.getRequiredWater()) {
			this.water -= this.getRequiredWater();
			this.level = this.targetLevel;
			if(this.level <= 0) {
				this.destructor();
			}
		}
	}

}
