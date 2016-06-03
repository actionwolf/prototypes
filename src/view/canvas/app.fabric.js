var $ = require('jquery');
var _ = require('underscore');
var fabric = require('fabric').fabric;
var Whammy = require('../../util/Whammy.js');

$(function(){
	console.log(fabric);
	var isEnded = false;
	var canvas = new fabric.Canvas('top');
	var video_embed = $('video#origin').bind({
		'loadeddata': function(event){
			console.log(event);

			var oe = event.originalEvent.srcElement;
			var width = oe.videoWidth;
			var height = oe.videoHeight;

			width = (height / width ) * width;
			height = 600;

			console.log(oe, width, height);

			$(this).attr({
				'width': width,
				'height': height
			});

			//video_canvas.set({ width: width * .5, height: height * .5 });
			build();
		},

		'ended': function(event){
			isEnded = true;
		}
	});

	function build(){
		var video_render = new Whammy.Video(36, 1);

		var video_canvas = new fabric.Image(video_embed[0], {
			left: 0,
			top: 0,
			originX: 'left',
			originY: 'top'
		});

		canvas.add(video_canvas);

		canvas.add(new fabric.Text('Today Snap Video', {
			left: 10,
			top: 10,
			fontWeight: 'bold',
			fontSize: 30,
			fontFamily: 'sans-serif',
			fill: '#0aa'
		}));

		canvas.add(new fabric.Text('https://www.pikicast.com', {
			left: 10,
			top: 50,
			fontWeight: 'normal',
			fontSize: 12,
			fontFamily: 'sans-serif',
			fill: '#0aa'
		}));

		video_canvas.getElement().play();

		fabric.util.requestAnimFrame(function render(){
			canvas.renderAll();

			video_render.add($('canvas#top')[0].getContext('2d'));

			if(!isEnded){
				fabric.util.requestAnimFrame(render);
			}else{
				$('video#output').attr('src', window.URL.createObjectURL(video_render.compile()));
			}

		});
	}
});