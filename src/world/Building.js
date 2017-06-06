import Structure from './Structure';

export default class Building extends Structure {

	constructor(image) {
		super();
		this.pipes = [];

		let sprite = new PIXI.Sprite.fromImage(image);
		sprite.anchor.x = 0.5;
		sprite.anchor.y = 0.5;
		this.addChild(sprite);
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
