import Stages from './common/Stages';
import StagePlay from './stages/StagePlay';
import StageTopScore from './stages/StageTopScore';

import TopScore from './common/TopScore';

export default class App {

	constructor(settings) {
		this.settings = settings;
		this.stages = new Stages();
		this.topScore = new TopScore();
	}

	start() {
		var setup = () => {
			this.renderer = PIXI.autoDetectRenderer(this.settings.width, this.settings.height, {antialias: true});
			document.body.appendChild(this.renderer.view);

			this.stages.addStage("play", new StagePlay(this.stages, this.settings, this.renderer.plugins.interaction));
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
		.add(require("./images/in.png"))
		.add(require("./images/out.png"))
		.add(require("./images/reservoir.png"))
		.load(setup);
	}
}
