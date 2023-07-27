// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { ForceGraph3D } from "react-force-graph";
import { pokemonName } from "../../utils/data";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import SpriteText from "three-spritetext";

type Node = {
  id: number;
  label: string;
};

export default function TresDe() {
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
      <ForceGraph3D
        graphData={data}
        nodeLabel="id"
        nodeAutoColorBy="group"
        backgroundColor="#000"
        nodeThreeObject={(node) => {
          const sprite = new SpriteText(node.label);
          sprite.color = "#1976D2";
          sprite.textHeight = 8;
          return sprite;
        }}
      />
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
