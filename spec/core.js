//Add Jasmine Tests Here
var LinxDevice = require('../dist/linx-device/linx-device.js').LinxDevice;

describe('LinxDevice', function () {

    let linxDevice = new LinxDevice('local');

    it('should be defined', () => {
        expect(linxDevice).toBeDefined();
    });

    linxDevice.digitalRead(10)
        .then((data) => {
            console.log(data);
        })
        .catch((e) => {
            console.log(e);
        });

});