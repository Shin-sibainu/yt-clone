/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { getVideos } from '../../../../lib/vimeo';
import { convertVimeoToVideoData } from '../../../../lib/utils/video';

export async function GET() {
  try {
    const vimeoVideos = await getVideos();
    const videos = vimeoVideos.map(convertVimeoToVideoData);
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
} 