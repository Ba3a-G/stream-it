const options = {
    autoplay: true,
    controls: true,
    fluid: true,
    preload: 'metadata',
    responsive: true,
    playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2],
    controlBar: {
        skipButtons: {
            forward: 30,
            backward: 10
        }
    },
    userActions: {
        hotkeys: function (event) {
            // `this` is the player in this context
            // forwards: right arrow, D-pad right, or trackpad right
            if (event.which === 39 || event.which === 176 || event.which === 102) {
                this.forward(30);
            }
            // backwards: left arrow, D-pad left, or trackpad left
            if (event.which === 37 || event.which === 177 || event.which === 100) {
                this.rewind(10);
            }
            // play/pause: spacebar, return, or enter
            if (event.which === 32 || event.which === 13) {
                this.paused() ? this.play() : this.pause();
            }
            // increase volume: up arrow or D-pad up
            if (event.which === 38 || event.which === 175) {
                this.volume(this.volume() + 0.1);
            }
            // decrease volume: down arrow or D-pad down
            if (event.which === 40 || event.which === 174) {
                this.volume(this.volume() - 0.1);
            }
            // mute/unmute: M
            if (event.which === 77) {
                this.muted(!this.muted());
            }
            // enter/exit fullscreen: F
            if (event.which === 70) {
                this.isFullscreen() ? this.exitFullscreen() : this.requestFullscreen();
            }
            // increase speed: c
            if (event.which === 67) {
                this.playbackRate(this.playbackRate() + 0.25);
            }
            // decrease speed: x
            if (event.which === 88) {
                this.playbackRate(this.playbackRate() - 0.25);
            }
        }
    },
    experimentalSvgIcons: true
}

var player = videojs(document.querySelector('.video-js'), options);

// player.playlist([{
//   sources: [{
//     src: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
//     type: 'video/mp4'
//   }],
//   poster: 'http://media.w3.org/2010/05/sintel/poster.png'
// }, {
//   sources: [{
//     src: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
//     type: 'video/mp4'
//   }],
//   poster: 'http://media.w3.org/2010/05/bunny/poster.png'
// }, {
//   sources: [{
//     src: 'http://vjs.zencdn.net/v/oceans.mp4',
//     type: 'video/mp4'
//   }],
//   poster: 'http://www.videojs.com/img/poster.jpg'
// }, {
//   sources: [{
//     src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
//     type: 'video/mp4'
//   }],
//   poster: 'http://media.w3.org/2010/05/bunny/poster.png'
// }, {
//   sources: [{
//     src: 'http://media.w3.org/2010/05/video/movie_300.mp4',
//     type: 'video/mp4'
//   }],
//   poster: 'http://media.w3.org/2010/05/video/poster.png'
// }]);

player.playlist(videos);

player.on('ended', function() {
    console.log('ended')
    // get the index of the current video
    var currentVideoIndex = player.playlist.currentItem();
    console.log(currentVideoIndex)
    // get the total number of videos
    var totalVideos = player.playlist();
    console.log(totalVideos)
    // if there is another video, play it
    if (currentVideoIndex < totalVideos.length - 1) {
        player.playlist.next();
    }
});

