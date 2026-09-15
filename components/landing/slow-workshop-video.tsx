"use client";

import Image from "next/image";
import { useState } from "react";

interface SlowWorkshopVideoProps {
  src: string;
  poster: string;
  label: string;
  sizes: string;
}

export function SlowWorkshopVideo({ src, poster, label, sizes }: SlowWorkshopVideoProps) {
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <Image src={poster} alt="" aria-hidden="true" fill sizes={sizes} className="object-cover" />
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onLoadedMetadata={(event) => {
          event.currentTarget.defaultPlaybackRate = 0.5;
          event.currentTarget.playbackRate = 0.5;
        }}
        onCanPlay={() => setIsReady(true)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}
