import { SocialMediaCard } from "@/components/main/social-media-card";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
      <main className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SocialMediaCard
            imageUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            caption="Just wow! 🌄"
            likes={342}
            comments={12}
          />

          <SocialMediaCard
            imageUrl="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80"
            caption="Exploring the serene beauty of nature through my lens. Every moment captured tells a story of tranquility and wonder. 📸✨"
            likes={12847}
            comments={523}
            scheduledDate={new Date("2025-11-15T14:30:00")}
          />

          <SocialMediaCard
            imageUrl="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
            caption="Adventures in the wilderness! There's something incredibly humbling about standing in the middle of a forest, surrounded by towering trees and the sounds of nature. This journey has taught me to slow down, breathe deeply, and appreciate the simple beauty that exists all around us. Who else finds peace in nature? 🌲🏞️"
            likes={1547892}
            comments={28934}
            scheduledDate={new Date("2025-12-01T09:00:00")}
          />
        </div>
      </main>
    </div>
  );
}
