import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { DictionaryService } from './dictionary.service';
import { dummyTvWords } from '../../../core/mocks/word';
import { environment } from '../../../../environments/environment';
import { HttpStatusCode } from '@angular/common/http';
import {
  NetworkError,
  NotFoundError,
  UnexpectedError,
} from '../../../core/utils/http-error';

describe('DictionaryService', () => {
  let service: DictionaryService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DictionaryService],
    });
    service = TestBed.inject(DictionaryService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of Words', () => {
    service.getWord('tv').subscribe((words) => {
      expect(words).toEqual(dummyTvWords);
    });

    const request = controller.expectOne(`${environment.apiUrl}/tv`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyTvWords);
  });

  it('should return NotFoundError when given word not found in API', () => {
    service.getWord('juan').subscribe({
      next: () => fail('should have failed with 404 status'),
      error: (error) => {
        expect(error).toBeInstanceOf(NotFoundError);
        expect((error as NotFoundError).statusCode).toEqual(
          HttpStatusCode.NotFound
        );
      },
    });

    const req = controller.expectOne(`${environment.apiUrl}/juan`);
    req.flush(new NotFoundError(), {
      status: HttpStatusCode.NotFound,
      statusText: 'Not Found',
    });
  });

  it('should return UnexpectedError when connection to server failed', () => {
    service.getWord('tv').subscribe({
      next: () => fail('should have failed with 500 status'),
      error: (error) => {
        expect(error).toBeInstanceOf(UnexpectedError);
        expect((error as UnexpectedError).statusCode).toEqual(
          HttpStatusCode.InternalServerError
        );
      },
    });

    const req = controller.expectOne(`${environment.apiUrl}/tv`);
    req.flush(new UnexpectedError(), {
      status: HttpStatusCode.InternalServerError,
      statusText: 'Unexpected error',
    });
  });

  it('should return NetworkError when offline', () => {
    service.getWord('tv').subscribe({
      next: () => fail('should have failed with 0 status'),
      error: (error) => {
        expect(error).toBeInstanceOf(NetworkError);
        expect((error as NetworkError).statusCode).toEqual(0);
      },
    });

    const req = controller.expectOne(`${environment.apiUrl}/tv`);
    req.flush(new NetworkError(), {
      status: 0,
      statusText: 'Network error',
    });
  });
});
