import BuildCursor from '../world/BuildCursor';
import WaterNetworkSimulator from '../common/WaterNetworkSimulator';
import BuildingsBar from '../world/BuildingsBar';
import EditBuildingGui from '../world/EditBuildingGui';
import Terrain from '../world/Terrain';
import WorldGenerator from '../common/WorldGenerator';

export default class StagePlay extends PIXI.Container {

	constructor(stages, settings, interactionManager, worldGenerator) {
		super();

		this.stages = stages;
		this.settings = settings;
		this.interactionManager = interactionManager;
		this.worldGenerator = worldGenerator;

		this.time = 0;
		this.waterDelivered = 0;
	}

	load() {

		this.world = new PIXI.Container();
		this.world.x = this.settings.width / 2;
		this.world.y = this.settings.height / 2;

		let terrain = new Terrain();
		this.world.terrain = terrain;
		this.world.addChild(terrain);

		let pipes = new PIXI.Container();
		this.world.pipes = pipes;
		this.world.addChild(pipes);

		let buildings = new PIXI.Container();
		this.world.buildings = buildings;
		this.world.addChild(buildings);

		this.waterNetworkSimulator = new WaterNetworkSimulator(this.world);

		this.editBuildingGui = new EditBuildingGui(this.world);

		this.buildCursor = new BuildCursor(this.world, this.editBuildingGui, this.interactionManager, this);

		this.buildingsBar = new BuildingsBar(this.buildCursor);
		this.buildingsBar.x = this.settings.width / 2 - (60*5)/2;
		this.buildingsBar.y = this.settings.height - 60;

		this.waterDelivered = 0;

		this.waterDeliveredText = new PIXI.Text("0", new PIXI.TextStyle({fontSize: 40, fill: '#000000'}));
		this.waterDeliveredText.x = 16;
		this.waterDeliveredText.y = 16;

		this.addChild(this.world);
		this.addChild(this.buildCursor);
		this.addChild(this.editBuildingGui);
		this.addChild(this.buildingsBar);
		this.addChild(this.waterDeliveredText);

		this.worldGenerator.generateWorld(this.world);
	}

	tick() {
		this.waterNetworkSimulator.tick();


		let zoom = 1 + (this.time * StagePlay.ZOOM_OUT_SPEED);
		this.world.scale.x = 1 / zoom;
		this.world.scale.y = 1 / zoom;

		this.buildCursor.scale.x = 1 / zoom;
		this.buildCursor.scale.y = 1 / zoom;

		this.time += 1;

		this.waterDeliveredText.text = ""+this.waterDelivered;
	}

	restart() {
		this.unload();
		this.load();
	}

	unload() {
		this.removeChild(this.world);
		this.removeChild(this.buildCursor);
		this.removeChild(this.editBuildingGui);
		this.removeChild(this.buildingsBar);
		this.removeChild(this.waterDeliveredText);

		this.buildingsBar.destructor();

		this.waterNetworkSimulator = undefined;
		this.world = undefined;
		this.buildCursor = undefined;
		this.editBuildingGui = undefined;
		this.buildingsBar = undefined;
		this.waterDeliveredText = undefined;
	}
}

StagePlay.ZOOM_OUT_SPEED = 0.0001;
