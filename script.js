const player = document.querySelector(".player");
const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.querySelector("#play-btn");
const volumeIcon = document.querySelector("#volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const durationTime = document.querySelector(".time-duration");
const selectSpeed = document.querySelector("select");
const fullscreenBtn = document.querySelector("#fullscreen");
let lastVolume = 1;
// ========================= functions for playIcon
function togglePlayBtn() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
}
function playToggle() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "pause");
  } else {
    video.pause();
    togglePlayBtn();
  }
}
// ==================== function for progress bar
function displayTime(time) {
  const minute = Math.floor(time / 60);
  let second = Math.floor(time % 60);
  if (second > 9 ? second : (second = `0${second}`));
  return `${minute}:${second}`;
}
function updateProgress(e) {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  durationTime.textContent = `${displayTime(video.duration)}`;
}
function updateTime(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}
// =================== function for change volume

function changeVolume(e) {
  let newVolume = e.offsetX / volumeRange.offsetWidth;
  if (newVolume > 0.9) {
    newVolume = 1;
  }
  if (newVolume < 0.1) {
    newVolume = 0;
  }
  video.volume = newVolume;
  volumeIcon.className = "";
  if (newVolume > 0.7) {
    volumeIcon.classList.add("fa-solid", "fa-volume-high");
  } else if (newVolume > 0 && newVolume < 0.7) {
    volumeIcon.classList.add("fa-solid", "fa-volume-low");
  } else if (newVolume === 0) {
    volumeIcon.classList.add("fa-solid", "fa-volume-xmark");
  }
  volumeBar.style.width = `${newVolume * 100}%`;
  lastVolume = newVolume;
}
function toggleMute() {
  volumeIcon.className = "";
  if (video.volume) {
    volumeIcon.classList.add("fa-solid", "fa-volume-xmark");
    volumeIcon.setAttribute("title", "Unmute");
    volumeBar.style.width = 0;
    video.volume = 0;
  } else {
    volumeIcon.classList.add("fa-solid", "fa-volume-high");
    volumeIcon.setAttribute("title", "Mute");
    volumeBar.style.width = `${lastVolume * 100}%`;
    video.volume = lastVolume;
  }
}
// ==================== function for speed rate

// ============================ eventListner
playBtn.addEventListener("click", playToggle);
video.addEventListener("ended", togglePlayBtn);
video.addEventListener("click", playToggle);
video.addEventListener("canplay", updateProgress);
video.addEventListener("timeupdate", updateProgress);
progressRange.addEventListener("click", updateTime);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
selectSpeed.addEventListener(
  "click",
  () => (video.playbackRate = selectSpeed.value)
);
// ================= function for full screen
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
}
/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
}
let fullscreen = false;
function toggleFullScreen() {
  if (!fullscreen) {
    openFullscreen(player);
    fullscreenBtn.classList.replace("fa-expand", "fa-compress");
  } else {
    closeFullscreen();
    fullscreenBtn.classList.replace("fa-compress", "fa-expand");
  }
  fullscreen = !fullscreen;
}
fullscreenBtn.addEventListener("click", toggleFullScreen);
console.log(fullscreenBtn);
