import Terrain from '../world/Terrain';
import In from '../world/In';

export default class WorldGenerator {

  constructor(world) {
    this.world = world;

    this.spawnIn(new PIXI.Point(0, 0));
    
    // var point = this.world.terrain.randomPoint();
    // var height = this.world.terrain.getHeight(point);
  }

  spawnIn(point) {
    var buildingIn = new In();
    buildingIn.x = point.x;
    buildingIn.y = point.y;
		buildingIn.level = 1;
		buildingIn.interactive = true;
		this.world.buildings.addChild(buildingIn);
  }

}
