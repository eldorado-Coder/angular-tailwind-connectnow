import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { environment } from '@env';
import { VideoGamesModule } from '@features/video-games/video-games.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { HeaderModule } from '@shared/components/header/header.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    LoadingBarRouterModule,
    HeaderModule,
    VideoGamesModule
  ],
  providers: [
    { provide: 'BASE_URL', useValue: environment.baseurl }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
