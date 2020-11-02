import { useEffect, useRef, useState } from "react";

export const useYouTubePlayer = (videoId: string) => {
  const ref = useRef(null);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const {
      YT: { Player },
    } = window as any;

    const player = new Player(ref.current, {
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
  }, [videoId]);

  return {
    ref,
    player,
    setVolume: (volume: number) => {
      if (player !== null) {
        player.setVolume(volume);
      }
    },
  };
};
