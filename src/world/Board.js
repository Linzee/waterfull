export default class Terrain extends PIXI.Container {

	constructor() {
		super();

		this.graphics = new PIXI.Graphics();
		this.drawTerrain(new PIXI.Point(-2000, -2000), new PIXI.Point(2000, 2000));
    this.addChild(this.graphics);
	}

  drawTerrain(from, to) {
		this.terrainSize = {from: from, to: to};
		this.graphics.beginFill(0x111111);
    this.graphics.drawRect(from.x, from.y, to.x - from.x, to.y - from.y);
  }

	randomPoint() {
    var x = this.terrainSize.from.x + Math.random() * (this.terrainSize.to.x - this.terrainSize.from.x);
    var y = this.terrainSize.from.y + Math.random() * (this.terrainSize.to.y - this.terrainSize.from.y);
    return new PIXI.Point(x, y);
  }
}

Terrain.WATER_HEIGHT = 0.1;
