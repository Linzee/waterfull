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

  getHeight(x, y) {
    return this.noise.noise2D(x / 100, y / 100) / 2 + 0.5;
  }

  drawTerrain(from, to) {
    for(var x=from.x; x<to.x; x++) {
      for(var y=from.y; y<to.y; y++) {
        var height = this.getHeight(x, y);
				var color;

				if(height > 0.1) {
					color = chroma(Terrain.COLOR[0] * height, Terrain.COLOR[1] * height, Terrain.COLOR[2] * height).num();
				} else {
					color = chroma("blue").num();
				}

        this.graphics.beginFill(color);
        this.graphics.drawRect(Terrain.SIZE * x, Terrain.SIZE * y, Terrain.SIZE, Terrain.SIZE);
      }
    }
  }
}

Terrain.COLOR = [204, 51, 255];
Terrain.SIZE = 10;
