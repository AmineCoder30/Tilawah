import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
// Add your imports here
import Homepage from "./pages/homepage";
import SurahListing from "./pages/surah-listing";
import AudioPlayerInterface from "./pages/audio-player-interface";
import SurahDetail from "./pages/surah-detail";
import SettingsPreferences from "./pages/settings-preferences";
import SearchResults from "./pages/search-results";
import NotFound from "./pages/NotFound";
import { SettingsProvider } from "./contexts/SettingsContext";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <SettingsProvider>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your routes here */}
            <Route path="/" element={<Homepage />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/surah-listing" element={<SurahListing />} />
            <Route
              path="/audio-player-interface"
              element={<AudioPlayerInterface />}
            />
            <Route path="/surah-detail" element={<SurahDetail />} />
            <Route
              path="/settings-preferences"
              element={<SettingsPreferences />}
            />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </SettingsProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
