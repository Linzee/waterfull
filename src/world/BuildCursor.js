import In from './In';
import Out from './Out';
import Point from './Point';
import Reservoir from './Reservoir';
import Pipe from './Pipe';
import Building from './Building';

export default class BuildCursor extends PIXI.Container {

	constructor(world, interactionManager) {
		super();

		this.world = world;
		this.interactionManager = interactionManager;

		this.building = null;
		this.buildingPipe = false;

		world.interactive = true;

		world.mousemove = (e) => {
			if(this.building !== null) {
				if(this.buildingPipe === false) {
					this.building.x = e.data.global.x;
					this.building.y = e.data.global.y;
				}
			}
		}

		world.click = (e) => {

			if(this.buildingPipe !== false) {
				//Place pipe

				var hit = this.interactionManager.hitTest(e.data.global, this.world);
				if(hit instanceof Building) {
					if(this.buildingPipe.from === undefined || this.buildingPipe.from === hit) {
						this.buildingPipe.from = hit;

					} else {

						//pipe already exists
						var pipeAlreadyThere = false;
						this.buildingPipe.from.pipes.forEach((p) => {
							var ob, d;
							[ob, d] = p.getOther(this.buildingPipe.from);
							if(ob == hit) {
								pipeAlreadyThere = true;
							}
						});

						if(!pipeAlreadyThere) {
							this.buildingPipe.to = hit;
							world.pipes.addChild(new Pipe(this.buildingPipe.from, this.buildingPipe.to));
							this.buildingPipe = false;
						}
					}
				} else {
					this.buildingPipe = false;
				}

			} else if(this.building !== null) {
				//Place building

				this.removeChild(this.building);
				world.buildings.addChild(this.building);
				this.building.interactive = true;
				this.building = null;
			}
		}
	}

	newBuilding(type) {
		this.buildingPipe = false;
		if(this.building !== null) {
			this.removeChild(this.building);
		}
		this.building = null;

		switch(type) {
			case 'in':
				this.building = new In();
				this.addChild(this.building);
				break;
			case 'out':
				this.building = new Out();
				this.addChild(this.building);
				break;
			case 'point':
				this.building = new Point();
				this.addChild(this.building);
				break;
			case 'reservoir':
				this.building = new Reservoir();
				this.addChild(this.building);
				break;
			case 'pipe':
			console.log("building pipe");
				this.buildingPipe = {
					from: undefined,
					to: undefined
				};
				break;
			default:
				throw new Error("Illegal building type");
		}
	}

}
