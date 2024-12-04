import type { Type } from "@/utils/types";

export function Video({ src, style }: Type<"video">) {
  return (
    <video autoPlay loop muted preload="none" style={style}>
      <source src={src} type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video>
  );
}
