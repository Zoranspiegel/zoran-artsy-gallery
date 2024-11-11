import env from '@/env';
import dbConnect from '@/lib/dbConnection';
import { XAppToken, XAppTokenType } from '@/models/XAppToken';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    /* CONECTAR BASE DE DATOS */
    await dbConnect();

    /* SOLICITAR A BASE DE DATOS X-APP TOKEN GUARDADO DE ARTSY.NET */
    const dbResponse = await XAppToken.find();

    /* SI NO SE ENCUENTRA, SOLICITA Y GUARDA EN BASE DE DATOS UN NUEVO X-APP TOKEN DE ARTSY.NET */
    if (!dbResponse.length) {
      const newToken = await getNewXAppToken();

      const newDbToken = await XAppToken.create(newToken);

      console.log('Token creado por primera vez')
      return NextResponse.json({ token: newDbToken.token }, { status: 200 });
    }

    const token = dbResponse[0];

    /* VERIFICAR EXPIRACIÓN DEL TOKEN EN BASE DE DATOS */
    const actualDate = new Date();
    const tokenExpirationDate = new Date(token.expires_at);

    /* SOLICITA Y SOBREESCRIBE EN BASE DE DATOS UN NUEVO X-APP TOKEN DE ARTSY.NET */
    if (actualDate >= tokenExpirationDate) {
      await XAppToken.deleteOne({ _id: token._id });

      const newToken = await getNewXAppToken();

      const newDbToken = await XAppToken.create(newToken);

      console.log('Token expirado y creado nuevamente')
      return NextResponse.json({ token: newDbToken.token }, { status: 200 });
    }

    console.log('Token encontrado')
    return NextResponse.json({ token: token.token }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);

      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: 'Unknown Internal Server Error' },
      { status: 500 }
    );
  }
}

async function getNewXAppToken(): Promise<XAppTokenType> {
  const artsyCredentials = {
    client_id: env.ARTSY_CLIENT_ID,
    client_secret: env.ARTSY_CLIENT_SECRET
  };

  const response = await fetch('https://api.artsy.net/api/tokens/xapp_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(artsyCredentials)
  });

  if (!response.ok) {
    throw new Error('Failed to retrieve Artsy X-App token');
  }

  const responseJSON = await response.json();

  return responseJSON;
}
