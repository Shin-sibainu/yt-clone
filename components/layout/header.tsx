"use client";

import { Search, Menu } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Youtube } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2 hover:opacity-90">
            <Youtube className="h-8 w-8 text-red-600" />
            <span className="hidden text-xl font-semibold sm:inline-block">
              YouTube
            </span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-center gap-2">
          <form className="flex w-full max-w-[600px] items-center gap-2">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search"
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <Button type="submit" variant="secondary">
              Search
            </Button>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
} 