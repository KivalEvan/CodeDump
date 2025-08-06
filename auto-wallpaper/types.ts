export type ServiceName = 'danbooru' | 'gelbooru';

export interface ServiceDetails {
   url: string;
   testUrl: string;
   postsApi: string;
   randomApi: string | null;
   auth: string;
   tags: string[];
   authType: ServiceAuthType;
   method: {
      getPosts: (data: unknown) => Record<string, unknown>[];
      getId: (json: Record<string, unknown>) => number;
      getImageExt: (json: Record<string, unknown>) => string;
      getImageUrl: (json: Record<string, unknown>) => string;
      getCreatedDate: (json: Record<string, unknown>) => Date;
      getRating: (json: Record<string, unknown>) => Rating;
      getWidth: (json: Record<string, unknown>) => number;
      getTags: (json: Record<string, unknown>) => string[];
      getCharacters: (json: Record<string, unknown>) => string[];
   };
}

export const enum Rating {
   GENERAL,
   SENSITIVE,
   QUESTIONABLE,
   EXPLICIT,
   UNKNOWN,
}

export const RatingSerialize: Record<Rating, string> = {
   [Rating.GENERAL]: 'g',
   [Rating.SENSITIVE]: 's',
   [Rating.QUESTIONABLE]: 'q',
   [Rating.EXPLICIT]: 'e',
   [Rating.UNKNOWN]: 'u',
};

export const enum ServiceAuthType {
   HEADER,
   PARAM,
}
