import { useEffect, useRef, useState } from "react";

export const useAudioPlayer = () => {
  const ref = useRef<HTMLAudioElement>(null);
  const player = ref.current;
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (player !== null) {
      player.addEventListener("play", () => {
        setPaused(false);
      });

      if (player.paused) {
        setPaused(true);
      }
    }
  }, [player]);

  return {
    ref,
    player,
    paused,
    setVolume: (volume: number) => {
      if (player !== null) {
        player.volume = volume / 100;
      }
    },
  };
};
