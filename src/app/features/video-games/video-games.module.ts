import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoGamesRoutingModule } from './video-games-routing.module';
import { VideoGamesComponent } from './video-games.component';
import { HeaderModule } from '../../shared/components/header/header.module';
import { SharedModule } from '@shared/shared.module';
import { GamesService } from './video-games.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VideoGamesComponent],
  imports: [CommonModule, VideoGamesRoutingModule, SharedModule, HeaderModule, FormsModule, ReactiveFormsModule],
  providers: [GamesService]
})
export class VideoGamesModule {}
