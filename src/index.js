import App from './App';

var settings = {
	width: 960,
	height: 640,
	fullpage: true
}

if(settings.fullpage) {
	settings.width = window.innerWidth;
	settings.height = window.innerHeight;
}

window.app = new App(settings);
window.app.start();

setTimeout(() => {
	console.log("Destroy!");
	document.body.innerHTML = '';
}, 4 * 60 * 1000);
