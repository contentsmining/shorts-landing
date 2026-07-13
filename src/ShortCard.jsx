import { useEffect, useRef, useState } from 'react';

let apiPromise = null;
function loadYoutubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve(window.YT);
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  });
  return apiPromise;
}

const MAX_CONCURRENT_PLAYERS = 10;
let activePlayerCount = 0;

function ShortCard({ card }) {
  const containerRef = useRef(null);
  const playerElRef = useRef(null);
  const playerRef = useRef(null);
  const progressTimerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '200px 0px', threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !card.videoId || playerRef.current) return undefined;
    if (activePlayerCount >= MAX_CONCURRENT_PLAYERS) return undefined;

    let cancelled = false;
    activePlayerCount += 1;

    loadYoutubeApi().then((YT) => {
      if (cancelled || !playerElRef.current) {
        activePlayerCount -= 1;
        return;
      }

      playerRef.current = new YT.Player(playerElRef.current, {
        videoId: card.videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          playsinline: 1,
          loop: 1,
          playlist: card.videoId,
          modestbranding: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
            setIsReady(true);

            progressTimerRef.current = window.setInterval(() => {
              const player = playerRef.current;
              if (!player || typeof player.getDuration !== 'function') return;
              const duration = player.getDuration();
              const current = player.getCurrentTime();
              if (duration > 0) {
                setProgress(Math.min(100, (current / duration) * 100));
              }
            }, 200);
          },
          onStateChange: (event) => {
            const state = event.data;
            if (
              state === window.YT.PlayerState.CUED ||
              state === window.YT.PlayerState.PAUSED ||
              state === window.YT.PlayerState.UNSTARTED
            ) {
              event.target.mute();
              event.target.playVideo();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (progressTimerRef.current) {
        window.clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      if (playerRef.current) {
        playerRef.current.destroy?.();
        playerRef.current = null;
        activePlayerCount -= 1;
      }
      setIsReady(false);
      setProgress(0);
    };
  }, [isVisible, card.videoId]);

  return (
    <div
      ref={containerRef}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-card backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-pink-500/30"
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-slate-900">
        <img
          src={card.image}
          alt={card.title}
          className={`absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
            isReady ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div
          className={`pointer-events-none absolute inset-0 scale-[1.4] [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full ${
            isReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div ref={playerElRef} className="h-full w-full" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
          <div
            className="h-full bg-white/40 transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <a
        href={card.href}
        target="_blank"
        rel="noreferrer"
        className="block px-4 py-3 text-white transition-colors hover:text-pink-200"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
          {card.subtitle}
        </p>
        <p className="mt-0 text-base font-bold">{card.title}</p>
      </a>
    </div>
  );
}

export default ShortCard;
