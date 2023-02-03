import { Pipe, PipeTransform } from '@angular/core';
import { SimpleDefinition, WordDefinition } from '../../../core/models/word';

@Pipe({
  name: 'mapDefinition',
})
export class MapDefinitionPipe implements PipeTransform {
  transform(definitions: WordDefinition[]): SimpleDefinition[] {
    return definitions.map((definition) => ({
      definition: definition.definition,
      example: definition.example,
    }));
  }
}
