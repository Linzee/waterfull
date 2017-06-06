import BuildCursor from '../world/BuildCursor';
import WaterNetworkSimulator from '../common/WaterNetworkSimulator';
import BuildingsBar from '../world/BuildingsBar';
import EditBuildingGui from '../world/EditBuildingGui';

export default class StagePlay extends PIXI.Container {

	constructor(stages, settings, interactionManager) {
		super();

		this.stages = stages;
		this.settings = settings;
		this.interactionManager = interactionManager;
	}

	load() {

		this.world = new PIXI.Container();

		let background = new PIXI.Graphics();
		background.beginFill(StagePlay.BACKGROUND_COLOR);
		background.drawRect(0, 0, this.settings.width, this.settings.height);
		this.world.background = background;
		this.world.addChild(background);

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

		/*
		this.cartsText = new PIXI.Text("0", new PIXI.TextStyle({fontSize: 40, fill: '#9FBC12'}));
		this.cartsText.x = 16;
		this.cartsText.y = 16;
		*/

		this.addChild(this.world);
		this.addChild(this.buildCursor);
		this.addChild(this.editBuildingGui);
		this.addChild(this.buildingsBar);
	}

	tick() {
		this.waterNetworkSimulator.tick();
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

StagePlay.BACKGROUND_COLOR = 0xFFFFFF;
