import KeyListener from '../common/KeyListener';

export default class BuildingsBar extends PIXI.Container {

	constructor(buildCursor) {
		super();

    this.buildCursor = buildCursor;

    this.buildings = [['in', require('../images/in.png')], ['out', require('../images/out.png')], ['point', require('../images/point.png')], ['pipe', require('../images/pipe.png')], ['reservoir', require('../images/reservoir.png')]].map((typeData, index) => {
      var type, image;
      [type, image] = typeData;

      var sprite = new PIXI.Sprite.fromImage(image);
      sprite.x = 60 * index;

      return {
        type: type,
        keyListener: new KeyListener(49 + index, this.newBuilding.bind(this, index)),
        sprite: sprite
      }
    });

    this.buildings.forEach((b) => this.addChild(b.sprite));
  }

  newBuilding(index) {
    this.buildCursor.newBuilding(this.buildings[index].type);
		this.buildings[index].sprite.alpha = 0.5;
  }

  destructor() {
    this.buildings.forEach((b) => b.keyListener.close());
    this.buildings = undefined;
  }
}
