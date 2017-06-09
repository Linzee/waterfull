import In from '../world/In';
import Out from '../world/Out';

export default class WorldGenerator {

  generateWorld(world) {
    this.spawnIn(world, new PIXI.Point(0, 0));

    for(var i=0; i<WorldGenerator.OUTS_COUNT; i++) {
      var point = this.world.terrain.randomPoint();
      var height = this.world.terrain.getHeight(point);
      if(height > 0.2) {
        this.spawnOut(world, point);
      }
    }
  }

  spawnIn(world, point) {
    this.spawnBuilding(world, new In(), point);
  }

  spawnOut(world, point) {
    this.spawnBuilding(world, new Out(), point);
  }

  spawnBuilding(world, building, point) {
    building.x = point.x;
    building.y = point.y;
		building.level = 1;
		building.interactive = true;
		world.buildings.addChild(building);
  }

}

WorldGenerator.OUTS_COUNT = 0;
