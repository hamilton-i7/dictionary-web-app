import { Component, Input, OnInit } from '@angular/core';
import { Word } from '../../../../core/models/word';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DictionaryService } from '../../services/dictionary.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.scss'],
})
export class WordDetailComponent implements OnInit {
  @Input() word?: Word;
  audioSrc?: string;
  phonetic?: string;
  sourceUrl = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dictionaryService: DictionaryService
  ) {}

  ngOnInit(): void {
    if (!this.word) {
      this.getWord();
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.getWord());
  }

  getWord(): void {
    const word = this.route.snapshot.paramMap.get('word')!;
    this.dictionaryService.getWord(word).subscribe((words) => {
      if (!words.length) return;

      this.word = words[0];
      this.phonetic = this.word?.phonetic;
      this.sourceUrl = words[0].sourceUrls[0];
      this.getAudioSrc();
    });
  }

  getAudioSrc(): void {
    if (!this.word) return;

    this.audioSrc = this.word?.phonetics.find(
      (phonetic) => phonetic.audio !== ''
    )?.audio;
  }
}
