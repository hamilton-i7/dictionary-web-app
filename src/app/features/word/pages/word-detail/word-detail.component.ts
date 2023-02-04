import { Component, OnInit } from '@angular/core';
import { Word } from '../../../../core/models/word';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DictionaryService } from '../../services/dictionary.service';
import { filter } from 'rxjs';
import {
  NetworkError,
  NotFoundError,
  UnexpectedError,
} from '../../../../core/utils/http-error';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.scss'],
})
export class WordDetailComponent implements OnInit {
  word?: Word;
  audioSrc?: string;
  phonetic?: string;
  sourceUrl?: string;

  showError = false;
  errorTitle?: string;
  errorMessage?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dictionaryService: DictionaryService
  ) {}

  ngOnInit(): void {
    this.getWord();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.getWord());
  }

  getWord(): void {
    const word = this.route.snapshot.paramMap.get('word') || '';
    this.dictionaryService.getWord(word).subscribe({
      next: (words) => {
        this.resetErrors();

        this.word = words[0];
        this.sourceUrl = words[0].sourceUrls[0];
        this.getAudioSrc();
        this.getPhonetic();
      },
      error: (err) => {
        switch (true) {
          case err instanceof NetworkError:
            this.buildError(
              'Not connected',
              "Seems like you're not online at the moment. 😟"
            );
            break;
          case err instanceof NotFoundError:
            this.buildError(
              'No definitions found',
              "Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead. 😟"
            );
            break;
          case err instanceof UnexpectedError:
            this.buildError(
              'Something went wrong',
              "Sorry pal, something went wrong, and it's not your fault. 😟"
            );
        }
      },
    });
  }

  getPhonetic(): void {
    if (!this.word) {
      this.phonetic = undefined;
      return;
    }
    if (this.word?.phonetic) {
      this.phonetic = this.word.phonetic;
      return;
    }
    this.phonetic = this.word?.phonetics.find(
      (phonetic) => phonetic.text
    )?.text;
  }

  getAudioSrc(): void {
    if (!this.word) {
      this.audioSrc = undefined;
      return;
    }

    this.audioSrc = this.word?.phonetics.find(
      (phonetic) => phonetic.audio !== ''
    )?.audio;
  }

  private buildError(title: string, message: string): void {
    this.showError = true;
    this.errorTitle = title;
    this.errorMessage = message;
  }

  resetErrors() {
    this.showError = false;
    this.errorTitle = undefined;
    this.errorMessage = undefined;
  }
}
