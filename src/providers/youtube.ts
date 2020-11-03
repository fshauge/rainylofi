declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: any;
  }
}

interface PlayerOptions {
  width: number;
  height: number;
  videoId: string;
  events: {
    onReady: () => void;
  };
}

export interface Player {
  new (element: HTMLElement, options: PlayerOptions): Player;
  playVideo(): void;
  setVolume(volume: number): void;
}

const loadPlayer = () => {
  const promise = new Promise<Player>((resolve) => {
    window.onYouTubeIframeAPIReady = () => {
      resolve(window.YT.Player);
      delete window.onYouTubeIframeAPIReady;
    };
  });

  const script = document.createElement("script");
  script.src = "https://www.youtube.com/iframe_api";
  document.body.append(script);

  return promise;
};

export const PlayerPromise = loadPlayer();
