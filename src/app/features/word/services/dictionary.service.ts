import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Word } from '../../../core/models/word';
import { environment } from '../../../../environments/environment';
import {
  NetworkError,
  NotFoundError,
  UnexpectedError,
} from '../../../core/utils/http-error';

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
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 0:
        return throwError(() => new NetworkError());
      case HttpStatusCode.NotFound:
        return throwError(() => new NotFoundError());
      default:
        return throwError(() => new UnexpectedError());
    }
  }
}
