type PixelVideoPlaceholderProps = {
  title: string;
  palette: string;
};

function PixelVideoPlaceholder({ title, palette }: PixelVideoPlaceholderProps) {
  return (
    <div className={`video-placeholder video-placeholder--${palette}`} aria-label={`${title} 视频占位`}>
      <div className="video-placeholder__scanlines" />
      <span className="video-placeholder__play" aria-hidden="true">
        ▶
      </span>
      <span className="video-placeholder__caption">video / próximamente</span>
    </div>
  );
}

export default PixelVideoPlaceholder;
