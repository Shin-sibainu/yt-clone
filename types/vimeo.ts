export interface VimeoVideo {
  uri: string;
  name: string;
  description: string;
  duration: number;
  created_time: string;
  pictures: {
    sizes: {
      width: number;
      height: number;
      link: string;
    }[];
  };
  stats: {
    plays: number;
  };
}

export interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
  uploadedAt: string;
  duration: string;
} 