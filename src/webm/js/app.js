global.jQuery = global.$ = require('jquery');
global._ = require('underscore');

require('./plugin/jquery.transform2d.umd.js');
require('./plugin/jquery.transform3d.umd.js');
require('jquery.easing');

var Html2Canvas = require('html2canvas');
var Whammy = require('./util/Whammy.js');

var _video = null;
var _rectangle = {
	width: 360,
	height: 600
}

$(function(){
	$('input#input-text').bind({
		'change': function(event){
			$('div.box').text(event.currentTarget.value);
		}
	});

	$('span').bind({
		'click': function(event){
			render();
		}
	});
});

function render(){
	_video = new Whammy.Video(36);

	$('div.box')
		.css({
			'transform': 'translate(0px, 0px) rotate(0deg) skewX(0deg)'
		})
		.animate({
			'transform': 'translateX(260px, 500px) rotate(30deg) skewX(180deg)'
		},
		{
			duration: 1500,
			easing: 'easeOutElastic',
			step: function(){
				console.log('render');
				renderVideo();
			},
			complete: function(){
				console.log('complete');
				renderVideo(completeVideo);
			}
		});
}

function renderVideo(callback){
	Html2Canvas($('div#container-animation'), {
		onrendered: function(canvas){
			_video.add(canvas.getContext('2d'));

			callback && callback();
		},
		width: _rectangle.width,
		height: _rectangle.height
	});
};

function completeVideo(){
	var url = window.URL.createObjectURL(_video.compile());

	$('video').attr('src', url);
};