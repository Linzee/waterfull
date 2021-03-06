import Stages from './common/Stages';
import TopScore from './common/TopScore';
import WorldGenerator from './common/WorldGenerator';

import StagePlay from './stages/StagePlay';
import StageTopScore from './stages/StageTopScore';

export default class App {

	constructor(settings) {
		this.settings = settings;
		this.stages = new Stages();
		this.topScore = new TopScore();
		this.worldGenerator = new WorldGenerator();
	}

	start() {
		var setup = () => {
			this.renderer = PIXI.autoDetectRenderer(this.settings.width, this.settings.height, {antialias: true});
			document.body.appendChild(this.renderer.view);

			this.stages.addStage("play", new StagePlay(this.stages, this.settings, this.renderer.plugins.interaction, this.worldGenerator));
			this.stages.addStage("topScore", new StageTopScore(this.stages, this.topScore, this.settings));
			this.stages.changeStage("play");

			this.gameLoop = () => {
				this.stages.beforeRender();
				this.renderer.render(this.stages.current);
				requestAnimationFrame(this.gameLoop);
			}

			this.gameLoop();
		}

		PIXI.loader
		.add(require("./images/background.png"))
		.add(require("./images/gui_in.png"))
		.add(require("./images/in_0.png"))
		.add(require("./images/gui_out.png"))
		.add(require("./images/out_0.png"))
		.add(require("./images/out_1.png"))
		.add(require("./images/out_2.png"))
		.add(require('./images/gui_point.png'))
		.add(require('./images/point_0.png'))
		.add(require("./images/gui_reservoir.png"))
		.add(require("./images/reservoir_0.png"))
		.add(require("./images/reservoir_1.png"))
		.add(require("./images/reservoir_2.png"))
		.add(require("./images/reservoir_3.png"))
		.add(require('./images/time_0.png'))
		.add(require('./images/time_1.png'))
		.add(require('./images/time_2.png'))
		.add(require('./images/time_3.png'))
		.add(require('./images/time_4.png'))
		.load(setup);
	}
}
