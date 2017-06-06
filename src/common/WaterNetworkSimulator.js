import Building from '../world/Building';
import Pipe from '../world/Pipe';
import {shuffle} from './Utils';

export default class WaterNetworkSimulator {
  constructor(world) {
    this.world = world;
  }

  tick() {

    // Reset pipes
    this.world.children.forEach((structure) => {
      if(structure instanceof Pipe) {
        var pipe = structure;
        pipe.waterSpeed = 0;
      }
    });

    // Simulate water
    this.world.children.forEach((structure) => {
      if(structure instanceof Building) {
        var building = structure;

        building.tick();

        if(building.getWater() == 0) {
          return;
        }

        building.pipes.forEach((pipe) => {
          var otherBuilding, pipeDirection;
          [otherBuilding, pipeDirection] = pipe.getOther(building);

          if(otherBuilding.getWater() < otherBuilding.getCapacity()) {
            var ma = Math.min(building.getWater(), pipe.getCapacity() - Math.abs(pipe.waterSpeed));
            otherBuilding.addWater(ma);
            pipe.waterSpeed += pipeDirection * ma;
            building.lowerWater(ma);
          }
        });

        shuffle(building.pipes); //TODO
        console.log(building.getWater());
        building.alpha = building.getWater() / building.getCapacity();
      }
    });

    //Redraw pipes
    this.world.children.forEach((structure) => {
      if(structure instanceof Pipe) {
        var pipe = structure;
        pipe.redraw();
      }
    });
  }
}
