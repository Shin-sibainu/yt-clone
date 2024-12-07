import { NextRequest } from "next/server";
import { vimeoApi } from "../../../../../lib/vimeo";
import axios from "axios";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const response = await vimeoApi.get(`/videos/${id}`);
    return Response.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Response.json(
        {
          error: "Failed to fetch video",
          details: error.response?.data?.error || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
