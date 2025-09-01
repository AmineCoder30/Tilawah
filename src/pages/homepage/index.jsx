import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import PrimaryTabNavigation from "../../components/ui/PrimaryTabNavigation";
import PersistentAudioPlayer from "../../components/ui/PersistentAudioPlayer";
import HeroSection from "./components/HeroSection";
import RiwayahFilters from "./components/RiwayahFilters";
import FeatureCards from "./components/FeatureCards";
import RecentSurahs from "./components/RecentSurahs";
import FeaturedReciterCard from "./components/FeaturedReciterCard";
import QuickStats from "./components/QuickStats";

const Homepage = () => {
  const navigate = useNavigate();
  const [activeRiwayah, setActiveRiwayah] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [lastReadingSurah, setLastReadingSurah] = useState(null);
  const [recentSurahs, setRecentSurahs] = useState([]);
  const [featuredReciter, setFeaturedReciter] = useState(null);
  const [stats, setStats] = useState({
    totalSurahs: 114,
    totalAyahs: 6236,
    totalReciters: 25,
    readingProgress: 0,
  });

  // Mock data
  const mockLastReading = {
    id: 2,
    name: "Al-Baqarah",
    arabicName: "البقرة",
    ayah: 45,
    progress: 18,
  };

  const mockRecentSurahs = [
    {
      id: 1,
      number: 1,
      englishName: "Al-Fatiha",
      arabicName: "الفاتحة",
      ayahCount: 7,
      lastRead: "2 hours ago",
      progress: 100,
    },
    {
      id: 2,
      number: 2,
      englishName: "Al-Baqarah",
      arabicName: "البقرة",
      ayahCount: 286,
      lastRead: "1 day ago",
      progress: 18,
    },
    {
      id: 36,
      number: 36,
      englishName: "Ya-Sin",
      arabicName: "يس",
      ayahCount: 83,
      lastRead: "3 days ago",
      progress: 65,
    },
    {
      id: 18,
      number: 18,
      englishName: "Al-Kahf",
      arabicName: "الكهف",
      ayahCount: 110,
      lastRead: "1 week ago",
      progress: 45,
    },
  ];

  const mockFeaturedReciter = {
    id: "abdul-basit",
    name: "Abdul Basit Abdul Samad",
    arabicName: "عبد الباسط عبد الصمد",
    description:
      "One of the most beloved and renowned Qaris of the modern era, known for his melodious and emotionally moving recitations.",
    specialties: ["Hafs", "Warsh", "Tajweed Master"],
    totalRecitations: 114,
    riwayahMethods: ["Hafs", "Warsh"],
    rating: 4.9,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  };

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);

      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Load user's last reading position from localStorage
      const savedReading = localStorage.getItem("lastReadingPosition");
      if (savedReading) {
        setLastReadingSurah(JSON.parse(savedReading));
      } else {
        setLastReadingSurah(mockLastReading);
      }

      // Load recent surahs
      const savedRecent = localStorage.getItem("recentSurahs");
      if (savedRecent) {
        setRecentSurahs(JSON.parse(savedRecent));
      } else {
        setRecentSurahs(mockRecentSurahs);
      }

      // Set featured reciter
      setFeaturedReciter(mockFeaturedReciter);

      // Calculate reading progress
      const progress = Math.floor(Math.random() * 30) + 5; // Mock progress 5-35%
      setStats((prev) => ({ ...prev, readingProgress: progress }));

      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleBrowseClick = () => {
    navigate("/surah-listing");
  };

  const handleContinueReading = () => {
    if (lastReadingSurah) {
      navigate(
        `/surah-detail?id=${lastReadingSurah.id}&ayah=${lastReadingSurah.ayah}`
      );
    } else {
      navigate("/surah-listing");
    }
  };

  const handleFeaturedReciter = () => {
    navigate("/audio-player-interface");
  };

  const handleRiwayahChange = (riwayah) => {
    setActiveRiwayah(riwayah);
    // In a real app, this would update the global context/state
    localStorage.setItem("selectedRiwayah", riwayah);
  };

  const handleSurahClick = (surah) => {
    navigate(`/surah-detail?id=${surah.id}`);
  };

  const handlePlaySample = (reciter) => {
    // In a real app, this would start playing a sample recitation
    navigate("/audio-player-interface");
  };

  const handleViewProfile = (reciter) => {
    navigate(`/settings-preferences?tab=reciters&reciter=${reciter.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <PrimaryTabNavigation />

        <main className="pt-32 lg:pt-40 pb-20 lg:pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Loading Skeleton */}
            <div className="animate-pulse">
              <div className="text-center px-4 py-8 lg:py-12">
                <div className="h-6 bg-surface rounded w-64 mx-auto mb-4"></div>
                <div className="h-4 bg-surface rounded w-48 mx-auto mb-8"></div>
                <div className="h-12 bg-surface rounded w-80 mx-auto mb-4"></div>
                <div className="h-8 bg-surface rounded w-64 mx-auto mb-8"></div>
                <div className="flex gap-4 justify-center">
                  <div className="h-12 bg-surface rounded w-40"></div>
                  <div className="h-12 bg-surface rounded w-40"></div>
                </div>
              </div>

              <div className="px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-surface rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <PersistentAudioPlayer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PrimaryTabNavigation />

      <main className="pt-32 lg:pt-40 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <HeroSection
            onBrowseClick={handleBrowseClick}
            onContinueReading={handleContinueReading}
            lastReadingSurah={lastReadingSurah}
          />

          {/* Riwayah Filters */}
          <div className="px-4 mb-8">
            <RiwayahFilters
              activeRiwayah={activeRiwayah}
              onRiwayahChange={handleRiwayahChange}
            />
          </div>

          {/* Feature Cards */}
          <FeatureCards
            onBrowseClick={handleBrowseClick}
            onContinueReading={handleContinueReading}
            onFeaturedReciter={handleFeaturedReciter}
            lastReadingSurah={lastReadingSurah}
            featuredReciter={featuredReciter}
          />

          {/* Quick Stats */}
          <QuickStats stats={stats} />

          {/* Recent Surahs */}
          <RecentSurahs
            recentSurahs={recentSurahs}
            onSurahClick={handleSurahClick}
          />

          {/* Featured Reciter */}
          {featuredReciter && (
            <FeaturedReciterCard
              reciter={featuredReciter}
              onPlaySample={handlePlaySample}
              onViewProfile={handleViewProfile}
            />
          )}

          {/* Islamic Pattern Decoration */}
          <div className="px-4 py-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center items-center space-x-2 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-4 h-0.5 bg-primary"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-primary"></div>
              </div>
              <p className="text-sm text-text-secondary italic">
                "And We have certainly made the Quran easy for remembrance, so
                is there any who will remember?"
              </p>
              <p className="text-xs text-text-tertiary mt-2">- Quran 54:17</p>
            </div>
          </div>
        </div>
      </main>

      <PersistentAudioPlayer />
    </div>
  );
};

export default Homepage;
