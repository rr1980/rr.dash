import { Injectable } from "@angular/core";
import { HomeModel } from "../components/home/models/home.model";
import { BehaviorSubject } from 'rxjs';
import { Observable } from "rxjs/Observable";
import { AjaxService } from 'src/app/services/ajax.service';
import * as socketIo from 'socket.io-client';

@Injectable()
export class HomeService {

    socket;

    private _isLoading: boolean = false;
    private _isLoaded: boolean = false;
    private _homeModel: BehaviorSubject<HomeModel> = new BehaviorSubject(new HomeModel());

    get Model(): Observable<HomeModel> {

        if (!this._isLoaded && !this._isLoading) {
            this.readData();
        }

        return this._homeModel.asObservable();
    };

    constructor(private ajaxService: AjaxService) {
        this.socket = socketIo('http://localhost:3001');

        this.socket.on('getInit', (res) => {
            this._homeModel.next(res as HomeModel);
            console.debug(res);
        });

    };

    // private readData() {
    //     this._isLoading = true;
    //     console.debug("loading...");
    //     this.ajaxService.get<HomeModel>("/api/getInit").then(res => {
    //         this._homeModel.next(res as HomeModel);
    //         this._isLoaded = true;
    //         this._isLoading = false;
    //     });
    // }

    private readData() {
        this._isLoading = true;
        console.debug("loading...");
        this.socket.emit('getInit');
    }
};