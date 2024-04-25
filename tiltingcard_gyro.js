window.onload = function() {
    if (!isMobileDevice()) {
        requestDeviceOrientation();
    }
};

function isMobileDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
}

function handleOrientation(e) {
    console.log(e);

    let alpha = e.alpha;
    let beta = e.beta;
    let gamma = e.gamma;

    let cardX = Math.max(-30, Math.min(beta - 90, 30));
    let cardY = Math.max(-30, Math.min(gamma, 30));

    let card = document.getElementsByClassName('tiltingContent')[0]; // Get the first element
    card.style.transform = 'rotateX(' + cardX + 'deg) rotateY(' + cardY + 'deg) rotateZ(0deg)';
}

async function requestDeviceOrientation() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+
        try {
            const permissionState = await DeviceOrientationEvent.requestPermission();
            if (permissionState === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation);
            }
        } catch (error) {
            console.error(error);
        }
    } else if ('DeviceOrientationEvent' in window) {
        // Not iOS 13+
        window.addEventListener('deviceorientation', handleOrientation);
    } else {
        // Device orientation not supported
        alert('Gyroscope not supported');
    }
}
