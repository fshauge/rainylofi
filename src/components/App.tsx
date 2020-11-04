import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Range } from "./Range";

export default function App() {
  const [volumes, setVolumes] = useLocalStorage("volumes", {
    main: 50,
    music: 50,
    rain: 50,
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
        <label>Main</label>
        <Range
          min={0}
          max={100}
          value={volumes.main}
          onChange={(main) => setVolumes((volumes) => ({ ...volumes, main }))}
        />
        <div />
        <label>Music</label>
        <Range
          min={0}
          max={100}
          value={volumes.music}
          onChange={(music) => setVolumes((volumes) => ({ ...volumes, music }))}
        />
        <div>
          (<a href="https://www.youtube.com/watch?v=7NOSDKb0HlU">source</a>)
        </div>
        <label>Rain</label>
        <Range
          min={0}
          max={100}
          value={volumes.rain}
          onChange={(rain) => setVolumes((volumes) => ({ ...volumes, rain }))}
        />
        <div>
          (<a href="https://rainymood.com/">source</a>)
        </div>
      </div>
      <div hidden>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=7NOSDKb0HlU"
          volume={(volumes.music / 100) * (volumes.main / 100)}
          playing={playing}
          controls
          loop
        />
        <ReactPlayer
          url="https://rainymood.com/audio1112/0.m4a"
          volume={(volumes.rain / 100) * (volumes.main / 100)}
          playing={playing}
          controls
          loop
        />
      </div>
    </div>
  );
}
