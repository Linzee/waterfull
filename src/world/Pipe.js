import Structure from './Structure';
import Building from './Building';

export default class Pipe extends Structure {

	constructor(from, to) {
		super();
    if(!from instanceof Building || !to instanceof Building) {
      throw new Error("Wrong structure type, pipes can connect only buildings.");
    }
    from.pipes.push(this);
    to.pipes.push(this);

		var graphics = new PIXI.Graphics();

		graphics.lineStyle(2, 0x000000).moveTo(from.x, from.y).lineTo(to.x, to.y);

		this.addChild(graphics)
	}

}
