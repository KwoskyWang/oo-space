import { useEffect, useRef, useState } from "react";
import type { HeroPose } from "../data/poseMap";
import type { WorkItem } from "../data/siteContent";
import OoPixelAvatar from "./OoPixelAvatar";
import { PixelButton, PixelCard, PixelPanel, PixelTag } from "./PixelPrimitives";
import PixelMindMap from "./PixelMindMap";

type WorkCardProps = {
  collapseLabel: string;
  expandLabel: string;
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
    <PixelPanel className="markdown-view">
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
    </PixelPanel>
  );
}

function WorkMedia({ preview }: { preview: WorkItem["preview"] }) {
  return (
    <figure className="work-preview">
      <img src={preview.src} alt={preview.alt} width={1200} height={900} loading="lazy" />
      <figcaption>界面示意</figcaption>
    </figure>
  );
}

function WorkCard({ collapseLabel, expandLabel, pose, work }: WorkCardProps) {
  const [expanded, setExpanded] = useState(false);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const contentId = `${work.id}-details`;

  useEffect(() => {
    if (expanded) {
      detailsRef.current?.focus({ preventScroll: true });
    }
  }, [expanded]);

  return (
    <PixelCard as="article" className={`work-card ${expanded ? "is-expanded" : ""}`}>
      <div className="work-card__summary">
        <div className="work-card__character-shell">
          <OoPixelAvatar
            className="work-card__character"
            pose={pose}
            size="card"
          />
        </div>

        <div className="work-card__copy">
          <h3>{work.title}</h3>
          <p>{work.description}</p>
          <div className="tag-row">
            {work.badges.map((badge) => (
              <PixelTag key={badge}>
                {badge}
              </PixelTag>
            ))}
          </div>
        </div>
        <PixelButton
          type="button"
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? collapseLabel : expandLabel}
        </PixelButton>
      </div>

      <div
        className="work-card__details"
        id={contentId}
        hidden={!expanded}
        ref={detailsRef}
        tabIndex={-1}
      >
        <div className="work-card__details-grid">
          <div className="work-card__written">
            <MarkdownView markdown={work.markdown} />
          </div>
          <div className="work-card__visuals">
            <WorkMedia preview={work.preview} />
            <PixelMindMap title={work.title} nodes={work.mindMapNodes} />
          </div>
        </div>
      </div>
    </PixelCard>
  );
}

export default WorkCard;
