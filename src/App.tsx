import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TagList } from "@/components/TagList";

export default function App() {
  const trendingTags: string[] = [
    "NFT",
    "Metaverse",
    "Sustainable",
    "Sonder",
    "FOMO",
    "Ghosting",
  ];

  const personalizedTags: string[] = [
    "Blockchain",
    "Cryptocurrency",
    "Web3",
    "DeFi",
    "AI",
    "Machine Learning",
    "DevOps",
    "TypeScript"
  ];

  const handleTagClick = (tag: string) => {
    console.log(`Tag clicked: ${tag}`);
    // Implement tag search functionality here
  };

  return (
    <main className="bg-black min-h-screen text-white">
      <Header />
      <HeroSection />
      <TagList 
        title="Trending" 
        tags={trendingTags} 
        onTagClick={handleTagClick}
        variant="default"
        size="md"
      />
      <TagList 
        title="For you" 
        tags={personalizedTags} 
        onTagClick={handleTagClick}
        variant="outline"
        size="sm"
        maxItems={5}
        showMoreText="View all..."
      />
    </main>
  );
}
