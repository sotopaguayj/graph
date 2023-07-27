import { pokemonImage } from "../../utils/data";
import { ForceGraph3D } from "react-force-graph";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import * as THREE from 'three';
import Header from "../../components/header";

function NodeImage() {
  const [images, setImages] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    pokemonImage().then((res) => {
      setImages(res);
      setLoad(false);
    });
  }, []);

  const data = {
    nodes: images,
    links: createLinks(images),
  };

  if (load) {
    return <LinearProgress color="success" />;
  }

  return (
    <>
    <Header />
      <ForceGraph3D
        graphData={data}
        nodeLabel="id"
        backgroundColor="#000"
        nodeThreeObject={({ img }) => {
          const imgTexture = new THREE.TextureLoader().load(img);
          imgTexture.colorSpace = THREE.SRGBColorSpace;
          const material = new THREE.SpriteMaterial({ map: imgTexture });
          const sprite = new THREE.Sprite(material);
          sprite.scale.set(20, 20);
          return sprite;
        }}
      />
      ,
    </>
  );
}

export default NodeImage;


// Esto lo hice copn chatGPT
function createLinks(nodes) {
  const links = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    links.push({ source: nodes[i].id, target: nodes[i + 1].id });
  }
  return links;
}
