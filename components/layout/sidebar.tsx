"use client";

import {
  Home,
  Compass,
  Clock,
  ThumbsUp,
  PlaySquare,
  History,
  Clapperboard,
  Flame,
  ShoppingBag,
  Music2,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function SidebarItem({ icon, label, isActive }: SidebarItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-4 px-3",
        isActive && "bg-secondary"
      )}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r bg-background px-3 py-3">
      <div className="flex flex-col gap-1">
        <SidebarItem
          icon={<Home className="h-5 w-5" />}
          label="Home"
          isActive
        />
        <SidebarItem icon={<Compass className="h-5 w-5" />} label="Explore" />
        <SidebarItem
          icon={<Clapperboard className="h-5 w-5" />}
          label="Shorts"
        />

        <hr className="my-3" />

        <h3 className="mb-1 px-3 text-sm font-semibold text-muted-foreground">
          Library
        </h3>
        <SidebarItem icon={<History className="h-5 w-5" />} label="History" />
        <SidebarItem
          icon={<PlaySquare className="h-5 w-5" />}
          label="Your Videos"
        />
        <SidebarItem icon={<Clock className="h-5 w-5" />} label="Watch Later" />
        <SidebarItem
          icon={<ThumbsUp className="h-5 w-5" />}
          label="Liked Videos"
        />

        <hr className="my-3" />

        <h3 className="mb-1 px-3 text-sm font-semibold text-muted-foreground">
          Explore
        </h3>
        <SidebarItem icon={<Flame className="h-5 w-5" />} label="Trending" />
        <SidebarItem
          icon={<ShoppingBag className="h-5 w-5" />}
          label="Shopping"
        />
        <SidebarItem icon={<Music2 className="h-5 w-5" />} label="Music" />
        <SidebarItem icon={<Gamepad2 className="h-5 w-5" />} label="Gaming" />
        <SidebarItem icon={<Newspaper className="h-5 w-5" />} label="News" />
        <SidebarItem icon={<Trophy className="h-5 w-5" />} label="Sports" />
        <SidebarItem
          icon={<Lightbulb className="h-5 w-5" />}
          label="Learning"
        />
      </div>
    </aside>
  );
}
