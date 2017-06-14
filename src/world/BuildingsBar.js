import KeyListener from '../common/KeyListener';

export default class BuildingsBar extends PIXI.Container {

	constructor(buildCursor) {
		super();

    this.buildCursor = buildCursor;

    this.buildings = [['in', require('../images/gui_in.png')], ['out', require('../images/gui_out.png')], ['point', require('../images/gui_point.png')], ['pipe', require('../images/gui_pipe.png')], ['reservoir', require('../images/gui_reservoir.png')]].map((typeData, index) => {
      var type, image;
      [type, image] = typeData;

      var sprite = new PIXI.Sprite.fromImage(image);
      sprite.x = 60 * index;
			sprite.interactive = true;
			sprite.click = this.newBuilding.bind(this, index);

			var spriteText = new PIXI.Text(""+(index+1), new PIXI.TextStyle({fontSize: 15, fill: 0x000000}));
			spriteText.x = 1;
			spriteText.y = 1;
			sprite.addChild(spriteText);

      return {
        type: type,
        keyListener: new KeyListener(49 + index, this.newBuilding.bind(this, index)),
        sprite: sprite
      }
    });

    this.buildings.forEach((b) => this.addChild(b.sprite));

		this.buildCursor.onChange = (type) => {
			this.buildings.forEach(building => {
				if(building.type === type) {
					building.sprite.alpha = 0.5;
				} else {
					building.sprite.alpha = 1.0;
				}
			})
		};
  }

  newBuilding(index) {
    this.buildCursor.newBuilding(this.buildings[index].type);

  }

  destructor() {
    this.buildings.forEach((b) => b.keyListener.close());
    this.buildings = undefined;
  }
}
