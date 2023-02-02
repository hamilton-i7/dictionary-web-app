import { Component } from '@angular/core';
import { SearchQuery } from '../../core/models/query';
import { Word } from '../../core/models/word';
import { DictionaryService } from './services/dictionary.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class WordComponent {
  word?: Word;
  audioSrc?: string;

  constructor(private dictionaryService: DictionaryService) {}

  getWord({ query }: SearchQuery): void {
    this.dictionaryService.getWord(query).subscribe((words) => {
      if (!words.length) {
        this.resetState();
        return;
      }

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

  resetState(): void {
    this.word = undefined;
  }
}
