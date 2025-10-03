import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { ProfileDialog } from "./ProfileDialog";
import { Leaf, Trophy } from "lucide-react";

export function Header() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold">Paryāvaraṇa Vidyā</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="/current-issues" className="text-sm font-medium hover:text-primary transition-colors">
              Issues
            </a>
            <a href="/solutions" className="text-sm font-medium hover:text-primary transition-colors">
              Solutions
            </a>
            <a href="/games" className="text-sm font-medium hover:text-primary transition-colors">
              Games
            </a>
            <a href="/redeem" className="text-sm font-medium hover:text-primary transition-colors">
              Redeem
            </a>
            <a href="/eco-clubs" className="text-sm font-medium hover:text-primary transition-colors">
              Eco-Clubs
            </a>
            <a href="/ai-chat" className="text-sm font-medium hover:text-primary transition-colors">
              AI Chat
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-md">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold" data-testid="text-eco-points">1,250 pts</span>
            </div>
            <ThemeToggle />
            <Button size="sm" onClick={() => setProfileOpen(true)} data-testid="button-profile">
              Profile
            </Button>
          </div>
        </div>
      </header>

      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  );
}
