import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import PersistentAudioPlayer from '../../components/ui/PersistentAudioPlayer';
import SearchHeader from './components/SearchHeader';
import SearchFilters from './components/SearchFilters';
import SearchResultsContent from './components/SearchResultsContent';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [results, setResults] = useState({
    surahs: [],
    ayahs: [],
    reciters: [],
    translations: []
  });
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  const searchQuery = searchParams.get('q') || '';
  const contentType = searchParams.get('type') || 'all';
  const revelation = searchParams.get('revelation') || 'all';
  const length = searchParams.get('length') || 'all';
  const riwayah = searchParams.get('riwayah') || 'hafs';

  // Mock data for search results
  const mockSurahs = [
    {
      id: 1,
      number: 1,
      englishName: "Al-Fatiha",
      arabicName: "الفاتحة",
      translation: "The Opening - The first chapter of the Quran, recited in every prayer",
      revelationType: "Meccan",
      ayahCount: 7,
      duration: "1:30",
      matchContext: "Surah name and translation"
    },
    {
      id: 2,
      number: 2,
      englishName: "Al-Baqarah",
      arabicName: "البقرة",
      translation: "The Cow - The longest chapter containing guidance for the Muslim community",
      revelationType: "Medinan",
      ayahCount: 286,
      duration: "2:30:45",
      matchContext: "Surah name"
    },
    {
      id: 36,
      number: 36,
      englishName: "Ya-Sin",
      arabicName: "يس",
      translation: "Ya-Sin - Often called the heart of the Quran",
      revelationType: "Meccan",
      ayahCount: 83,
      duration: "25:30",
      matchContext: "Surah name and description"
    }
  ];

  const mockAyahs = [
    {
      surahId: 2,
      surahName: "Al-Baqarah",
      number: 255,
      arabicText: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
      translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.",
      revelationType: "Medinan",
      matchType: "Arabic text",
      relevanceScore: 0.95,
      contextPreview: "Known as Ayat al-Kursi, one of the most powerful verses"
    },
    {
      surahId: 1,
      surahName: "Al-Fatiha",
      number: 1,
      arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      revelationType: "Meccan",
      matchType: "Translation",
      relevanceScore: 0.88,
      contextPreview: "The opening verse of the Quran"
    }
  ];

  const mockReciters = [
    {
      id: 1,
      name: "Abdul Basit Abdul Samad",
      arabicName: "عبد الباسط عبد الصمد",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      country: "Egypt",
      riwayah: "Hafs an Asim",
      rating: 4.9,
      description: "One of the most renowned Quran reciters known for his beautiful and melodious voice",
      availableSurahs: 114,
      isPopular: true,
      isNew: false,
      matchContext: "Reciter name"
    },
    {
      id: 2,
      name: "Mishary Rashid Alafasy",
      arabicName: "مشاري راشد العفاسي",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      country: "Kuwait",
      riwayah: "Hafs an Asim",
      rating: 4.8,
      description: "Contemporary reciter known for his clear pronunciation and beautiful recitation style",
      availableSurahs: 114,
      isPopular: true,
      isNew: false,
      matchContext: "Reciter name and description"
    }
  ];

  const mockTranslations = [
    {
      surahName: "Al-Baqarah",
      ayahNumber: 255,
      text: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence...",
      translator: "Sahih International"
    }
  ];

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    } else {
      setResults({ surahs: [], ayahs: [], reciters: [], translations: [] });
    }
  }, [searchQuery, contentType, revelation, length, riwayah]);

  const performSearch = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Filter results based on search query and filters
      let filteredSurahs = mockSurahs.filter(surah => 
        surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.arabicName.includes(searchQuery) ||
        surah.translation.toLowerCase().includes(searchQuery.toLowerCase())
      );

      let filteredAyahs = mockAyahs.filter(ayah =>
        ayah.arabicText.includes(searchQuery) ||
        ayah.translation.toLowerCase().includes(searchQuery.toLowerCase())
      );

      let filteredReciters = mockReciters.filter(reciter =>
        reciter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reciter.arabicName.includes(searchQuery) ||
        reciter.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      let filteredTranslations = mockTranslations.filter(translation =>
        translation.text.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Apply content type filter
      if (contentType !== 'all') {
        if (contentType !== 'surah') filteredSurahs = [];
        if (contentType !== 'ayah') filteredAyahs = [];
        if (contentType !== 'reciter') filteredReciters = [];
        if (contentType !== 'translation') filteredTranslations = [];
      }

      // Apply revelation filter
      if (revelation !== 'all') {
        filteredSurahs = filteredSurahs.filter(surah => 
          surah.revelationType.toLowerCase() === revelation.toLowerCase()
        );
        filteredAyahs = filteredAyahs.filter(ayah => 
          ayah.revelationType.toLowerCase() === revelation.toLowerCase()
        );
      }

      // Apply length filter
      if (length !== 'all') {
        filteredSurahs = filteredSurahs.filter(surah => {
          if (length === 'short') return surah.ayahCount <= 20;
          if (length === 'medium') return surah.ayahCount > 20 && surah.ayahCount <= 100;
          if (length === 'long') return surah.ayahCount > 100;
          return true;
        });
      }

      setResults({
        surahs: filteredSurahs,
        ayahs: filteredAyahs,
        reciters: filteredReciters,
        translations: filteredTranslations
      });

      setHasMore(false); // For demo, no pagination
      setPage(1);
    } catch (error) {
      console.error('Search error:', error);
      setResults({ surahs: [], ayahs: [], reciters: [], translations: [] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    // In real app, load more results
  };

  const getTotalResultCount = () => {
    const { surahs, ayahs, reciters, translations } = results;
    return surahs.length + ayahs.length + reciters.length + translations.length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PrimaryTabNavigation />
      
      <main className="pb-20 lg:pb-8">
        <SearchHeader
          onFilterToggle={() => setIsFiltersOpen(true)}
          resultCount={getTotalResultCount()}
          isLoading={isLoading}
        />

        <div className={`max-w-7xl mx-auto px-4 lg:px-6 py-6 transition-all duration-300 ${
          isFiltersOpen ? 'lg:mr-80' : ''
        }`}>
          <SearchResultsContent
            searchQuery={searchQuery}
            isLoading={isLoading}
            results={results}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
          />
        </div>
      </main>

      <SearchFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
      />

      <PersistentAudioPlayer />
    </div>
  );
};

export default SearchResults;