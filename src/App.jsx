import React from "react";
import Routes from "./Routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AudioPlayerProvider } from "./contexts/AudioPlayerContext";

function App() {
  return (
    <ThemeProvider>
      <AudioPlayerProvider>
        <Routes />
      </AudioPlayerProvider>
    </ThemeProvider>
  );
}

export default App;
