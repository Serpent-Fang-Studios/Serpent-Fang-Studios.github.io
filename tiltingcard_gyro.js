window.onload = requestDeviceOrietation();

function handleOrientation(e){
    console.log(e)

    let alpha = e.alpha
    let beta = e.beta
    let gamma = e.gamma
    
    let cardX = Math.max(-30, Math.min(beta - 90, 30));
    let cardY = Math.max(-30, Math.min(gamma, 30));

    let card = document.getElementsByClassName('tiltingContent')
    card.item(0).style.transform = 'rotateX(' + cardX + 'deg) rotateY(' + cardY + 'deg) rotateZ(0deg)'
    
}

async function requestDeviceOrietation() {
    if (typeof DeviceOrientationEvent != 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        //IOS 13+
        try {
            const permitionState = await DeviceOrientationEvent.requestPermission()
            if(permitionState === 'grant'){
                window.addEventListener('deviceorientation', handleOrientation)
            }
        } catch (error) {
            console.error(error)
        }
    }else if('DeviceOrientationEvent' in window){
        //not IOS 13+
        window.addEventListener('deviceorientation', handleOrientation)
    }else{
        //device orenetation not supported
        alert('gyro not supported')
    }
}

