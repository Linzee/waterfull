import In from '../world/In';
import Out from '../world/Out';

export default class WorldGenerator {

  constructor(world) {
    this.world = world;

    this.spawnIn(new PIXI.Point(0, 0));

    for(var i=0; i<WorldGenerator.OUTS_COUNT; i++) {
      var point = this.world.terrain.randomPoint();
      var height = this.world.terrain.getHeight(point);
      if(height > 0.2) {
        this.spawnOut(point);
      }
    }
  }

  spawnIn(point) {
    this.spawnBuilding(new In(), point);
  }

  spawnOut(point) {
    this.spawnBuilding(new Out(), point);
  }

  spawnBuilding(building, point) {
    building.x = point.x;
    building.y = point.y;
		building.level = 1;
		building.interactive = true;
		this.world.buildings.addChild(building);
  }

}

WorldGenerator.OUTS_COUNT = 200;
