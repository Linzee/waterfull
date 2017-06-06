
export default class Structure extends PIXI.Container {

	constructor() {
		super();
		this.level = 1;
	}

	upgrade() {
		this.level += 1;
	}

	downgrade() {
		this.level -= 1;
		if(this.level <= 0) {
			this.destructor();
		}
	}

	destructor() {
		this.parent.removeChild(this);
		//TODO spawn water particles
	}

}
