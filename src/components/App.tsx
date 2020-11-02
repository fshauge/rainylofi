import React, { useEffect, useState } from "react";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useYouTubePlayer } from "../hooks/useYouTubePlayer";
import { Range } from "./Range";

export default function App() {
  const [volumes, setVolumes] = useLocalStorage("volumes", {
    music: 25,
    rain: 25,
  });

  const music = useYouTubePlayer("7NOSDKb0HlU");
  const rain = useAudioPlayer();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    music.setVolume(volumes.music);
    rain.setVolume(volumes.rain);
  }, [volumes.music, volumes.rain, music, rain]);

  return (
    <div>
      {rain.paused && (
        <div>
          <button onClick={() => rain.player!.play()}>Play</button>
        </div>
      )}
      <div className="controls">
        <label>Music</label>
        <Range
          min={0}
          max={100}
          value={volumes.music}
          onChange={(music) => setVolumes((volumes) => ({ ...volumes, music }))}
        />
        <label>Rain</label>
        <Range
          min={0}
          max={100}
          value={volumes.rain}
          onChange={(rain) => setVolumes((volumes) => ({ ...volumes, rain }))}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={hidden}
            onChange={(e) => setHidden(e.currentTarget.checked)}
          />
          Hide players
        </label>
      </div>
      <div hidden={hidden}>
        <div ref={music.ref} />
        <audio ref={rain.ref} controls loop autoPlay>
          <source
            src="https://rainymood.com/audio1112/0.m4a"
            type="audio/mp4"
          />
          <source src="https://rainymood.com/track.ogg" type="audio/ogg" />
          <source src="https://rainymood.com/track.mp3" type="audio/mp3" />
        </audio>
      </div>
    </div>
  );
}
