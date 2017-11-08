const LinxDevice = require('../../dist/linx-device/linx-device').LinxDevice;

let linxDevice = new LinxDevice();

linxDevice.open('local');

linxDevice.getDeviceName()
    .then((data) => {
        console.log(data);
        return linxDevice.getLinxApiVersion()
    })
    .then((data) => {
        console.log(data);
        return linxDevice.getDeviceId();
    })
    .then((data) => {
        console.log(data);
        return linxDevice.digitalGetChans();
    })
    .then((data) => {
        console.log(data);
        linxDevice.close();
    })
    .catch((e) => {
        console.log(e);
        linxDevice.close();
    });

    