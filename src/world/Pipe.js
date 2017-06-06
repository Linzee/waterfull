import Structure from './Structure';
import Building from './Building';

export default class Pipe extends Structure {

	constructor(from, to) {
		super();

		if(!from instanceof Building || !to instanceof Building) {
      throw new Error("Wrong structure type, pipes can connect only buildings.");
    }

		this.from = from;
    from.pipes.push(this);
		this.to = to;
		to.pipes.push(this);

		this.tranportedWater = 0;

		var graphics = new PIXI.Graphics();

		graphics.lineStyle(2, 0x000000).moveTo(from.x, from.y).lineTo(to.x, to.y);

		this.addChild(graphics);
	}

	getOther(building) {
		if(this.from == building) {
			return this.to;
		}
		if(this.to == building) {
			return this.from;
		}
		throw new Error("Illegal building provided");
	}

	getCapacity() {
		return this.level;
	}

}
