import KeyListener from '../common/KeyListener';

export default class StagePlay extends PIXI.Container {

	constructor(stages, settings) {
		super();

		this.stages = stages;
		this.settings = settings;
	}

	load() {
		this.background = new PIXI.Graphics();
		this.background.beginFill(StagePlay.BACKGROUND_COLOR);
		this.background.drawRect(0, 0, this.settings.width, this.settings.height);

		this.world = new PIXI.Container();

		this.buildCursor = new BuildCursor(this.world);

		/*
		this.cartsText = new PIXI.Text("0", new PIXI.TextStyle({fontSize: 40, fill: '#9FBC12'}));
		this.cartsText.x = 16;
		this.cartsText.y = 16;
		*/

		this.addChild(this.background);
		this.addChild(this.buildCursor);
		this.addChild(this.world);

		this.keyUp = new KeyListener(38);
		this.keyDown = new KeyListener(40);
		this.keyLeft = new KeyListener(37);
		this.keyRight = new KeyListener(39);
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
		this.removeChild(this.background);
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

		this.background = undefined;
		this.world = undefined;
		this.buildCursor = undefined;
	}
}

StagePlay.BACKGROUND_COLOR = 0xFFFFFF;
