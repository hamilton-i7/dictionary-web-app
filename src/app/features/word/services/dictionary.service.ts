import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Word } from '../../../core/models/word';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getWord(word: string): Observable<Word[]> {
    return this.http
      .get<Word[]>(`${environment.apiUrl}/${word}`, this.httpOptions)
      .pipe(catchError(this.handleError<Word[]>('getWord', [])));
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
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
