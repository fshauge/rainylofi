import { useEffect, useRef, useState } from "react";
import { Player, PlayerPromise } from "../providers/youtube";

export const useYouTubePlayer = (videoId: string) => {
  const ref = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const execute = async () => {
      const Player = await PlayerPromise;
      const player = new Player(ref.current!, {
        width: 640,
        height: 390,
        videoId,
        events: {
          onReady: () => {
            player.playVideo();
            setPlayer(player);
          },
        },
      });
    };

    execute();
  }, [videoId]);

  return {
    ref,
    player,
    setVolume: (volume: number) => {
      player?.setVolume(volume);
    },
  };
};
