import { NextRequest, NextResponse } from 'next/server';

import apiServer from '@/lib/axios-server';

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid movie id' }, { status: 400 });
  }

  const { searchParams } = req.nextUrl;

  const language = searchParams.get('language') || 'en-US';

  try {
    const response = await apiServer.get(`/movie/${id}`, {
      params: {
        language,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch movies from TMDB' },
      { status: 500 },
    );
  }
}