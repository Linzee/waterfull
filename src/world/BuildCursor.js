import In from './In';
import Out from './Out';
import Point from './Point';
import Reservoir from './Reservoir';
import Pipe from './Pipe';
import Building from './Building';
import Structure from './Structure';
import {distance} from '../common/Utils';

export default class BuildCursor extends PIXI.Container {

	constructor(world, editBuildingGui, interactionManager, stagePlay) {
		super();

		this.world = world;
		this.editBuildingGui = editBuildingGui;
		this.interactionManager = interactionManager;
		this.stagePlay = stagePlay;

		this.building = null;
		this.buildingPipe = false;
		this.onChange = () => {};
		this.mouse_x = 0;
		this.mouse_y = 0;

		this.buildingPipeGraphics = new PIXI.Graphics();

		world.interactive = true;

		world.on("mousemove", (e) => {
			this.mouse_x = e.data.global.x / this.scale.x;
			this.mouse_y = e.data.global.y / this.scale.y;
			if(this.building !== null) {
				this.building.x = this.mouse_x;
				this.building.y = this.mouse_y;
			}
			if(this.buildingPipe !== false) {
				this.buildingPipeGraphics.clear();
				if(this.buildingPipe.from !== undefined) {
					let color = 0xffffff;
					console.log(distance(this.buildingPipe.from, {x: this.mouse_x * this.world.scale.x + this.world.x, y: this.mouse_y * this.world.scale.y + this.world.y}));
					if(distance(this.buildingPipe.from, {x: (this.mouse_x - this.world.x) * this.world.scale.x, y: (this.mouse_y - this.world.y) * this.world.scale.y}) > Pipe.MAX_PIPE_LENGTH) {
						color = 0xff0000;
					}
					this.buildingPipeGraphics.lineStyle(2, color).moveTo(this.buildingPipe.from.x + this.world.x /  this.world.scale.x, this.buildingPipe.from.y + this.world.y / this.world.scale.y).lineTo(this.mouse_x, this.mouse_y);
				}
			}
		});

		world.on("mousedown", (e) => {

			if(this.buildingPipe !== false) {
				//Place pipe

				let hit = this.interactionManager.hitTest(e.data.global, this.world);
				if(hit instanceof Building) {

					if(this.buildingPipe.from === undefined || this.buildingPipe.from === hit) {
						this.buildingPipe.from = hit;

					} else {

						//pipe already exists
						var canPlace = true;
						this.buildingPipe.from.pipes.forEach((p) => {
							var obs = p.getOther(this.buildingPipe.from);
							if(obs[0] === hit) {
								canPlace = false;
							}
						});

						//too far
						if(distance(this.buildingPipe.from, hit) > Pipe.MAX_PIPE_LENGTH) {
							canPlace = false;
						}

						if(canPlace) {
							this.buildingPipe.to = hit;
							world.pipes.addChild(new Pipe(this.buildingPipe.from, this.buildingPipe.to));
							this.buildingPipe = false;
							this.removeChild(this.buildingPipeGraphics);
							this.onChange(null);
						} else {

							editBuildingGui.setBuilding(null);
							this.buildingPipe = false;
							this.removeChild(this.buildingPipeGraphics);
							this.onChange(null);
						}
					}
				} else {

					editBuildingGui.setBuilding(null);
					this.buildingPipe = false;
					this.removeChild(this.buildingPipeGraphics);
					this.onChange(null);
				}

			} else if(this.building !== null) {
				//Place building

				this.removeChild(this.building);
				this.building.interactive = true;
				this.building.x = this.building.x - this.world.x / this.world.scale.x;
				this.building.y = this.building.y - this.world.y / this.world.scale.y;

				world.buildings.addChild(this.building);
				world.buildings.children.sort((a,b) => a.y-b.y);

				this.building = null;
				this.onChange(null);

			} else {

				let hit = this.interactionManager.hitTest(e.data.global, this.world);
				if(hit instanceof Structure) {
					editBuildingGui.setBuilding(hit);
				} else {
					editBuildingGui.setBuilding(null);
				}
			}
		});
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
				this.onChange('in');
				break;
			case 'out':
				this.building = new Out(this.stagePlay);
				this.addChild(this.building);
				this.onChange('out');
				break;
			case 'point':
				this.building = new Point();
				this.addChild(this.building);
				this.onChange('point');
				break;
			case 'pipe':
				this.buildingPipe = {
					from: undefined,
					to: undefined
				};
				this.buildingPipeGraphics.clear();
				this.addChild(this.buildingPipeGraphics);
				this.onChange('pipe');
				break;
			case 'reservoir':
				this.building = new Reservoir();
				this.addChild(this.building);
				this.onChange('reservoir');
				break;
			default:
				throw new Error("Illegal building type");
		}

		if(this.building !== null) {
			this.building.x = this.mouse_x;
			this.building.y = this.mouse_y;
		}
	}

}
