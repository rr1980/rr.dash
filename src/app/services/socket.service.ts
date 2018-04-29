import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as socketIo from 'socket.io-client';


@Injectable()
export class SocketService {
    private socket;
    private events: string[] = [];

    constructor() {
        this.socket = socketIo('http://localhost:3001');
    };

    send(key: string, data: any) {
        this.socket.emit(key, data);
    };

    on(key: string, cb: any) {
        this.events.push(key);
        this.socket.on(key, cb);
    }

    eventNames(): string[] {
        return this.events;
    }
}