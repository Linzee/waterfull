import KeyListener from '../common/KeyListener';

import BuildCursor from '../world/BuildCursor';
import Reservoir from '../world/Reservoir';
import Pipe from '../world/Pipe';
import WaterNetworkSimulator from '../common/WaterNetworkSimulator';

export default class StagePlay extends PIXI.Container {

	constructor(stages, settings, interactionManager) {
		super();

		this.stages = stages;
		this.settings = settings;
		this.interactionManager = interactionManager;
	}

	load() {

		this.world = new PIXI.Container();
		this.waterNetworkSimulator = new WaterNetworkSimulator(this.world);

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
		this.keySpace = new KeyListener(32, () => {
			for(var x=0; x<5; x++) {
				for(var y=0; y<5; y++) {
					var w = new Reservoir();
					w.x = 20 + 60*x;
					w.y = 20 + 60*y;
					this.world.addChild(w);
				}
			}
			var ws = this.world.children.slice(0);
			ws.forEach((w1) => {
				ws.forEach((w2) => {
					if(w1 instanceof Reservoir && w2 instanceof Reservoir) {
						this.world.addChild(new Pipe(w1, w2));
					}
				});
			});
		});
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
