export default async function fetchPaintings(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'X-Xapp-Token':
          'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiJlNThjMjkwMS02YWIwLTQ4OTctYmRmMC1lZjE2OGEzYzM5NjUiLCJleHAiOjE3MzE4MDcwNjMsImlhdCI6MTczMTIwMjI2MywiYXVkIjoiZTU4YzI5MDEtNmFiMC00ODk3LWJkZjAtZWYxNjhhM2MzOTY1IiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjY3MzAwY2Q3MTU1MDgxNDlmN2EyYzA3ZCJ9.eyNKC2069j-1zZw2eljCBblWkfZttWFadc07DC8GxC4'
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
