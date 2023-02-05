import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { WordDetailComponent } from './word-detail.component';
import { SimpleDefinition, Word } from '../../../../core/models/word';
import { DictionaryService } from '../../services/dictionary.service';
import {
  ActivatedRoute,
  convertToParamMap,
  Event,
  NavigationEnd,
  Router,
} from '@angular/router';
import { of, Subject } from 'rxjs';
import { dummyKeyboardWords, dummyTvWords } from '../../../../core/mocks/word';
import { MapDefinitionPipe } from '../../pipes/map-definition.pipe';
import { environment } from '../../../../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

@Component({ selector: 'app-word-heading', template: '' })
class WordHeadingComponent {
  @Input() word?: string;
  @Input() phonetic?: string;
  @Input() audioSrc?: string;
}

@Component({ selector: 'app-word-meaning', template: '' })
class WordMeaningComponent {
  @Input() partOfSpeech = '';
  @Input() meanings: SimpleDefinition[] = [];
  @Input() synonyms: string[] = [];
}

describe('WordDetailComponent', () => {
  let component: WordDetailComponent;
  let fixture: ComponentFixture<WordDetailComponent>;
  let dictionaryServiceSpy: jasmine.SpyObj<DictionaryService>;
  let getWordSpy: jasmine.Spy<(word: string) => Observable<Word[]>>;
  let router: Router;

  beforeEach(async () => {
    dictionaryServiceSpy = jasmine.createSpyObj('DictionaryService', [
      'getWord',
    ]);
    getWordSpy = dictionaryServiceSpy.getWord.and.returnValue(of(dummyTvWords));

    const routeStub = {
      snapshot: {
        paramMap: convertToParamMap({ word: 'tv' }),
      },
    };

    await TestBed.configureTestingModule({
      declarations: [
        WordDetailComponent,
        WordHeadingComponent,
        WordMeaningComponent,
        MapDefinitionPipe,
      ],
      providers: [
        { provide: DictionaryService, useValue: dictionaryServiceSpy },
        { provide: ActivatedRoute, useValue: routeStub },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WordDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show word after component initialized', () => {
    expect(component.word)
      .withContext('should be tv word')
      .toEqual(dummyTvWords[0]);
  });

  it('should show new word on navigation end', () => {
    expect(component.word)
      .withContext('should be first word that was searched')
      .toEqual(dummyTvWords[0]);

    const event = new NavigationEnd(
      1,
      `${environment.apiUrl}/keyboard`,
      `${environment.apiUrl}/keyboard`
    );

    getWordSpy.and.returnValue(of(dummyKeyboardWords));
    (router.events as Subject<Event>).next(event);

    expect(component.word)
      .withContext('should be the next word after navigation')
      .toEqual(dummyKeyboardWords[0]);
  });
});
