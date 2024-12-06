import { NextResponse } from 'next/server';
import { vimeoApi } from '../../../../../lib/vimeo';
import axios from 'axios';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await vimeoApi.get(`/videos/${params.id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { 
          error: 'Failed to fetch video',
          details: error.response?.data?.error || error.message 
        },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 