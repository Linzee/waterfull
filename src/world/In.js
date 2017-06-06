import Building from './Building';

export default class In extends Building {

	constructor() {
		super(require("../images/in.png"))
	}

	waterOut() {
		return this.level;
	}

}
