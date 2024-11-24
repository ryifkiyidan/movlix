import { NextRequest, NextResponse } from 'next/server';

import apiServer from '@/lib/axios-server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const language = searchParams.get('language') || 'en-US';

  try {
    const response = await apiServer.get('/trending/movie/week', {
      params: {
        language,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch trending movies for the week from TMDB' },
      { status: 500 },
    );
  }
}
