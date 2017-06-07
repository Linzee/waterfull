import BuildCursor from '../world/BuildCursor';
import WaterNetworkSimulator from '../common/WaterNetworkSimulator';
import BuildingsBar from '../world/BuildingsBar';
import EditBuildingGui from '../world/EditBuildingGui';
import Terrain from '../world/Terrain';
import WorldGenerator from '../common/WorldGenerator';

export default class StagePlay extends PIXI.Container {

	constructor(stages, settings, interactionManager) {
		super();

		this.stages = stages;
		this.settings = settings;
		this.interactionManager = interactionManager;

		this.time = 0;
	}

	load() {

		this.world = new PIXI.Container();
		this.world.x = this.settings.width / 2;
		this.world.y = this.settings.height / 2;

		let terrain = new Terrain();
		this.world.terrain = terrain;
		this.world.addChild(terrain);

		let buildings = new PIXI.Container();
		this.world.buildings = buildings;
		this.world.addChild(buildings);

		let pipes = new PIXI.Container();
		this.world.pipes = pipes;
		this.world.addChild(pipes);

		this.waterNetworkSimulator = new WaterNetworkSimulator(this.world);

		this.editBuildingGui = new EditBuildingGui();

		this.buildCursor = new BuildCursor(this.world, this.editBuildingGui, this.interactionManager);

		this.buildingsBar = new BuildingsBar(this.buildCursor);
		this.buildingsBar.x = this.settings.width / 2 - (60*5)/2;
		this.buildingsBar.y = this.settings.height - 60;

		/*
		this.cartsText = new PIXI.Text("0", new PIXI.TextStyle({fontSize: 40, fill: '#9FBC12'}));
		this.cartsText.x = 16;
		this.cartsText.y = 16;
		*/

		this.addChild(this.world);
		this.addChild(this.buildCursor);
		this.addChild(this.editBuildingGui);
		this.addChild(this.buildingsBar);

		var worldGenerator = new WorldGenerator(this.world);
	}

	tick() {
		this.waterNetworkSimulator.tick();


		let zoom = 1 + (this.time * 0.00004);
		this.world.scale.x = 1 / zoom;
		this.world.scale.y = 1 / zoom;

		this.buildCursor.scale.x = 1 / zoom;
		this.buildCursor.scale.y = 1 / zoom;

		this.time += 1;
	}

	restart() {
		this.unload();
		this.load();
	}

	unload() {
		this.removeChild(this.world);
		this.removeChild(this.buildCursor);
		this.removeChild(this.buildingsBar);

		this.buildingsBar.destructor();

		this.world = undefined;
		this.waterNetworkSimulator = undefined;
		this.buildCursor = undefined;
		this.editBuildingGui = undefined;
		this.buildingsBar = undefined;
	}
}
