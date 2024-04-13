import { authenticator } from './deps.ts';

const auth = new authenticator();
const auth_url = auth.authenticate({
   client_id: Deno.env.get('GOOGLE_CLIENT_ID')!,
   redirect_uri: 'https://localhost:8080',
   scope:
      'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl',
});
console.log(auth_url);
