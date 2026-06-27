import type { MindMapNode } from "../data/siteContent";

type PixelMindMapProps = {
  title: string;
  nodes: MindMapNode[];
};

function PixelMindMap({ title, nodes }: PixelMindMapProps) {
  return (
    <div className="mindmap" aria-label={`${title} 思维导图占位`}>
      <div className="mindmap__center">{title}</div>
      {nodes.map((node) => (
        <div
          className="mindmap__line"
          key={`${node.id}-line`}
          style={{ "--node-angle": `${node.angle}deg` } as React.CSSProperties}
        />
      ))}
      {nodes.map((node) => (
        <div
          className="mindmap__node"
          key={node.id}
          style={{ "--node-angle": `${node.angle}deg` } as React.CSSProperties}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}

export default PixelMindMap;
