import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { GamesService } from './video-games.service';
import { Game } from '../../shared/models/video-games.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-video-game',
  templateUrl: './video-games.component.html',
})
export class VideoGamesComponent implements OnInit, OnDestroy{
  
  gameList: Game[] = [];
  delay: number = 2000;
  filterList: Game[] = [];
  orderOption: Number = 0; // 0: Release Date, 1: Score, 2: Name
  orderList: any = [
    { key: 0, label: 'Release Date' },
    { key: 1, label: 'Score'},
    { key: 2, label: 'Name'},
  ];
  onAsc: boolean = true;
  innerWidth: number = 1000;
  onLoading: boolean = true;

  searchForm!: FormGroup;
  loadingIndicator$!: Observable<boolean>;
  private destroy$ = new Subject();

  constructor(private gameService: GamesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.searchForm = this.fb.group({
      name: ['', Validators.compose([Validators.maxLength(20)])],
      score: [null, Validators.compose([Validators.maxLength(2)])],
      sortVal: ['0', Validators.compose([Validators.maxLength(2)])]
    })

    timer(this.delay)
      .pipe(switchMap( () =>this.gameService.get()))
      .pipe(takeUntil(this.destroy$))
      .subscribe((results: Game[]) => {
        this.gameList = results.map( item => {
          item.rating = item.rating / 10;
          return item;
        });
        /**selected filter option */
        this.filterList = this.gameList.sort((a, b) => (a.first_release_date < b.first_release_date ? -1 : 1));
        this.onLoading = false;
    });
    this.searchForm.get('name')?.valueChanges.subscribe((v) => this.onNameFilter(v));
    this.searchForm.get('score')?.valueChanges.subscribe((v) => this.onScoreFilter(v));
    this.searchForm.get('sortVal')?.valueChanges.subscribe((v) => this.onSort(this.getControl('sortVal')?.value, this.onAsc));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  onNameFilter(value: string)  {
    this.filterList = this.gameList.filter(list => {
      if (this.getControl('score')?.value === 0 && value === '') return list; 
      if (value === '') return list.rating > this.getControl('score')?.value;
      else return list.name.includes(value) && list.rating > this.getControl('score')?.value;
    })
  }

  onScoreFilter(v: string) {
    this.filterList = this.gameList.filter(list => {
      if (this.getControl('name')?.value === '' && v === '') return list; 
      if (this.getControl('name')?.value === '') return list.rating > this.getControl('score')?.value;
      if (v === null) return list.name.includes(this.getControl('name')?.value);
      else return list.rating > this.getControl('score')?.value && list.name.includes(this.getControl('name')?.value);
    })
  }

  
  getControl(name: string) {
    return this.searchForm.get(name);
  }

  onOrder() {
    this.onAsc = !this.onAsc;
    this.onSort(this.getControl('sortVal')?.value, this.onAsc);
  }
  
  onSort(sortVal: string, onAsc: boolean) {
    if (onAsc) {
      switch (sortVal) {
        case '0':
          this.filterList = this.filterList.sort((a, b) => (a.first_release_date < b.first_release_date ? -1 : 1));
          break;
        case '1':
          this.filterList = this.filterList.sort((a, b) => (a.rating < b.rating ? -1 : 1));
          break;
        case '2':
          this.filterList = this.filterList.sort((a, b) => (a.name < b.name ? -1 : 1));
          break;
        default:
          break;
      }
    } else  {
      switch (sortVal) {
        case '0':
          this.filterList = this.filterList.sort((a, b) => (a.first_release_date < b.first_release_date ? 1 : -1));
          break;
        case '1':
          this.filterList = this.filterList.sort((a, b) => (a.rating < b.rating ? 1 : -1));
          break;
        case '2':
          this.filterList = this.filterList.sort((a, b) => (a.name < b.name ? 1 : -1));
          break;
        default:
          break;
      }
    }

  }

  onClear() {
    this.onAsc = true;
    this.getControl('name')?.setValue('');
    this.getControl('score')?.setValue(null);
    this.getControl('sortVal')?.setValue('0');
    this.filterList = this.gameList.sort((a, b) => (a.first_release_date < b.first_release_date ? -1 : 1));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

