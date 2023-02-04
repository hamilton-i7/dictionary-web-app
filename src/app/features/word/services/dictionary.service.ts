import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
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

  getWord(word: string): Observable<HttpResponse<Word[]>> {
    return this.http
      .get<HttpResponse<Word[]>>(
        `${environment.apiUrl}/${word}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<Word[]>('getWord', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result: T | null) {
    return (error: HttpErrorResponse): Observable<HttpResponse<T>> => {
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(new HttpResponse<T>({ status: error.status, body: result }));
    };
  }
}
