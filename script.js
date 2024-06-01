let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

function formatTime(ms) {
    let totalMilliseconds = ms % 1000;
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(totalMilliseconds).padStart(3, '0')}`;
}

function startStop() {
    const startStopBtn = document.getElementById('startStopBtn');
    const lapBtn = document.getElementById('lapBtn');

    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.innerText = 'Start';
        lapBtn.disabled = true;
    } else {
        startTime = Date.now();
        timer = setInterval(() => {
            document.getElementById('display').innerText = formatTime(elapsedTime + (Date.now() - startTime));
        }, 10);
        startStopBtn.innerText = 'Stop';
        lapBtn.disabled = false;
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    startTime = null;
    elapsedTime = 0;
    document.getElementById('display').innerText = '00:00:00.000';
    document.getElementById('startStopBtn').innerText = 'Start';
    document.getElementById('lapBtn').disabled = true;
    document.getElementById('laps').innerHTML = '';
}

function recordLap() {
    const laps = document.getElementById('laps');
    const lapTime = elapsedTime + (isRunning ? Date.now() - startTime : 0);
    const lapElement = document.createElement('div');
    lapElement.className = 'lap';
    lapElement.innerText = formatTime(lapTime);
    laps.appendChild(lapElement);
}