import Stages from './common/Stages';
import StagePlay from './stages/Play';
import StageTopScore from './stages/TopScore';

import TopScore from './common/TopScore';

export default class App {

	constructor(settings) {
		this.settings = settings;
		this.stages = new Stages();
		this.topScore = new TopScore();

		this.stages.addStage("play", new StagePlay(this.stages, settings));
		this.stages.addStage("topScore", new StageTopScore(this.stages, this.topScore, settings));
		this.stages.changeStage("play");
	}

	start() {
		var setup = () => {
			this.renderer = PIXI.autoDetectRenderer(this.settings.width, this.settings.height, {antialias: true});
			document.body.appendChild(this.renderer.view);

			this.gameLoop = () => {
				this.stages.beforeRender();
				this.renderer.render(this.stages.current);
				requestAnimationFrame(this.gameLoop);
			}

			this.gameLoop();
		}

		PIXI.loader
		//.add("images/anyImage.png")
		.load(setup);
	}
}
