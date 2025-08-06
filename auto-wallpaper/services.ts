import { encodeBase64 } from './deps.ts';
import {
   Rating,
   ServiceAuthType,
   ServiceDetails,
   ServiceName,
} from './types.ts';

export const services: Record<ServiceName, ServiceDetails> = {
   danbooru: {
      url: 'https://danbooru.donmai.us',
      testUrl: 'https://testbooru.donmai.us',
      postsApi: '/posts.json',
      randomApi: '/posts/random.json',
      tags: [],
      auth: encodeBase64(
         Deno.env.get('USER_NAME') + ':' + Deno.env.get('API_KEY')
      ),
      authType: ServiceAuthType.HEADER,
      method: {
         getPosts(data: unknown): Record<string, unknown>[] {
            let results = data as Record<string, unknown>[];
            if (!Array.isArray(results)) {
               results = [results];
            }
            return results;
         },
         getId(json: Record<string, unknown>): number {
            return typeof json.id === 'number' ? +json.id : 0;
         },
         getImageExt(json: Record<string, unknown>): string {
            return typeof json.file_ext === 'string' ? json.file_ext : '';
         },
         getImageUrl(json: Record<string, unknown>): string {
            return typeof json.file_url === 'string' ? json.file_url : '';
         },
         getCreatedDate(json: Record<string, unknown>): Date {
            return typeof json.created_at === 'string'
               ? new Date(json.created_at)
               : new Date();
         },
         getRating(json: Record<string, unknown>): Rating {
            const mapping: Record<string, Rating> = {
               g: Rating.GENERAL,
               s: Rating.SENSITIVE,
               q: Rating.QUESTIONABLE,
               e: Rating.EXPLICIT,
            };
            return typeof json.rating === 'string'
               ? mapping[json.rating] ?? Rating.UNKNOWN
               : Rating.UNKNOWN;
         },
         getWidth(json: Record<string, unknown>): number {
            return typeof json.image_width === 'number' ? json.image_width : 0;
         },
         getTags(json: Record<string, unknown>): string[] {
            return typeof json.tag_string === 'string'
               ? json.tag_string.split(' ')
               : [];
         },
         getCharacters(json: Record<string, unknown>): string[] {
            return typeof json.tag_string_character === 'string'
               ? json.tag_string_character.split(' ')
               : [];
         },
      },
   },
   gelbooru: {
      url: 'https://gelbooru.com',
      testUrl: 'https://test.gelbooru.com',
      postsApi:
         '/index.php?page=dapi&s=post&q=index&json=1&limit=1&api_key=81dfac9e22ea81a85961dcd8e5d255c65a1bdba83342c20d140274d7e99b461a&user_id=1688320',
      randomApi: null,
      tags: ['sort:random'],
      auth: encodeBase64(
         Deno.env.get('USER_NAME') + ':' + Deno.env.get('API_KEY')
      ),
      authType: ServiceAuthType.PARAM,
      method: {
         getPosts(data: unknown): Record<string, unknown>[] {
            let results =
               data && typeof data === 'object' && 'post' in data
                  ? (data.post as Record<string, unknown>[])
                  : [];
            if (!Array.isArray(results)) {
               results = [results];
            }
            return results;
         },
         getId(json: Record<string, unknown>): number {
            throw new Error('Function not implemented.');
         },
         getImageExt(json: Record<string, unknown>): string {
            throw new Error('Function not implemented.');
         },
         getImageUrl(json: Record<string, unknown>): string {
            throw new Error('Function not implemented.');
         },
         getCreatedDate(json: Record<string, unknown>): Date {
            throw new Error('Function not implemented.');
         },
         getRating(json: Record<string, unknown>): Rating {
            throw new Error('Function not implemented.');
         },
         getWidth(json: Record<string, unknown>): number {
            throw new Error('Function not implemented.');
         },
         getTags(json: Record<string, unknown>): string[] {
            throw new Error('Function not implemented.');
         },
         getCharacters(json: Record<string, unknown>): string[] {
            throw new Error('Function not implemented.');
         },
      },
   },
};
