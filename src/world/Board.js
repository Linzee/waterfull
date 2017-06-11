export default class Terrain extends PIXI.Container {

	constructor() {
		super();

		this.cacheAsBitmap = true;

		this.graphics = new PIXI.Graphics();
		this.graphics.cacheAsBitmap = true;
		this.addChild(this.graphics);
		this.drawTerrain(new PIXI.Point(-2000, -2000), new PIXI.Point(2000, 2000));
	}

  drawTerrain(from, to) {
		this.terrainSize = {from: from, to: to, size: {x: to.x-from.x, y: to.y-from.y}};
		this.graphics.beginFill(0x111111);
    this.graphics.drawRect(from.x, from.y, to.x - from.x, to.y - from.y);

		let backgroundImage = new PIXI.Sprite.fromImage(require('../images/background.png'));
		var xs = Math.ceil(this.terrainSize.size.x / backgroundImage.width);
		var ys = Math.ceil(this.terrainSize.size.y / backgroundImage.height);
		for(var x=0; x<xs; x++) {
			for(var y=0; y<ys; y++) {
				let s1 = PIXI.Sprite.fromImage(require('../images/background.png'));
				s1.x = this.terrainSize.from.x + x * backgroundImage.width;
				s1.y = this.terrainSize.from.y + y * backgroundImage.height;
				s1.anchor.x = 0.5;
				s1.anchor.y = 0.5;
				if(Math.random() < 0.2) {
					s1.scale.x = -1;
				}
				this.addChild(s1);
				let s2 = PIXI.Sprite.fromImage(require('../images/background.png'));
				s2.x = this.terrainSize.from.x + x * backgroundImage.width + backgroundImage.width/2;
				s2.y = this.terrainSize.from.y + y * backgroundImage.height + backgroundImage.height/2;
				s2.anchor.x = 0.5;
				s2.anchor.y = 0.5;
				if(Math.random() < 0.2) {
					s2.scale.x = -1;
				}
				this.addChild(s2);
			}
		}
  }

	randomPoint() {
    var x = this.terrainSize.from.x + Math.random() * (this.terrainSize.to.x - this.terrainSize.from.x);
    var y = this.terrainSize.from.y + Math.random() * (this.terrainSize.to.y - this.terrainSize.from.y);
    return new PIXI.Point(x, y);
  }
}

Terrain.WATER_HEIGHT = 0.1;
