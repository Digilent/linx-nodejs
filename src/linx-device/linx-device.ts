import { GenericLinxDevice, GenericTransport, Return } from '@digilent/linx-device-js';
import { HttpTransportService } from '../transports/http-transport';
import { LocalTransportService } from '../transports/local-transport';

export class LinxDevice extends GenericLinxDevice {
    protected transport: GenericTransport;
    private connectionType: ConnectionType;

    constructor() {
        super();
    }

    open(connectionType: ConnectionType, params: HttpParameters | null): Return.Default {
        switch(connectionType) {
            case 'http':
                if (params.address == undefined || params.endpoint == undefined) { 
                    return {
                        message: 'invalid parameters',
                        statusCode: 1
                    };
                }
                this.transport = new HttpTransportService(params.address, params.endpoint);
                break;
            case 'local':
                this.transport = new LocalTransportService();
                (<LocalTransportService>this.transport).open();
                break;
            default:
                return {
                    message: 'invalid connection type',
                    statusCode: 1
                };
        }
        this.connectionType = connectionType;
        return {
            message: 'ok',
            statusCode: 0
        }
    }

    close() {
        if (this.connectionType === 'local') {
            (<LocalTransportService>this.transport).close();  
        }
    }
}

export type ConnectionType = 'http' | 'local';

export interface HttpParameters {
    address: string,
    endpoint: string
}