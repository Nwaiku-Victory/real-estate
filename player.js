const video = document.getElementById("video");
const streamUrl = "http://localhost:8080/hls/mystream.m3u8";

if (Hls.isSupported()) {
  const hls = new Hls({
    lowLatencyMode: true,
    liveSyncDuration: 1.5,
    liveMaxLatencyDuration: 3
  });

  hls.loadSource(streamUrl);
  hls.attachMedia(video);
} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
  video.src = streamUrl;
}
