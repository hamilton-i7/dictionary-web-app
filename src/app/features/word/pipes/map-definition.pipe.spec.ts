import { dummyKeyboardWords } from '../../../core/mocks/word';
import { SimpleDefinition } from '../../../core/models/word';
import { MapDefinitionPipe } from './map-definition.pipe';

describe('MapDefinitionPipe', () => {
  const pipe = new MapDefinitionPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should map data into SimpleDefinition', () => {
    const result: SimpleDefinition[] = [
      {
        definition:
          '(etc.) A set of keys used to operate a typewriter, computer etc.',
        example: undefined,
      },
      {
        definition:
          'A component of many instruments including the piano, organ, and harpsichord consisting of usually black and white keys that cause different tones to be produced when struck.',
        example: undefined,
      },
      {
        definition:
          'A device with keys of a musical keyboard, used to control electronic sound-producing devices which may be built into or separate from the keyboard device.',
        example: undefined,
      },
      {
        definition: 'To type on a computer keyboard.',
        example: 'Keyboarding is the part of this job I hate the most.',
      },
    ];

    expect(
      pipe.transform(
        dummyKeyboardWords[0].meanings.flatMap((meaning) => meaning.definitions)
      )
    )
      .withContext('data transformed to SimpleDefinition')
      .toEqual(result);
  });
});
