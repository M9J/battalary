console.log('Battalary version 3');
console.log('Last build: ' + '2022-03-05T16:26:14.395Z');

let isMonitoring = false;
let batteryRef = null;
let notificationAudio = null;
const notificationAudioUrl = 'audio/oy-oy.mp3';
const btnStart = document.getElementById('start-button');
const btnStop = document.getElementById('stop-button');
const lblBatteryIsCharging = document.getElementById('battery-is-charging');
const lblBatteryLevel = document.getElementById('battery-level');
const lblBatteryChargingTime = document.getElementById('battery-charging-time');
const lblBatteryDischargingTime = document.getElementById(
  'battery-discharging-time'
);

function startMonitoring() {
  if (!batteryRef) {
    navigator.getBattery().then((battery) => {
      batteryRef = battery;
      updateAllBatteryInfo();
      batteryRef.addEventListener('chargingchange', chargingchange);
      batteryRef.addEventListener('levelchange', levelchange);
      batteryRef.addEventListener('chargingtimechange', chargingtimechange);
      batteryRef.addEventListener(
        'dischargingtimechange',
        dischargingtimechange
      );
      isMonitoring = true;
      btnStart.classList.add('hidden');
      btnStop.classList.remove('hidden');
    });
  }
}

function stopMonitoring() {
  if (batteryRef) {
    pauseAudio();
    batteryRef.removeEventListener('chargingchange', chargingchange);
    batteryRef.removeEventListener('levelchange', levelchange);
    batteryRef.removeEventListener('chargingtimechange', chargingtimechange);
    batteryRef.removeEventListener(
      'dischargingtimechange',
      dischargingtimechange
    );
    batteryRef = null;
    lblBatteryIsCharging.innerHTML = '-';
    lblBatteryLevel.innerHTML = '-';
    // lblBatteryChargingTime.innerHTML = '-';
    // lblBatteryDischargingTime.innerHTML = '-';
    isMonitoring = false;
    btnStop.classList.add('hidden');
    btnStart.classList.remove('hidden');
  }
}

function updateAllBatteryInfo() {
  chargingchange();
  levelchange();
  // chargingtimechange();
  // dischargingtimechange();
}

function chargingchange() {
  lblBatteryIsCharging.innerHTML = batteryRef.charging ? 'Yes' : 'No';
}

function levelchange() {
  lblBatteryLevel.innerHTML = (batteryRef.level * 100).toFixed() + '%';
  pushNotification();
  const tmr1 = setTimeout(() => {
    clearTimeout(tmr1);
    playAudio();
  }, 1000);
}

function chargingtimechange() {
  lblBatteryChargingTime.innerHTML = batteryRef.chargingTime + ' seconds';
}

function dischargingtimechange() {
  lblBatteryDischargingTime.innerHTML = batteryRef.dischargingTime + ' seconds';
}

function pushNotification() {
  const notifTitle = 'Battalary';
  const notifBody = `Level: ${(batteryRef.level * 100).toFixed()}%`;
  const notifImg = `icons/icon-64.png`;
  const options = {
    body: notifBody,
    icon: notifImg,
  };
  new Notification(notifTitle, options);
}

function playAudio() {
  if (!notificationAudio) {
    notificationAudio = new Audio(notificationAudioUrl);
    notificationAudio.play();
  }
}

function pauseAudio() {
  if (notificationAudio) {
    notificationAudio.pause();
    notificationAudio = null;
  }
}

Notification.requestPermission().then((result) => {
  if (result === 'granted') {
    console.log('Notification permission granted');
  }
});
