"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { Header } from "../../../../components/layout/header";
import type { VimeoVideo } from "../../../../types/vimeo";
import { ThumbsUp, ThumbsDown, Share2, Clock, Flag } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { formatViews, formatUploadDate } from "../../../../lib/utils/video";
import { VideoCard } from "../../../../components/ui/video-card";

// ダミーの関連動画データ
const RELATED_VIDEOS = [
  {
    id: "1",
    title: "Getting Started with Web Development",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    channel: "Code Academy",
    views: "125K",
    uploadedAt: "3 days ago",
    duration: "10:25",
  },
  {
    id: "2",
    title: "Modern JavaScript Fundamentals",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    channel: "JS Mastery",
    views: "89K",
    uploadedAt: "1 week ago",
    duration: "15:30",
  },
  {
    id: "3",
    title: "React.js Complete Course",
    thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
    channel: "React Tutorials",
    views: "200K",
    uploadedAt: "2 weeks ago",
    duration: "20:15",
  },
  {
    id: "4",
    title: "Building Modern UIs",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    channel: "UI Masters",
    views: "150K",
    uploadedAt: "5 days ago",
    duration: "12:45",
  },
];

export default function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [video, setVideo] = useState<VimeoVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await fetch(`/api/videos/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch video");
        }
        const data = await response.json();
        setVideo(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching video:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
            <p className="text-destructive">{error || "Video not found"}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2">
            <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
              <iframe
                src={`https://player.vimeo.com/video/${id}?h=00000000&autoplay=1`}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-4 space-y-4">
              <h1 className="text-2xl font-bold">{video.name}</h1>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {formatViews(video.stats.plays)} views
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatUploadDate(video.created_time)}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Dislike
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </Button>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold">
                      {video.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Channel Name</h3>
                    <p className="text-sm text-muted-foreground">
                      1.2M subscribers
                    </p>
                  </div>
                  <Button className="ml-auto" variant="secondary">
                    Subscribe
                  </Button>
                </div>
                <p className="text-sm whitespace-pre-wrap">
                  {video.description}
                </p>
              </div>
            </div>
          </div>

          {/* 関連動画 */}
          <div className="space-y-4">
            <h2 className="font-semibold">Related Videos</h2>
            <div className="space-y-4">
              {RELATED_VIDEOS.map((video) => (
                <div key={video.id} className="w-full">
                  <VideoCard {...video} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
