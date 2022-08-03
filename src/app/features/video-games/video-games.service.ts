import { Game } from '../../shared/models/video-games.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GamesService {
    
    private headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    constructor(private http: HttpClient, @Inject('BASE_URL') private _baseUrl: string,
    ) { }

    /**
     * 
     * @returns Games[]
     */
    get(): Observable<Game[]> {
        return this.http.get<Game[]>(this._baseUrl, { headers: this.headers }).pipe(
            catchError(this.handleError<Game[]>('getData', []))
          );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }
}