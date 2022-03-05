console.log('Battalary version 1');

let isMonitoring = false;

function startMonitoring() {
  if (isMonitoring) return false;
  navigator.getBattery().then((battery) => {
    updateAllBatteryInfo();
    function updateAllBatteryInfo() {
      updateChargeInfo();
      updateLevelInfo();
      updateChargingInfo();
      updateDischargingInfo();
    }

    battery.addEventListener('chargingchange', () => {
      updateChargeInfo();
    });
    
    function updateChargeInfo() {
      document.getElementById('battery-is-charging').innerHTML =
      battery.charging ? 'Yes' : 'No';
    }
    
    battery.addEventListener('levelchange', () => {
      updateLevelInfo();
      playAudio();
    });

    function updateLevelInfo() {
      document.getElementById('battery-level').innerHTML =
        battery.level * 100 + '%';
      const notifTitle = 'Battalary';
      const notifBody = `Level: ${battery.level * 100}%`;
      const notifImg = `icons/icon-64.png`;
      const options = {
        body: notifBody,
        icon: notifImg,
      };
      new Notification(notifTitle, options);
    }

    battery.addEventListener('chargingtimechange', () => {
      updateChargingInfo();
    });

    function updateChargingInfo() {
      document.getElementById('battery-charging-time').innerHTML =
        battery.chargingTime + ' seconds';
    }

    battery.addEventListener('dischargingtimechange', () => {
      updateDischargingInfo();
    });

    function updateDischargingInfo() {
      document.getElementById('battery-discharging-time').innerHTML =
        battery.dischargingTime + ' seconds';
    }
  });
}

function playAudio() {
  new Audio('audio/oy-oy.mp3').play();
}

// startMonitoring();
Notification.requestPermission().then((result) => {
  if (result === 'granted') {
    // randomNotification();
    // alert('Notif granted');
  }
});
