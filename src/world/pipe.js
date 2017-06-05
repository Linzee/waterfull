import Structure from './structure';
import Building from './building';

export default class Pipe extends Structure {

	constructor(from, to) {
		super();
    if(!from instanceof Building || !to instanceof Building) {
      throw new Error("Wrong structure type, pipes can connect only buildings.");
    }
    from.pipes.push(this);
    to.pipes.push(this);
	}

}
