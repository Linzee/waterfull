import App from './App';

var settings = {
	width: 960,
	height: 640
}

window.app = new App(settings);
window.app.start();

setTimeout(() => {
	console.log("Destroy!");
	document.body.innerHTML = '';
}, 4 * 60 * 1000);
