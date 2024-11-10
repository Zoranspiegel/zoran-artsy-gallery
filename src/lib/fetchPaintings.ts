import getXAppToken from './getXAppToken';

export default async function fetchPaintings(url: string) {
  try {
    const xapptokens = await getXAppToken();

    if (!xapptokens?.token) throw new Error('Internal Server Error');

    const xapptoken = xapptokens?.token;

    const response = await fetch(url, {
      headers: {
        'X-Xapp-Token': xapptoken
      }
    });

    if (!response.ok) throw new Error('Failed to fetch paintings');

    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
