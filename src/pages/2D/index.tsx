import { ForceGraph2D } from "react-force-graph";
import { pokemonName } from "../../utils/data";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";

type Node = {
  id: number;
  label: string;
};

export default function DosDe() {
  const [data, setData] = useState({ nodes: [], links: [] });
  const [load, setLoad] = useState(true);

  useEffect(() => {
    pokemonName().then((res: Node[]) => {
      setData({ nodes: res, links: createLinks(res) });
      setLoad(false);
    });
  }, []);

  if (load) {
    return <LinearProgress color="success" />;
  }

  return (
    <>
      <Header />
      <ForceGraph2D
          graphData={data}
          nodeAutoColorBy="group"
          nodeLabel="id"
          backgroundColor="#000"
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.label;
            const fontSize = 12/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#1976D2';
            ctx.fillText(label, node.x, node.y);

            node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            const bckgDimensions = node.__bckgDimensions;
            bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
          }}
        />,
    </>
  );
}

// Esto lo hice copn chatGPT
function createLinks(nodes: Node[]) {
  const links = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    links.push({ source: nodes[i].id, target: nodes[i + 1].id });
  }
  return links;
}
