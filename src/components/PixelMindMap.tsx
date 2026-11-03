import type { MindMapNode } from "../data/siteContent";

type PixelMindMapProps = {
  title: string;
  nodes: MindMapNode[];
};

function PixelMindMap({ title, nodes }: PixelMindMapProps) {
  return (
    <div className="project-map" role="group" aria-label={`${title} 能力流程图`}>
      <div className="project-map__title">{title}</div>
      <ol className="project-map__steps">
        {nodes.map((node, index) => (
          <li className="project-map__step" key={node.id}>
            <span className="project-map__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span>{node.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default PixelMindMap;
