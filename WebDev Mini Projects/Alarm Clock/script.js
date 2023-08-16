const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const snoozeButton = document.getElementById('snoozeButton');
const alarmTimeInput = document.getElementById('alarmTime');

let alarmTime;
let alarmInterval;

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;
    timeDisplay.textContent = currentTime;
}

function startAlarm() {
    const selectedTime = alarmTimeInput.value;
    const [hours, minutes] = selectedTime.split(':');
    const now = new Date();
    const alarmDateTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        Number(hours),
        Number(minutes),
        0
    );
    const timeDiff = alarmDateTime - now;

    if (timeDiff <= 0) {
        alert('Please select a time in the future.');
        return;
    }

    alarmTime = alarmDateTime.getTime();
    clearInterval(alarmInterval);
    alarmInterval = setInterval(checkAlarm, 1000);

    alarmTimeInput.disabled = true;
    startButton.disabled = true;
    stopButton.disabled = false;
    snoozeButton.disabled = true;
}

function checkAlarm() {
    const now = new Date().getTime();
    if (now >= alarmTime) {
        showNotification();
        stopButton.disabled = true;
        snoozeButton.disabled = false;
        clearInterval(alarmInterval);
    }
}

function stopAlarm() {
    clearInterval(alarmInterval);
    alarmTimeInput.disabled = false;
    startButton.disabled = false;
    stopButton.disabled = true;
    snoozeButton.disabled = true;
}

function snoozeAlarm() {
    const snoozeTime = 5 * 60 * 1000; // 5 minutes
    alarmTime = new Date().getTime() + snoozeTime;
    clearInterval(alarmInterval);
    alarmInterval = setInterval(checkAlarm, 1000);
    snoozeButton.disabled = true;
}

function showNotification() {
    // Replace this with your own notification implementation (e.g., using the Notification API)
    alert('ALARM! Time to wake up!');
}

startButton.addEventListener('click', startAlarm);
stopButton.addEventListener('click', stopAlarm);
snoozeButton.addEventListener('click', snoozeAlarm);

setInterval(updateTime, 1000);