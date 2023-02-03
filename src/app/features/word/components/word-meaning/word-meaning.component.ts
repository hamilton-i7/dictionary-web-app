import { Component, Input } from '@angular/core';
import { SimpleDefinition } from '../../../../core/models/word';

@Component({
  selector: 'app-word-meaning',
  templateUrl: './word-meaning.component.html',
  styleUrls: ['./word-meaning.component.scss'],
})
export class WordMeaningComponent {
  @Input() partOfSpeech = '';
  @Input() meanings: SimpleDefinition[] = [];
  @Input() synonyms: string[] = [];
}
