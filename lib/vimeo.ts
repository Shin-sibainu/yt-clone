import axios from "axios";

const VIMEO_ACCESS_TOKEN = process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN;
// const VIMEO_USER_ID = process.env.NEXT_PUBLIC_VIMEO_USER_ID;

export const vimeoApi = axios.create({
  baseURL: "https://api.vimeo.com",
  headers: {
    Authorization: `bearer ${VIMEO_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export async function getVideos() {
  if (!VIMEO_ACCESS_TOKEN) {
    console.error("Vimeo access token is not configured");
    return [];
  }

  try {
    const userResponse = await vimeoApi.get("/me");
    const userId = userResponse.data.uri.split("/").pop();

    // ユーザーの動画を取得
    const response = await vimeoApi.get(`/users/${userId}/videos`, {
      params: {
        page: 1,
        per_page: 12,
        fields: "uri,name,description,duration,created_time,pictures,stats",
      },
    });

    if (!response.data || !response.data.data) {
      console.error("Invalid response format from Vimeo API");
      return [];
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Vimeo API Error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.response?.data?.error || error.message,
        details: error.response?.data?.developer_message || 'No additional details',
      });
    } else {
      console.error("Error fetching videos:", error);
    }
    return [];
  }
}
