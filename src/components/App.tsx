import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Range } from "./Range";

export default function App() {
  const [volumes, setVolumes] = useLocalStorage("volumes", {
    music: 25,
    rain: 25,
  });

  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <div>
        <button onClick={() => setPlaying((playing) => !playing)}>
          {playing ? "Pause" : "Play"}
        </button>
      </div>
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
      <div hidden>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=7NOSDKb0HlU"
          volume={volumes.music / 100}
          playing={playing}
          controls
          loop
        />
        <ReactPlayer
          url="https://rainymood.com/audio1112/0.m4a"
          volume={volumes.rain / 100}
          playing={playing}
          controls
          loop
        />
      </div>
    </div>
  );
}
