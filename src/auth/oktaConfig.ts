import { OktaAuth } from '@okta/okta-auth-js';

export const oktaAuth = new OktaAuth({
  clientId: '<YOUR_CLIENT_ID>',
  issuer: 'https://<YOUR_OKTA_DOMAIN>/oauth2/default',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
});
