import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { GamesService } from './video-games.service';
import { Game } from '../../core/models/video-games.model';

@Component({
  selector: 'app-video-game',
  templateUrl: './video-games.component.html',
  // styleUrls: ['./after-login.component.scss'],
})
export class VideoGamesComponent implements OnInit, OnDestroy{
  
  gameList: Game[] = [];
  delay: number = 2000;
  loadingIndicator$!: Observable<boolean>;
  filterList: Game[] = [];
  name: string = "";
  score: number = 0;
  orderAsec: boolean = true;
  orderOption: Number = 0; // 0: Release Date, 1: Score, 2: Name

  private destroy$ = new Subject();
  constructor(private gameService: GamesService) {

  }

  ngOnInit(): void {
    timer(this.delay)
      .pipe(switchMap( () =>this.gameService.get()))
      .pipe(takeUntil(this.destroy$))
      .subscribe((results: Game[]) => {
        this.gameList = results.map( item => {
          item.rating = item.rating / 10;
          return item;
        });
        this.filterList = this.gameList;
    });
  }

  onNameFilter(e: any)  {
    this.filterList = this.gameList.filter(list => {
      return list.name.includes(e.target.value);
    })
  }

  onScoreFilter(e: any) {
    this.filterList = this.gameList.filter(list => {
      return list.rating > e.target.value
    })
  }

  onOrder() {

  }
  

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

