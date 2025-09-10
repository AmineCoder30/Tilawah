import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import PrimaryTabNavigation from "../../components/ui/PrimaryTabNavigation";
import PersistentAudioPlayer from "../../components/ui/PersistentAudioPlayer";
import axios from "axios";

import SurahGrid from "./components/SurahGrid";
import PullToRefresh from "./components/PullToRefresh";
import Button from "../../components/ui/Button";

const SurahListing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [surahs, setSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [ayahRange, setAyahRange] = useState({ min: 1, max: 286 });
  const [selectedRiwayah, setSelectedRiwayah] = useState("all");
  const [favoritedSurahs, setFavoritedSurahs] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const gridRef = useRef(null);

  // Mock Surah data
  const mockSurahs = [
    {
      number: 1,
      arabicName: "الفاتحة",
      transliteration: "Al-Fatiha",
      translation: "The Opening",
      revelationPlace: "Makkah",
      versesCount: 7,
      riwayah: ["hafs", "warsh", "qalun"],
    },
    {
      number: 2,
      arabicName: "البقرة",
      transliteration: "Al-Baqarah",
      translation: "The Cow",
      revelationPlace: "Madinah",
      versesCount: 286,
      riwayah: ["hafs", "warsh", "qalun", "duri"],
    },
    {
      number: 3,
      arabicName: "آل عمران",
      transliteration: "Ali 'Imran",
      translation: "Family of Imran",
      revelationPlace: "Madinah",
      versesCount: 200,
      riwayah: ["hafs", "warsh", "qalun"],
    },
    {
      number: 4,
      arabicName: "النساء",
      transliteration: "An-Nisa",
      translation: "The Women",
      revelationPlace: "Madinah",
      versesCount: 176,
      riwayah: ["hafs", "warsh", "qalun", "duri"],
    },
    {
      number: 5,
      arabicName: "المائدة",
      transliteration: "Al-Ma'idah",
      translation: "The Table Spread",
      revelationPlace: "Madinah",
      versesCount: 120,
      riwayah: ["hafs", "warsh", "qalun"],
    },
    {
      number: 6,
      arabicName: "الأنعام",
      transliteration: "Al-An'am",
      translation: "The Cattle",
      revelationPlace: "Makkah",
      versesCount: 165,
      riwayah: ["hafs", "warsh", "qalun", "duri"],
    },
    {
      number: 7,
      arabicName: "الأعراف",
      transliteration: "Al-A'raf",
      translation: "The Heights",
      revelationPlace: "Makkah",
      versesCount: 206,
      riwayah: ["hafs", "warsh", "qalun"],
    },
    {
      number: 8,
      arabicName: "الأنفال",
      transliteration: "Al-Anfal",
      translation: "The Spoils of War",
      revelationPlace: "Madinah",
      versesCount: 75,
      riwayah: ["hafs", "warsh", "qalun", "duri"],
    },
    {
      number: 9,
      arabicName: "التوبة",
      transliteration: "At-Tawbah",
      translation: "The Repentance",
      revelationPlace: "Madinah",
      versesCount: 129,
      riwayah: ["hafs", "warsh", "qalun"],
    },
    {
      number: 10,
      arabicName: "يونس",
      transliteration: "Yunus",
      translation: "Jonah",
      revelationPlace: "Makkah",
      versesCount: 109,
      riwayah: ["hafs", "warsh", "qalun", "duri"],
    },
    {
      number: 11,
      arabicName: "هود",
      transliteration: "Hud",
      translation: "Hud",
      revelationPlace: "Makkah",
      versesCount: 123,
      riwayah: ["hafs", "warsh", "qalun"],
    },
    {
      number: 12,
      arabicName: "يوسف",
      transliteration: "Yusuf",
      translation: "Joseph",
      revelationPlace: "Makkah",
      versesCount: 111,
      riwayah: ["hafs", "warsh", "qalun", "duri"],
    },
  ];

  useEffect(() => {
    // Simulate API call
    const loadSurahs = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          "https://api.alquran.cloud/v1/quran/ar.warsh"
        );
        const fetchedSurahs = response.data.data.surahs;
        setSurahs(fetchedSurahs);
        setFilteredSurahs(fetchedSurahs);
      } catch (error) {
        console.error("Error fetching surahs:", error);
      } finally {
        setIsLoading(false);
      }

      setIsLoading(false);
    };

    loadSurahs();

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("quran-favorites");
    if (savedFavorites) {
      setFavoritedSurahs(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = surahs;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (surah) =>
          surah.transliteration
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          surah.arabicName.includes(searchQuery) ||
          surah.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          surah.number.toString().includes(searchQuery)
      );
    }

    // Ayah range filter
    filtered = filtered.filter(
      (surah) =>
        surah.versesCount >= ayahRange.min && surah.versesCount <= ayahRange.max
    );

    // Riwayah filter
    if (selectedRiwayah !== "all") {
      filtered = filtered.filter((surah) =>
        surah.riwayah.includes(selectedRiwayah)
      );
    }

    // Favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter((surah) =>
        favoritedSurahs.includes(surah.number)
      );
    }

    setFilteredSurahs(filtered);
  }, [
    surahs,
    searchQuery,
    ayahRange,
    selectedRiwayah,
    favoritedSurahs,
    showFavoritesOnly,
  ]);

  const handleToggleFavorite = (surahNumber) => {
    const newFavorites = favoritedSurahs.includes(surahNumber)
      ? favoritedSurahs.filter((id) => id !== surahNumber)
      : [...favoritedSurahs, surahNumber];

    setFavoritedSurahs(newFavorites);
    localStorage.setItem("quran-favorites", JSON.stringify(newFavorites));
  };

  const handleJumpToSurah = (surahNumber) => {
    const element = document.querySelector(
      `[data-surah-number="${surahNumber}"]`
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // In real app, this would refetch data
    return Promise.resolve();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PrimaryTabNavigation />

      <main className="pb-20 lg:pb-8">
        {/* Page Header */}
        <div className="px-4 lg:px-6 py-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
                Quran Surahs
              </h1>
              <p className="text-text-secondary font-body">
                Browse and discover the 114 chapters of the Holy Quran
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <Button
                variant={showFavoritesOnly ? "primary" : "ghost"}
                size="sm"
                iconName="Heart"
                iconPosition="left"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              >
                {isMobile ? "" : "Favorites"}
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 lg:px-6 py-6">
          <PullToRefresh onRefresh={handleRefresh}>
            <div ref={gridRef}>
              <SurahGrid
                surahs={surahs}
                favoritedSurahs={favoritedSurahs}
                onToggleFavorite={handleToggleFavorite}
                isLoading={isLoading}
              />
            </div>
          </PullToRefresh>
        </div>
      </main>

      <PersistentAudioPlayer />
    </div>
  );
};

export default SurahListing;
