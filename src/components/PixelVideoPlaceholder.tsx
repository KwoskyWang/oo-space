type PixelVideoPlaceholderProps = {
  title: string;
  palette: string;
};

function PixelVideoPlaceholder({ title, palette }: PixelVideoPlaceholderProps) {
  return (
    <div className={`video-placeholder video-placeholder--${palette}`} aria-label={`${title} 视频占位`}>
      {/* TODO: 替换真实 mp4 时，可在这里改为 <video controls src="/your-video.mp4" />。 */}
      <div className="video-placeholder__scanlines" />
      <button className="video-placeholder__play" type="button" aria-label={`播放 ${title} 的占位视频`}>
        ▶
      </button>
      <span className="video-placeholder__caption">video / próximamente</span>
    </div>
  );
}

export default PixelVideoPlaceholder;
