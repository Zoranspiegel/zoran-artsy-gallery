import {
  XAppToken,
  XAppTokenZodSchema,
  type XAppTokenType
} from '@/models/XAppToken';
import dbConnect from './dbConnection';
import env from '@/env';

async function createXAppToken(): Promise<void> {
  try {
    const credentialsBody = {
      client_id: env.ARTSY_CLIENT_ID,
      client_secret: env.ARTSY_CLIENT_SECRET
    };

    const getTokenRes = await fetch(
      'https://api.artsy.net/api/tokens/xapp_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentialsBody)
      }
    );

    if (!getTokenRes.ok)
      throw new Error(
        `Failed to retrieve new token: ${getTokenRes.status} ${getTokenRes.statusText}`
      );

    const getTokenResJSON = await getTokenRes.json();

    const newToken = XAppTokenZodSchema.parse(getTokenResJSON);

    await XAppToken.create(newToken);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    }
  }
}

export default async function getXAppToken(): Promise<
  XAppTokenType | undefined
> {
  try {
    await dbConnect();

    const tokens: XAppTokenType[] = await XAppToken.find();

    if (!tokens.length) {
      await createXAppToken();

      const newTokens: XAppTokenType[] = await XAppToken.find();

      return newTokens[0];
    }

    const actualDate = new Date();
    const tokenExpirationDate = new Date(tokens[0].expires_at);

    if (actualDate >= tokenExpirationDate) {
      await XAppToken.deleteMany({});

      await createXAppToken();

      const newTokens: XAppTokenType[] = await XAppToken.find();

      return newTokens[0];
    }
    
    return tokens[0];
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
