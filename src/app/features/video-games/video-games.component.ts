import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GamesService } from './video-games.service';
import { Game } from '../../core/models/video-games.model';

@Component({
  selector: 'app-video-game',
  templateUrl: './video-games.component.html',
  // styleUrls: ['./after-login.component.scss'],
})
export class VideoGamesComponent implements OnInit, OnDestroy{
  
  GameList: Game[] =[];

  private destroy$ = new Subject();
  constructor(private gameService: GamesService) {

  }

  ngOnInit(): void {
    this.gameService.get()
      .pipe(takeUntil(this.destroy$))
      .subscribe(results => {
        console.log(results);      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

