import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TagList } from "@/components/TagList";
import { useCallback } from "react";

// Move static data outside component to prevent recreation on every render
const TRENDING_TAGS = [
  "NFT",
  "Metaverse", 
  "Sustainable",
  "Sonder",
  "FOMO",
  "Ghosting",
] as const;

const PERSONALIZED_TAGS = [
  "Blockchain",
  "Cryptocurrency",
  "Web3", 
  "DeFi",
  "AI",
  "Machine Learning",
  "DevOps",
  "TypeScript"
] as const;

export default function App() {
  const handleTagClick = useCallback((tag: string) => {
    console.log(`Tag clicked: ${tag}`);
    // Implement tag search functionality here
  }, []);

  return (
    <>
      {/* Skip navigation links for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      
      <div className="bg-black min-h-screen text-white">
        <Header />
        
        <main id="main-content" role="main" className="focus:outline-none" tabIndex={-1}>
          <HeroSection />
          
          <div className="px-6 py-8 space-y-8">
            <TagList 
              title="Trending" 
              tags={TRENDING_TAGS} 
              onTagClick={handleTagClick}
              variant="default"
              size="md"
              clickable={true}
              ariaLabel="Trending dictionary terms"
            />
            
            <TagList 
              title="For you" 
              tags={PERSONALIZED_TAGS} 
              onTagClick={handleTagClick}
              variant="outline"
              size="sm"
              maxItems={5}
              showMoreText="View all..."
              clickable={true}
              ariaLabel="Personalized dictionary terms"
            />
          </div>
        </main>
      </div>
    </>
  );
}
