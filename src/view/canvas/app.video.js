var $ = require('jquery');
var _ = require('underscore');
var Whammy = require('../../util/Whammy.js');

$(function(){
	var _video = null;
	var _interval = {
		id: null,
		sec: 10
	};

	$('video.origin-video').bind({
		'play': _.bind(function(event){startClone(event)}, this),
		'pause ended': _.bind(function(event){completeClone(event)}, this)
	});

	var startClone = function(event){
		_video = new Whammy.Video(36, 1);

		if(!!_interval.id) window.clearInterval(_interval.id);

		_interval.id = window.setInterval(_.bind(function(){processClone()}, this), _interval.sec);
	};

	var processClone = function(event){
		var video = !!event ? event.currentTarget : $('video.origin-video')[0];
		var ctx = $('canvas')[0].getContext('2d');

		ctx.drawImage(video, 0, 0, 500, 300);

		_video.add(ctx);
	};

	var completeClone = function(event){
		if(!!_interval.id) window.clearInterval(_interval.id);

		$('video.clone-video').attr('src', window.URL.createObjectURL(_video.compile()));
	};
});