import { VimeoVideo, VideoData } from '../../types/vimeo';

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

export function formatUploadDate(date: string): string {
  const uploadDate = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - uploadDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
  const years = Math.floor(diffDays / 365);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

export function convertVimeoToVideoData(vimeoVideo: VimeoVideo): VideoData {
  const thumbnail = vimeoVideo.pictures.sizes.find(size => size.width === 640)?.link || '';
  const id = vimeoVideo.uri.split('/').pop() || '';

  return {
    id,
    title: vimeoVideo.name,
    thumbnail,
    channel: 'Your Channel Name',
    views: formatViews(vimeoVideo.stats.plays),
    uploadedAt: formatUploadDate(vimeoVideo.created_time),
    duration: formatDuration(vimeoVideo.duration),
  };
} 