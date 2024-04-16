
const audio = document.getElementById('myAudio');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const volumeControl = document.getElementById('volumeControl');
const seekControl = document.getElementById('seekControl');
const volumeText = document.getElementById('volumeText');
const timeText = document.getElementById('timeText');

playBtn.addEventListener('click', function() {
    audio.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
});

pauseBtn.addEventListener('click', function() {
    audio.pause();
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'inline-block';
});

volumeControl.addEventListener('input', function() {
    audio.volume = volumeControl.value;
    volumeText.textContent = `Громкость: ${Math.round(volumeControl.value * 100)}%`;
});

seekControl.addEventListener('input', function() {
    audio.currentTime = audio.duration * (seekControl.value / 100);
});

audio.addEventListener('timeupdate', function() {
    seekControl.value = (audio.currentTime / audio.duration) * 100;
    const currentTime = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);
    timeText.textContent = `Прошедшее время: ${currentTime} / ${duration}`;
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
