import { NextRequest, NextResponse } from 'next/server';

import apiServer from '@/lib/axios-server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const query = searchParams.get('query') || '';
  const includeAdult = searchParams.get('include_adult') || 'false';
  const language = searchParams.get('language') || 'en-US';
  const page = searchParams.get('page') || '1';

  try {
    const response = await apiServer.get('/search/movie', {
      params: {
        query,
        include_adult: includeAdult,
        language,
        page,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch search results from TMDB' },
      { status: 500 },
    );
  }
}
