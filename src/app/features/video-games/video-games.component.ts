import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { GamesService } from './video-games.service';
import { Game } from '../../shared/models/video-games.model';

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
  onAsc: boolean = true;
  orderOption: Number = 0; // 0: Release Date, 1: Score, 2: Name
  orderList: any = [
    { key: 0, label: 'Release Date' },
    { key: 1, label: 'Score'},
    { key: 2, label: 'Name'},
  ];

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
    this.name = e.target.value;
    this.filterList = this.gameList.filter(list => {
      if (this.score === 0 && e.target.value === '') return list; 
      if (e.target.value === '') return list.rating > this.score;
      else return list.name.includes(e.target.value) && list.rating > this.score;
    })
  }

  onScoreFilter(e: any) {
    if (e.target.value !== '') this.score = parseFloat(e.target.value);
    else this.score = 0;
    this.filterList = this.gameList.filter(list => {
      if (this.name === '' && e.target.value === '') return list; 
      if (this.name === '') return list.rating > this.score;
      if (e.target.value === '') return list.name.includes(this.name);
      else return list.rating > this.score && list.name.includes(this.name);
    })
  }

  onOrder() {
    this.onAsc = !this.onAsc;
  }
  
  onSort(e: any) {
    if (!e) return;
    if (this.onAsc) {
      switch (e.value) {
        case 0:
          this.filterList.sort((a, b) => (a.first_release_date < b.first_release_date ? -1 : 1));
          break;
        case 1:
          this.filterList.sort((a, b) => (a.rating < b.rating ? -1 : 1));
          break;
        case 2:
          this.filterList.sort((a, b) => (a.name < b.name ? -1 : 1));
          break;
        default:
          break;
      }
    } else  {
      switch (e.value) {
        case 0:
          this.filterList.sort((a, b) => (a.first_release_date < b.first_release_date ? 1 : -1));
          break;
        case 1:
          this.filterList.sort((a, b) => (a.rating < b.rating ? 1 : -1));
          break;
        case 2:
          this.filterList.sort((a, b) => (a.name < b.name ? 1 : -1));
          break;
        default:
          break;
      }
    }

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

