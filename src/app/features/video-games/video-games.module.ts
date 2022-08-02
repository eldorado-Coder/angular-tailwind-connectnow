import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoGamesRoutingModule } from './video-games-routing.module';
import { VideoGamesComponent } from './video-games.component';
import { HeaderModule } from '../../shared/components/header/header.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [VideoGamesComponent],
  imports: [CommonModule, VideoGamesRoutingModule, SharedModule, HeaderModule],
})
export class VideoGamesModule {}
