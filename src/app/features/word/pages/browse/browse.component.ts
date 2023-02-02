import { Component } from '@angular/core';
import { SearchQuery } from '../../../../core/models/query';
import { Word } from '../../../../core/models/word';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent {
  word?: Word;
  audioSrc?: string;
  isError = false;

  constructor(private router: Router) {}

  goToWord({ query }: SearchQuery): void {
    const formattedQuery = query.trim().toLowerCase();

    if (!this.isValidWord(formattedQuery)) {
      this.isError = true;
      return;
    }

    this.router.navigateByUrl(`/browse/${formattedQuery}`);

    // this.dictionaryService.getWord(query).subscribe((words) => {
    //   if (!words.length) {
    //     this.resetState();
    //     return;
    //   }

    //   this.word = words[0];
    //   this.getAudioSrc();
    // });
  }

  getAudioSrc(): void {
    if (!this.word) return;

    this.audioSrc = this.word.phonetics.find(
      (phonetic) => phonetic.audio !== ''
    )?.audio;
  }

  isValidWord(word: string): boolean {
    return word.length > 0;
  }

  resetState(): void {
    this.word = undefined;
  }
}
