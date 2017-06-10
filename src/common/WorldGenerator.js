import In from '../world/In';

export default class WorldGenerator {

  generateWorld(world) {
    this.spawnIn(world, new PIXI.Point(0, 0));
  }

  spawnIn(world, point) {
    this.spawnBuilding(world, new In(), point);
  }

  spawnBuilding(world, building, point) {
    building.x = point.x;
    building.y = point.y;
		building.level = 1;
		building.interactive = true;
		world.buildings.addChild(building);
  }

}
