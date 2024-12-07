/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from "next/server";
import { getVideos } from "../../../../lib/vimeo";
import { convertVimeoToVideoData } from "../../../../lib/utils/video";

export async function GET(request: NextRequest) {
  try {
    const vimeoVideos = await getVideos();
    const videos = vimeoVideos.map(convertVimeoToVideoData);
    return Response.json(videos);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
} 