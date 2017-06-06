import KeyListener from '../common/KeyListener';

import BuildCursor from '../world/BuildCursor';

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

		this.world.addChild(background);

		this.buildCursor = new BuildCursor(this.world, this.interactionManager);

		/*
		this.cartsText = new PIXI.Text("0", new PIXI.TextStyle({fontSize: 40, fill: '#9FBC12'}));
		this.cartsText.x = 16;
		this.cartsText.y = 16;
		*/

		this.addChild(this.world);
		this.addChild(this.buildCursor);

		this.keyUp = new KeyListener(38, () => this.buildCursor.newBuilding('in'));
		this.keyDown = new KeyListener(40, () => this.buildCursor.newBuilding('out'));
		this.keyLeft = new KeyListener(37, () => this.buildCursor.newBuilding('reservoir'));
		this.keyRight = new KeyListener(39, () => this.buildCursor.newBuilding('pipe'));
		this.keySpace = new KeyListener(32);
	}

	tick() {
		//TODO calculate transformed water
	}

	restart() {
		this.unload();
		this.load();
	}

	unload() {
		this.removeChild(this.world);
		this.removeChild(this.buildCursor);

		this.keyUp.close();
		this.keyDown.close();
		this.keyLeft.close();
		this.keyRight.close();
		this.keySpace.close();

		this.keyUp = undefined;
		this.keyDown = undefined;
		this.keyLeft = undefined;
		this.keyRight = undefined;
		this.keySpace = undefined;

		this.world = undefined;
		this.buildCursor = undefined;
	}
}

StagePlay.BACKGROUND_COLOR = 0xFFFFFF;
