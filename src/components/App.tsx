import React, { useEffect, useState } from "react";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useYouTubePlayer } from "../hooks/useYouTubePlayer";
import { Range } from "./Range";

export default function App() {
  const [volumes, setVolumes] = useLocalStorage("volumes", {
    music: 25,
    ambience: 25,
  });

  const music = useYouTubePlayer("7NOSDKb0HlU");
  const ambience = useAudioPlayer();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    music.setVolume(volumes.music);
    ambience.setVolume(volumes.ambience);
  }, [volumes.music, volumes.ambience, music, ambience]);

  return (
    <div>
      {ambience.paused && (
        <div>
          <button onClick={() => ambience.player!.play()}>Play</button>
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
        <label>Ambience</label>
        <Range
          min={0}
          max={100}
          value={volumes.ambience}
          onChange={(ambience) =>
            setVolumes((volumes) => ({ ...volumes, ambience }))
          }
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
        <audio ref={ambience.ref} controls autoPlay>
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
