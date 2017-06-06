import Building from './building';

export default class Out extends Building {

  constructor() {
    super(require("../images/out.png"))
  }

  waterIn() {
		return this.level;
	}

}
