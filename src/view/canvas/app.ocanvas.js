var $ = require('jquery');
var _ = require('underscore');
var oCanvas = require('ocanvas');

$(function(){
	var canvas = oCanvas.create({
		canvas: 'canvas',
		background: '#0cc'
	});

	var rectangle0 = canvas.display.rectangle({
		x: 10,
		y: 10,
		width: 100,
		height: 100,
		fill: '#333'
	});

	var rectangle1 = rectangle0.clone({
		x: 120
	});

	var rectangle2 = rectangle0.clone({
		x: 230
	});

	canvas.addChild(rectangle0);
	canvas.addChild(rectangle1);
	canvas.addChild(rectangle2);

	rectangle0.bind('click', function(event){
		console.log(event);
		canvas.clear();
	});

	rectangle1.bind('click', function(event){
		console.log(event);
		canvas.destroy();
	});

	rectangle2.fill = 'image(/image/500_24086387_1463743577.gif)';
	rectangle2.bind('click', function(event){canvas.redraw();});

	var image = canvas.display.image({
		x: 250,
		y: 150,
		origin: { x: 'center', y: 'center' },
		image: '/image/500_24086387_1463743577.gif'
	});

	canvas.addChild(image);
});