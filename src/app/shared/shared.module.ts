import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
// import { NgxElectronModule } from 'ngx-electron';
import { AuthGuard } from '../guards/auth.guard';
import { AjaxService } from '../services/ajax.service';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
// import { AppStateService } from '../services/app-state.service';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { AppStoreService } from '../services/app-store.service';
import { ChartsModule } from 'ng2-charts';
import { NgDraggableWidgetModule } from 'ngx-draggable-widget';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    // NgxElectronModule,
    NgbModule.forRoot(),
    NgCircleProgressModule.forRoot(),
    NgDraggableWidgetModule,
    RoundProgressModule,
    ChartsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgCircleProgressModule,
    NgDraggableWidgetModule,
    RoundProgressModule,
    ChartsModule
  ],
  declarations: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        SocketService,
        AuthService,
        AppStoreService,
        AuthGuard,
        // AppStateService,
        // InternElectronService,
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        AjaxService
      ]
    };
  };
};

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
};