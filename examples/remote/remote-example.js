const LinxDevice = require('../../dist/linx-device/linx-device').LinxDevice;
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getAddress(callback) {
    return new Promise((resolve, reject) => {
        rl.question("Please enter the device address.\nExample:\nhttps://192.168.1.108:4443\n\nAddress: ", function(answer) {
           resolve(answer); 
           rl.close();
        });
    });
}

getAddress()
    .then((address) => {
        let linxDevice = new LinxDevice();
        
        linxDevice.open('http', { address: address, endpoint: '/' });
        
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
                process.exit();
            })
            .catch((e) => {
                console.log(e);
                linxDevice.close();
                process.exit();
            });
    })
    .catch((e) => {
        console.log(e);
        process.exit();
    });