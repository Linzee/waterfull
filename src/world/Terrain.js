import chroma from 'chroma-js';
import SimplexNoise from 'simplex-noise';

export default class Terrain extends PIXI.Container {

	constructor() {
		super();
		this.noise = new SimplexNoise(Math.random);

		this.graphics = new PIXI.Graphics();
		this.drawTerrain(new PIXI.Point(-200, -200), new PIXI.Point(200, 200));
    this.addChild(this.graphics);
	}

	getHeight(point) {
    return this.getHeight(point.x, point.y);
  }

	getHeight(x, y) {
		var d = Math.sqrt(x*x+y*y);
    var h = this.noise.noise2D(x / 100, y / 100) / 2 + 0.5;
		if(d < 20) {
			return Math.max(0, h - 1 + d/20);
		} else {
			return h;
		}
  }

  drawTerrain(from, to) {
		this.terrainSize = {from: from, to: to};

    for(var x=from.x; x<to.x; x++) {
      for(var y=from.y; y<to.y; y++) {
        var height = this.getHeight(x, y);
				var color;

				if(height > Terrain.WATER_HEIGHT) {
					color = chroma(Terrain.COLOR[0] * height, Terrain.COLOR[1] * height, Terrain.COLOR[2] * height).num();
				} else {
					color = chroma("blue").num();
				}

        this.graphics.beginFill(color);
        this.graphics.drawRect(Terrain.SIZE * x, Terrain.SIZE * y, Terrain.SIZE, Terrain.SIZE);
      }
    }
  }

	randomPoint() {
    var x = this.terrainSize.from.x * Terrain.SIZE + Math.random() * (this.terrainSize.to.x - this.terrainSize.from.x) * Terrain.SIZE;
    var y = this.terrainSize.from.y * Terrain.SIZE + Math.random() * (this.terrainSize.to.y - this.terrainSize.from.y) * Terrain.SIZE;
    return new PIXI.Point(x, y);
  }
}

Terrain.COLOR = [204, 51, 255];
Terrain.SIZE = 10;
Terrain.WATER_HEIGHT = 0.1;
