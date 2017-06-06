import Building from './building';

export default class In extends Building {

	constructor() {
		super(require("../images/in.png"))
	}

	waterOut() {
		return this.level;
	}

}
