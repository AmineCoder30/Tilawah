import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import PrimaryTabNavigation from "../../components/ui/PrimaryTabNavigation";
import PersistentAudioPlayer from "../../components/ui/PersistentAudioPlayer";
import SurahHeader from "./components/SurahHeader";
import AyahCard from "./components/AyahCard";
import ReciterSelectionPanel from "./components/ReciterSelectionPanel";
import FloatingActionButton from "./components/FloatingActionButton";
import ReadingControls from "./components/ReadingControls";
import SurahInfoSidebar from "./components/SurahInfoSidebar";
import axios from "axios";
import { useAudioPlayer } from "contexts/AudioPlayerContext";

import { set } from "date-fns";

const SurahDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentAyah, setCurrentAyah] = useState(1);
  const [playingAyah, setPlayingAyah] = useState(null);
  const [loadingAyah, setLoadingAyah] = useState(null);
  const [isReciterPanelOpen, setIsReciterPanelOpen] = useState(false);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState([]);
  const [bookmarkedSurah, setBookmarkedSurah] = useState(false);
  const [fontSize, setFontSize] = useState("base");
  const [showArabicNumbers, setShowArabicNumbers] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [playbackMode, setPlaybackMode] = useState("individual");
  const [selectedRiwayah, setSelectedRiwayah] = useState(1);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [surahDetails, setSurahDetails] = useState(null);
  const [ayahs, setAyahs] = useState([]);

  const {
    currentReciter,
    setCurrentRiwayah,
    setCurrentReciter,

    setCurrentSurah,
  } = useAudioPlayer();

  const mainContentRef = useRef(null);
  const ayahRefs = useRef({});

  // ...existing code...

  // Mock default reciter
  const defaultReciter = {
    id: 1,
    name: "إبراهيم الأخضر",
    letter: "إ",
    date: "2025-05-01T21:47:54.000000Z",
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server6.mp3quran.net/akdr/",
        surah_total: 114,
        moshaf_type: 11,
        surah_list:
          "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114",
      },
    ],
  };

  //call api and fetch surah details
  useEffect(() => {
    const fetchSurahDetails = async () => {
      try {
        // You may want to get surah number from route params or searchParams

        const surahNumber = parseInt(searchParams.get("id")) || 1;
        setCurrentSurah(surahNumber);
        const response = await axios.get(
          `https://api.alquran.cloud/v1/surah/${surahNumber}`
        );
        const surahData = response.data.data;
        console.log("Fetched Surah Details:", surahData);
        setSurahDetails(surahData);
        setAyahs(surahData.ayahs);
      } catch (error) {
        console.error("Error fetching surah details:", error);
      }
    };

    fetchSurahDetails();
  }, []);

  // Initialize selected reciter
  useEffect(() => {
    if (!currentReciter) {
      setCurrentReciter(defaultReciter);
    }
  }, [currentReciter]);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedFontSize = localStorage.getItem("quran-font-size");
    const savedArabicNumbers = localStorage.getItem("quran-arabic-numbers");
    const savedDarkMode = localStorage.getItem("quran-dark-mode");
    const savedPlaybackMode = localStorage.getItem("quran-playback-mode");
    const savedRiwayah = localStorage.getItem("quran-riwayah");
    const savedBookmarks = localStorage.getItem("quran-bookmarked-ayahs");
    const savedSurahBookmark = localStorage.getItem("quran-bookmarked-surah");
    // Use surahDetails?.number for scroll position if available
    const surahNum = surahDetails?.number || 1;
    const savedScrollPosition = localStorage.getItem(
      `quran-scroll-position-${surahNum}`
    );

    if (savedFontSize) setFontSize(savedFontSize);
    if (savedArabicNumbers)
      setShowArabicNumbers(JSON.parse(savedArabicNumbers));
    if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));
    if (savedPlaybackMode) setPlaybackMode(savedPlaybackMode);
    if (savedRiwayah) setSelectedRiwayah(savedRiwayah);
    if (savedBookmarks) setBookmarkedAyahs(JSON.parse(savedBookmarks));
    if (savedSurahBookmark) setBookmarkedSurah(JSON.parse(savedSurahBookmark));
    if (savedScrollPosition) setScrollPosition(parseInt(savedScrollPosition));
  }, [surahDetails]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("quran-font-size", fontSize);
    localStorage.setItem(
      "quran-arabic-numbers",
      JSON.stringify(showArabicNumbers)
    );
    localStorage.setItem("quran-dark-mode", JSON.stringify(isDarkMode));
    localStorage.setItem("quran-playback-mode", playbackMode);
    localStorage.setItem("quran-riwayah", selectedRiwayah);
    localStorage.setItem(
      "quran-bookmarked-ayahs",
      JSON.stringify(bookmarkedAyahs)
    );
    localStorage.setItem(
      "quran-bookmarked-surah",
      JSON.stringify(bookmarkedSurah)
    );
  }, [
    fontSize,
    showArabicNumbers,
    isDarkMode,
    playbackMode,
    selectedRiwayah,
    bookmarkedAyahs,
    bookmarkedSurah,
  ]);

  // Handle scroll position saving
  useEffect(() => {
    const surahNum = surahDetails?.number || 1;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      localStorage.setItem(
        `quran-scroll-position-${surahNum}`,
        scrollY.toString()
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [surahDetails]);

  // Restore scroll position
  useEffect(() => {
    if (scrollPosition > 0) {
      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 100);
    }
  }, [scrollPosition]);

  // Handle ayah navigation from URL params
  useEffect(() => {
    const ayahParam = searchParams.get("ayah");
    if (ayahParam && ayahs.length > 0) {
      const ayahNumber = parseInt(ayahParam);
      if (ayahNumber >= 1 && ayahNumber <= ayahs.length) {
        setCurrentAyah(ayahNumber);
        setTimeout(() => {
          scrollToAyah(ayahNumber);
        }, 500);
      }
    }
  }, [searchParams, ayahs]);

  const scrollToAyah = (ayahNumber) => {
    const ayahElement = ayahRefs.current[ayahNumber];
    if (ayahElement) {
      ayahElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleAyahPlayPause = (ayahNumber) => {
    if (playingAyah === ayahNumber) {
      setPlayingAyah(null);
    } else {
      setLoadingAyah(ayahNumber);
      // Simulate audio loading
      setTimeout(() => {
        setLoadingAyah(null);
        setPlayingAyah(ayahNumber);
        setCurrentAyah(ayahNumber);
      }, 1000);
    }
  };

  const handleAyahBookmark = (ayahNumber) => {
    setBookmarkedAyahs((prev) => {
      if (prev.includes(ayahNumber)) {
        return prev.filter((num) => num !== ayahNumber);
      } else {
        return [...prev, ayahNumber];
      }
    });
  };

  const handleSurahBookmark = () => {
    setBookmarkedSurah(!bookmarkedSurah);
  };

  const handleReciterChange = (reciter) => {
    setCurrentReciter(reciter);
    setIsReciterPanelOpen(false);
    console.log("Selected Reciter:", currentReciter);
    // Reset playing state when reciter changes
    setPlayingAyah(null);
  };

  const handleRiwayahChange = (riwayah) => {
    setCurrentRiwayah(riwayah);
    // Reset playing state when riwayah changes
    setPlayingAyah(null);
  };

  const handlePlaybackModeChange = (mode) => {
    setPlaybackMode(mode);
    setPlayingAyah(null);
  };

  const handleBookmarkPosition = () => {
    const currentScrollY = window.scrollY;
    localStorage.setItem(
      `quran-bookmark-position-${mockSurah.number}`,
      currentScrollY.toString()
    );
    // Show success feedback (could be a toast notification)
    console.log("Position bookmarked");
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookmarkClick = (ayahNumber) => {
    scrollToAyah(ayahNumber);
    setCurrentAyah(ayahNumber);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""} bg-background`}>
      <Header />
      <PrimaryTabNavigation />

      <div className="flex">
        {/* Desktop Sidebar */}
        {surahDetails && (
          <SurahInfoSidebar
            surah={surahDetails}
            currentReciter={currentReciter}
            onReciterPanelOpen={() => setIsReciterPanelOpen(true)}
            playbackMode={playbackMode}
            onPlaybackModeChange={handlePlaybackModeChange}
            bookmarkedAyahs={bookmarkedAyahs}
            onBookmarkClick={handleBookmarkClick}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {surahDetails && (
            <SurahHeader
              surah={surahDetails}
              currentAyah={currentAyah}
              totalAyahs={ayahs.length}
              onBookmark={handleSurahBookmark}
              isBookmarked={bookmarkedSurah}
            />
          )}

          <ReadingControls
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
            showArabicNumbers={showArabicNumbers}
            onArabicNumbersToggle={() =>
              setShowArabicNumbers(!showArabicNumbers)
            }
            isDarkMode={isDarkMode}
            onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
          />

          <main
            ref={mainContentRef}
            className="px-4 lg:px-6 py-6 pb-32 lg:pb-6"
          >
            <div className="max-w-4xl mx-auto space-y-6">
              {ayahs.map((ayah, index) => (
                <div
                  key={ayah.number}
                  ref={(el) => (ayahRefs.current[ayah.number] = el)}
                >
                  <AyahCard
                    ayah={ayah}
                    index={index}
                    isPlaying={playingAyah === ayah.number}
                    isLoading={loadingAyah === ayah.number}
                    onPlayPause={() => handleAyahPlayPause(ayah.number)}
                    onBookmark={() => handleAyahBookmark(ayah.number)}
                    isBookmarked={bookmarkedAyahs.includes(ayah.number)}
                    showArabicNumbers={showArabicNumbers}
                    fontSize={fontSize}
                  />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onPlaybackModeChange={handlePlaybackModeChange}
        currentPlaybackMode={playbackMode}
        onReciterPanelOpen={() => setIsReciterPanelOpen(true)}
        onBookmarkPosition={handleBookmarkPosition}
        onScrollToTop={handleScrollToTop}
      />

      {/* Reciter Selection Panel */}
      <ReciterSelectionPanel
        isOpen={isReciterPanelOpen}
        onClose={() => setIsReciterPanelOpen(false)}
        currentReciter={currentReciter}
        onReciterChange={handleReciterChange}
        selectedRiwayah={selectedRiwayah}
        onRiwayahChange={handleRiwayahChange}
      />

      {/* Persistent Audio Player */}
      <PersistentAudioPlayer />
    </div>
  );
};

export default SurahDetail;
