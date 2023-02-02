import { Component, Input, OnInit } from '@angular/core';
import { Word } from '../../../../core/models/word';
import { ActivatedRoute } from '@angular/router';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.scss'],
})
export class WordDetailComponent implements OnInit {
  @Input() word?: Word;
  audioSrc?: string;

  constructor(
    private route: ActivatedRoute,
    private dictionaryService: DictionaryService
  ) {}

  ngOnInit(): void {
    this.getWord();
  }

  getWord(): void {
    const word = this.route.snapshot.paramMap.get('word')!;
    this.dictionaryService.getWord(word).subscribe((words) => {
      if (!words.length) return;

      this.word = words[0];
      this.getAudioSrc();
    });
  }

  getAudioSrc(): void {
    if (!this.word) return;

    this.audioSrc = this.word.phonetics.find(
      (phonetic) => phonetic.audio !== ''
    )?.audio;
  }
}
