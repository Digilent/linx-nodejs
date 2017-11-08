import { GenericTransport } from '@digilent/linx-device-js';

export class LocalTransportService extends GenericTransport {
    private ffi = require('ffi');
    private ref = require('ref');
    private ArrayType = require('ref-array');

    //Types
    private int = this.ref.types.int;
    private uint8 = this.ref.types.uint8;
    private char = this.ref.types.char;
    private string = this.ref.types.CString;
    private uint8Array = this.ArrayType(this.uint8);
    private ulong = this.ref.types.ulong;
    private uint = this.ref.types.uint;

    private charPtr = this.ref.refType('char');
    private uint8Ptr = this.ref.refType('uint8');
    private ulongPtr = this.ref.refType('ulong');


    private lib = this.ffi.Library('liblinxdevice', {
        //------------------------------------- Constructor/Destructor -------------------------------------
        'LinxOpen': [ this.int , [] ],
        'LinxClose': [ this.int, [] ],

        //------------------------------------- Enumeration -------------------------------------
        /* 'LinxGetDeviceFamily': [ this.uint8, [] ],
        'LinxGetDeviceId': [ this.uint8, [] ],
        'LinxGetDeviceNameLen': [ this.uint8, [] ],
        'LinxGetDeviceName': [ this.int, [this.string] ], */

        //------------------------------------- General -------------------------------------
        /* 'LinxGetMilliSeconds': [ this.ulong, [] ],
        'LinxDelayMs': [ "void", [this.ulong] ], */
        'LinxProcessCommand': [ this.int, [ this.uint8Ptr, this.uint8Ptr ] ],

        //------------------------------------- Analog -------------------------------------
        //To Implement
        /* extern "C" uint8_t LinxAiGetRefSetVoltage(uint8_t channel, uint8_t* mode, long* low, long* high);
        extern "C" uint8_t LinxAoGetRefSetVoltage(uint8_t channel, uint8_t* mode, long* low, long* high);
        extern "C" uint8_t LinxSetAiRef(uint8_t channel, uint8_t mode, long low, long high);
        extern "C" uint8_t LinxSetAoRef(uint8_t channel, uint8_t mode, long low, long high);
        extern "C" int LinxAnalogRead(uint8_t numChans, uint8_t* channels, uint8_t* values);
        extern "C" int LinxAnalogReadNoPacking(uint8_t numChans, uint8_t* channels, unsigned long* values); */
        /* 'LinxAiGetResolution': [ this.uint8, [this.uint8] ],
        'LinxAoGetResolution': [ this.uint8, [this.uint8] ],
        'LinxAiGetNumChans': [ this.uint8, [] ],
        'LinxAoGetNumChans': [ this.uint8, [] ],
        'LinxAiGetChans': [ this.int, [ this.uint8, this.uint8Ptr ] ],
        'LinxAoGetChans': [ this.int, [ this.uint8, this.uint8Ptr ] ],    */ 

        //------------------------------------- Digital -------------------------------------
        /* 'LinxDigitalGetNumChans': [ this.uint8, [] ],
        'LinxDigitalGetChans': [ this.int, [this.uint8, this.uint8Ptr] ],
        'LinxDigitalWrite': [ this.int, [this.uint8, this.uint8Ptr, this.uint8Ptr] ],
        'LinxDigitalWriteNoPacking': [ this.int, [this.uint8, this.uint8Ptr, this.uint8Ptr] ],
        'LinxDigitalRead': [ this.int, [this.uint8, this.uint8Ptr, this.uint8Ptr] ],
        'LinxDigitalReadNoPacking': [ this.int, [this.uint8, this.uint8Ptr, this.uint8Ptr] ], */

        //------------------------------------- I2C -------------------------------------
        /* 'LinxI2cGetNumChans': [ this.uint8, [] ],
        'LinxI2cGetChans': [ this.int, [this.uint8, this.uint8Ptr] ],
        'LinxI2cOpenMaster': [ this.int, [this.uint8] ],
        'LinxI2cSetSpeed': [ this.int, [this.uint8, this.ulong, this.ulongPtr] ],
        'LinxI2cWrite': [ this.int, [this.uint8, this.uint8, this.uint8, this.uint8, this.uint8Ptr] ],
        'LinxI2cRead': [ this.int, [this.uint8, this.uint8, this.uint8, this.uint8, this.uint, this.uint8Ptr]],
        'LinxI2cClose': [ this.int, [this.uint8] ], */
                        
        //------------------------------------- PWM -------------------------------------
        /* 'LinxPwmGetNumChans': [ this.uint8, [] ],
        'LinxPwmGetChans': [ this.int, [this.uint8, this.uint8Ptr] ],
        'LinxPwmSetDutyCycle': [ this.int, [this.uint8, this.uint8Ptr, this.uint8Ptr] ], */

        //------------------------------------- QE -------------------------------------
        /* 'LinxQeGetNumChans': [ this.uint8, [] ],
        'LinxQeGetChans': [ this.int, [this.uint8, this.uint8Ptr] ], */

        //------------------------------------- CAN -------------------------------------
        /* 'LinxCanGetNumChans': [ this.uint8, [] ],
        'LinxCanGetChans': [ this.int, [this.uint8, this.uint8Ptr] ], */

        //------------------------------------- Servo -------------------------------------
        /* 'LinxServoGetNumChans': [ this.uint8, [] ],
        'LinxServoGetChans': [ this.int, [this.uint8, this.uint8Ptr] ], */

        //------------------------------------- SPI -------------------------------------
        /* 'LinxSpiGetNumChans': [ this.uint8, [] ],
        'LinxSpiGetChans': [ this.int, [this.uint8, this.uint8Ptr] ],
        'LinxSpiOpenMaster': [ this.int, [this.uint8] ],
        'LinxSpiSetBitOrder': [ this.int, [this.uint8, this.uint8] ],
        'LinxSpiSetMode': [ this.int, [this.uint8, this.uint8] ],
        'LinxSpiSetSpeed': [ this.int, [this.uint8, this.ulong, this.ulongPtr] ],
        'LinxSpiWriteRead': [ this.int, [this.uint8, this.uint8, this.uint8, this.uint8, this.uint8, this.uint8Ptr, this.uint8Ptr] ], */
                
        //------------------------------------- UART -------------------------------------
        /* 'LinxUartGetNumChans': [ this.uint8, [] ],
        'LinxUartGetChans': [ this.int, [this.uint8, this.uint8Ptr] ],
        'LinxUartOpen': [ this.int, [this.uint8, this.ulong, this.ulongPtr] ],
        'LinxUartSetBaudRate': [ this.int, [this.uint8, this.ulong, this.ulongPtr] ],
        'LinxUartGetBytesAvailable': [ this.int, [this.uint8, this.uint8Ptr] ],
        'LinxUartRead': [ this.int, [this.uint8, this.uint8, this.uint8Ptr, this.uint8Ptr] ],
        'LinxUartWrite': [ this.int, [this.uint8, this.uint8, this.uint8Ptr] ],
        'LinxUartClose': [ this.int, [this.uint8] ] */
    });

    constructor() {
        super();
    }

    open(): number {
        return this.lib.LinxOpen();
    }

    writeRead(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let recTest = new Uint8Array(128);
            this.lib.LinxProcessCommand(data, recTest);
            let length = (recTest[1] << 8) | recTest[2];
            resolve(recTest.slice(0, length));
        });
    }

    close() {
        return this.lib.LinxClose();
    }


}