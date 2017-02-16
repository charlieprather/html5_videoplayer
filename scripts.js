//get elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressbar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');



// build function

function togglePlay(){
const method = video.paused ? 'play' : "pause";
video[method]();

}

//hoop up the event listeners

function updateButton(){
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;

}

function skip(){

video.currentTime += parseFloat(this.dataset.skip);

}

function handleRangeUpdate(){

video[this.name] = this.value;


}

  var fullScreenButton = document.getElementById("full-screen");


fullScreenButton.addEventListener("click", function() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen(); // Firefox
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen(); // Chrome and Safari
  }
});






function scrub(e){
const scrubTime = (e.offsetX /progress.offsetWidth) * video.duration;
video.currentTime = scrubTime; 
}

function handleProgress(){
const percent = (video.currentTime / video.duration) * 100;
progressbar.style.flexBasis = `${percent}%`;

}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;


toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);




