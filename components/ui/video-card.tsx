import Link from 'next/link';
import Image from 'next/image';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
  uploadedAt: string;
  duration: string;
}

export function VideoCard({
  id,
  title,
  thumbnail,
  channel,
  views,
  uploadedAt,
  duration,
}: VideoCardProps) {
  return (
    <Link href={`/watch/${id}`}>
      <div className="group cursor-pointer">
        <div className="relative aspect-video overflow-hidden rounded-xl">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-xs text-white">
            {duration}
          </div>
        </div>
        <div className="mt-2">
          <h3 className="line-clamp-2 text-sm font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{channel}</p>
          <div className="flex text-sm text-muted-foreground">
            <span>{views} views</span>
            <span className="mx-1">•</span>
            <span>{uploadedAt}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 