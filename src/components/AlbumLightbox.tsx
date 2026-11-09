import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Album } from "../data/albums";

type AlbumLightboxProps = {
  album: Album;
  onClose: () => void;
};

function AlbumLightbox({ album, onClose }: AlbumLightboxProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = album.photos.length;

  // 打开时聚焦关闭按钮，便于键盘操作
  useEffect(() => {
    closeRef.current?.focus();
    // 锁定背景滚动，避免弹窗打开时页面滚动
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // 键盘：Esc 关闭、左右切换
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPlaying(false);
        setIndex((i) => (i - 1 + total) % total);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setPlaying(false);
        setIndex((i) => (i + 1) % total);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, total]);

  // 自动轮播
  useEffect(() => {
    if (!playing || total < 2) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [playing, total]);

  const goPrev = () => {
    setPlaying(false);
    setIndex((i) => (i - 1 + total) % total);
  };
  const goNext = () => {
    setPlaying(false);
    setIndex((i) => (i + 1) % total);
  };

  return createPortal(
    <div
      className="album-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={album.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="album-window">
        <div className="album-window__titlebar">
          <span className="album-window__title">
            <span aria-hidden="true">🖼️</span>
            <span>{album.title}</span>
          </span>
          <button
            ref={closeRef}
            type="button"
            className="album-window__close"
            aria-label="关闭相册"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="album-window__body">
          <div className="album-window__heading">
            <div>
              <h3>{album.title}</h3>
              <span className="album-window__meta">
                {album.date} · {album.label}
              </span>
            </div>
          </div>

          <div className="album-stage">
            <img
              src={album.photos[index]}
              alt={`${album.title} 第 ${index + 1} 张`}
              loading="eager"
            />
            {total > 1 && (
              <>
                <button
                  type="button"
                  className="album-stage__arrow album-stage__arrow--prev"
                  aria-label="上一张照片"
                  onClick={goPrev}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="album-stage__arrow album-stage__arrow--next"
                  aria-label="下一张照片"
                  onClick={goNext}
                >
                  ›
                </button>
              </>
            )}
          </div>

          <div className="album-toolbar">
            <span className="album-toolbar__count" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            {total > 1 && (
              <button
                type="button"
                className="album-toolbar__play"
                aria-pressed={playing}
                onClick={() => setPlaying((p) => !p)}
              >
                {playing ? "⏸ 暂停轮播" : "▶ 自动轮播"}
              </button>
            )}
          </div>

          <div className="album-thumbs" role="list">
            {album.photos.map((src, i) => (
              <button
                key={src}
                type="button"
                className={`album-thumb${i === index ? " is-active" : ""}`}
                aria-label={`查看第 ${i + 1} 张照片`}
                aria-pressed={i === index}
                onClick={() => {
                  setPlaying(false);
                  setIndex(i);
                }}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default AlbumLightbox;
