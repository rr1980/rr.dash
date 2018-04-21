import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AjaxService } from 'src/app/services/ajax.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from 'src/app/guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  exports: [
    CommonModule,
    NgbModule
  ],
  declarations: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthGuard,
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        AjaxService
      ]
    };
  };
};

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
};