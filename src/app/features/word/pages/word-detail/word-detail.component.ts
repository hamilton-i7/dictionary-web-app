import { Component, OnInit } from '@angular/core';
import { Word } from '../../../../core/models/word';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DictionaryService } from '../../services/dictionary.service';
import { filter } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';

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
  showUnexpectedError = false;
  showNotFoundError = false;

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
    this.dictionaryService.getWord(word).subscribe((response) => {
      this.resetErrors();

      switch (response.status) {
        case HttpStatusCode.NotFound:
          this.showNotFoundError = true;
          break;
        default:
          this.showUnexpectedError = true;
      }

      this.word = response.body?.at(0);
      this.sourceUrl = response.body?.at(0)?.sourceUrls?.at(0);
      this.getAudioSrc();
      this.getPhonetic();
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

  resetErrors() {
    this.showUnexpectedError = false;
    this.showNotFoundError = false;
  }
}
