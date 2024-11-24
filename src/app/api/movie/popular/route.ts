import { NextRequest, NextResponse } from 'next/server';

import apiServer from '@/lib/axios-server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const language = searchParams.get('language') || 'en-US';
  const page = searchParams.get('page') || '1';

  try {
    const response = await apiServer.get('/movie/popular', {
      params: {
        language,
        page,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch popular movies from TMDB' },
      { status: 500 },
    );
  }
}
