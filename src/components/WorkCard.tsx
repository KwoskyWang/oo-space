import { useState } from "react";
import type { HeroPose, WorkItem } from "../data/siteContent";
import PixelMindMap from "./PixelMindMap";

type WorkCardProps = {
  pose: HeroPose;
  work: WorkItem;
};

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={`${part}-${index}`}>{part.slice(1, -1)}</code>;
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function MarkdownView({ markdown }: { markdown: string }) {
  const lines = markdown.split("\n");

  return (
    <div className="markdown-view">
      {lines.map((line, index) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return null;
        }

        if (trimmed.startsWith("## ")) {
          return <h4 key={`${trimmed}-${index}`}>{trimmed.replace("## ", "")}</h4>;
        }

        if (trimmed.startsWith("- ")) {
          return <li key={`${trimmed}-${index}`}>{renderInline(trimmed.replace("- ", ""))}</li>;
        }

        return <p key={`${trimmed}-${index}`}>{renderInline(trimmed)}</p>;
      })}
    </div>
  );
}

type WorkMediaProps = {
  palette: WorkItem["mediaPalette"];
  title: WorkItem["title"];
};

function WorkMedia({ palette, title }: WorkMediaProps) {
  return (
    <div className={`work-media work-media--${palette}`} aria-label={`${title} 图片和视频占位`}>
      {/* TODO: 后续可以替换为真实作品截图、演示 GIF 或 mp4。 */}
      <span className="work-media__window" />
      <span className="work-media__dot work-media__dot--one" />
      <span className="work-media__dot work-media__dot--two" />
      <span className="work-media__dot work-media__dot--three" />
      <span className="work-media__caption">mock preview</span>
    </div>
  );
}

function WorkCard({ pose, work }: WorkCardProps) {
  const [expanded, setExpanded] = useState(false);
  const contentId = `${work.id}-details`;

  return (
    <article className={`pixel-card work-card ${expanded ? "is-expanded" : ""}`}>
      <div className="work-card__summary">
        <div className="work-card__character-shell">
          <img className="work-card__character" src={pose.src} alt={pose.alt} />
        </div>

        <div className="work-card__copy">
          <div className="tag-row">
            {work.badges.map((badge) => (
              <span className="pixel-tag" key={badge}>
                {badge}
              </span>
            ))}
          </div>
          <h3>{work.title}</h3>
          <p>{work.description}</p>
        </div>
        <button
          className="pixel-button"
          type="button"
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "收起 / Ver menos 🍓" : "展开 / Ver más ✨"}
        </button>
      </div>

      <div className="work-card__details" id={contentId} hidden={!expanded}>
        <div className="work-card__details-grid">
          <div className="work-card__written">
            <MarkdownView markdown={work.markdown} />
            <div className="oo-note">
              <h4>oo 的小结 / Nota de oo</h4>
              <p>{work.note.chinese}</p>
              <p className="spanish-line">{work.note.spanish}</p>
            </div>
          </div>
          <div className="work-card__visuals">
            <WorkMedia palette={work.mediaPalette} title={work.title} />
            <PixelMindMap title={work.title} nodes={work.mindMapNodes} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default WorkCard;
