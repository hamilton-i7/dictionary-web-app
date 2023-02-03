export interface Word {
  word: string;
  phonetic?: string;
  phonetics: {
    text?: string;
    audio: string;
    sourceUrl?: string;
    license?: {
      name: string;
      url: string;
    };
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: WordDefinition[];
    synonyms: string[];
    antonyms: string[];
  }[];
  license: {
    name: string;
    url: string;
  };
  sourceUrls: string[];
}

export type WordDefinition = {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example?: string;
};

export type SimpleDefinition = Pick<WordDefinition, 'definition' | 'example'>;
