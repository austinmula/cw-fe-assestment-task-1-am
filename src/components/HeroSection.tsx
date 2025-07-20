import { SearchInput } from "./SearchInput";
import { memo, useCallback } from "react";

export const HeroSection = memo(function HeroSection() {
  const onSearch = useCallback((search: string) => {
    console.log(search);
    // implementing the search logic is not required for this task
  }, []);

  return (
    <section 
      className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden mt-8"
      role="banner"
      aria-labelledby="hero-title"
    >
      <img 
        src="/task1/hero-bg.webp" 
        className="w-full h-96 object-cover"
        alt="Dictionary search background"
        role="img"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center px-4">
        <h1 
          id="hero-title"
          className="text-3xl md:text-5xl font-bold text-white max-w-2xl"
        >
          Search for words, phrases and meanings
        </h1>
        <SearchInput 
          initialValue="" 
          onSearch={onSearch}
          ariaLabel="Main dictionary search"
          placeholder="Type to search..."
        />
      </div>
    </section>
  );
});
