import {shuffle} from './Utils';

export default class WaterNetworkSimulator {
  constructor(world) {
    this.world = world;
  }

  tick() {

    // Reset pipes
    this.world.pipes.children.forEach((pipe) => {
      pipe.waterSpeed = 0;
    });

    // Simulate water
    this.world.buildings.children.forEach((building) => {
      building.tick();

      if(building.getWater() === 0) {
        return;
      }

      if(building.isActive()) {

        building.pipes.forEach((pipe) => {

          if(pipe.isActive()) {

            var otherBuilding, pipeDirection;
            [otherBuilding, pipeDirection] = pipe.getOther(building);

            if(otherBuilding.isActive()) {
              if(otherBuilding.getWater() < otherBuilding.getCapacity()) {
                let ma = Math.min(otherBuilding.getCapacity() - otherBuilding.getWater(), Math.min(building.getWater(), pipe.getCapacity() - Math.abs(pipe.waterSpeed)));
                otherBuilding.addWater(ma);
                pipe.waterSpeed += pipeDirection * ma;
                building.lowerWater(ma);
              }
            } else {
              let ma = Math.min(otherBuilding.getRequiredWater() - otherBuilding.getWater(), Math.min(building.getWater(), pipe.getCapacity() - Math.abs(pipe.waterSpeed)));
              otherBuilding.addWater(ma);
              pipe.waterSpeed += pipeDirection * ma;
              building.lowerWater(ma);
            }

          } else {
            let ma = Math.min(building.getWater(), pipe.getRequiredWater() - pipe.getWater());
            pipe.addWater(ma);
            building.lowerWater(ma);
          }
        });

        shuffle(building.pipes);
      }
    });

    //Redraw pipes
    this.world.pipes.children.forEach((pipe) => {
      pipe.tick();
      pipe.redraw();
    });

    shuffle(this.world.buildings);
  }
}
