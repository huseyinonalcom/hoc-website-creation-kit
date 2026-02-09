type YoutubeEmbedProps = {
  url?: string;
  title?: string;
  startSeconds?: number;
  autoPlay?: boolean;
  muted?: boolean;
};

const extractVideoId = (rawValue?: string): string | undefined => {
  if (!rawValue) {
    return undefined;
  }

  const value = rawValue.trim();
  if (!value) {
    return undefined;
  }

  try {
    const parsed = new URL(value);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace(/^\//, "").split("/")[0] || undefined;
    }

    if (parsed.searchParams.has("v")) {
      return parsed.searchParams.get("v") || undefined;
    }

    const segments = parsed.pathname.split("/").filter(Boolean);
    const embedIndex = segments.indexOf("embed");
    if (embedIndex >= 0 && segments[embedIndex + 1]) {
      return segments[embedIndex + 1];
    }
  } catch {
    // noop – fall back to direct id check below
  }

  const idPattern = /^[a-zA-Z0-9_-]{11}$/;
  return idPattern.test(value) ? value : undefined;
};

const buildEmbedUrl = (videoId: string, { startSeconds, autoPlay, muted }: { startSeconds?: number; autoPlay?: boolean; muted?: boolean }): string => {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });

  if (typeof startSeconds === "number" && startSeconds > 0) {
    params.set("start", Math.floor(startSeconds).toString());
  }

  if (autoPlay) {
    params.set("autoplay", "1");
    params.set("mute", muted ? "1" : "0");
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

export const YoutubeEmbed = ({ url, title, startSeconds, autoPlay, muted }: YoutubeEmbedProps) => {
  const videoId = extractVideoId(url);

  if (!videoId) {
    return <></>;
  }

  const embedUrl = buildEmbedUrl(videoId, {
    startSeconds,
    autoPlay,
    muted,
  });

  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ paddingBottom: "56.25%" }}>
      <iframe
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        className="absolute inset-0 h-full w-full"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        src={embedUrl}
        title={title?.trim() || "YouTube video player"}
      />
    </div>
  );
};

export default YoutubeEmbed;
