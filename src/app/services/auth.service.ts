import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { UserViewModel } from "src/app/models/app-state.model";
// import { ElectronService } from "ngx-electron";
import { AppStoreService } from "./app-store.service";
import { Router } from "@angular/router";
import { SocketService } from "./socket.service";

class UserLoginRequest {
    username: string;
    password: string;
}

@Injectable()
export class AuthService {


    public userViewModel: UserViewModel;

    constructor(private appStoreService: AppStoreService, private router: Router, private socketService:SocketService) {
        this.appStoreService.get('setLogin').subscribe((response) => {
            this.userViewModel = response as UserViewModel;

            if (this.userViewModel && this.userViewModel.auth) {
                this.router.navigate(['/home/dashboard']);
            }
            else {
                this.router.navigate(['/login']);
            }
        });
    };

    public isLoggedIn(): boolean {
        if (this.userViewModel) {
            return this.userViewModel.auth;
        }
        return false;
    }

    Login(userLoginRequest: UserLoginRequest) {
        console.debug("try login...", userLoginRequest);

        this.socketService.send('tryLogin', userLoginRequest);
    }
};