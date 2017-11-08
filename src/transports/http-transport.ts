import { GenericTransport } from '@digilent/linx-device-js';
const https = require('https');
const http = require('http');


export class HttpTransportService extends GenericTransport {
    private parsedAddress: string;
    private type: 'http' | 'https';
    private port: number;

    constructor(
        public address: string,
        public endpoint: string
    ) {
        super();
        this.parseAddress();
    }

    private parseAddress() {
        if (this.address.indexOf('https://') !== -1) {
            this.type = 'https';
            this.parsedAddress = this.address.replace('https://', '');
        }
        else if (this.address.indexOf('http') !== -1) {
            this.type = 'http';
            this.parsedAddress = this.address.replace('http://', '');
        }
        else {
            this.type = 'http';
            this.parsedAddress = this.address;
        }
        let split = this.parsedAddress.split(':');
        if (split.length > 1) {
            this.port = parseInt(split[split.length - 1]);
            this.parsedAddress = split.slice(0, split.length - 1).join(':');
        }
    }

    writeRead(sendData: any): Promise<any> {
        if (this.type === 'https') {
            return this.httpsSend(sendData);
        }
        else {
            return this.httpSend(sendData);
        }
    }

    httpsSend(sendData: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let options = {
                method: "POST",
                host: this.parsedAddress,
                path: this.endpoint,
                headers: {
                    "Content-Type": "application/octet-stream",
                    "Content-Length": sendData.length
                },
                rejectUnauthorized: false
            };
            if (this.port != undefined) {
                options['port'] = this.port;
            }
            let data = [];
            let request = https.request(options, response => {
                response.on("data", (chunk) => { data.push(chunk); });
                response.on("end", () => { resolve(Buffer.concat(data)); });
            });
            request.on("error", (err) => { reject(err) });
            request.write(new Buffer(sendData));
            request.end();
        });
    }

    httpSend(sendData: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let options = {
                method: "POST",
                host: this.parsedAddress,
                path: this.endpoint,
                headers: {
                    "Content-Type": "application/octet-stream",
                    "Content-Length": sendData.length
                }
            };
            if (this.port != undefined) {
                options['port'] = this.port;
            }
            let data = [];
            let request = http.request(options, response => {
                response.on("data", (chunk) => { data.push(chunk); });
                response.on("end", () => { resolve(Buffer.concat(data)); });
            });
            request.on("error", (err) => { reject(err) });
            request.write(new Buffer(sendData));
            request.end();
        });
    }


}