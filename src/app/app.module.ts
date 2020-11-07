import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppCommonDeclaration } from './app.common';
import { AppComponent } from './app.component';
import { AppInitializer } from './app.initializer';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './interceptors/token-interceptor';

@NgModule({
  declarations: [AppComponent, ...AppCommonDeclaration],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    FontAwesomeModule,
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: AppInitializer,
    //   multi: true,
    //   deps: [AuthService],
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
