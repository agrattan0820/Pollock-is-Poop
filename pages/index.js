import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

export default function Home() {
  const [selectedImage, setSelectedImage] = useState();

  let img;

  const preload = (p5) => {
    img = p5.loadImage(URL.createObjectURL(selectedImage));
    console.log("Ran!");
    console.log(URL.createObjectURL(selectedImage));
  };

  const setup = (p5, canvasParentRef) => {
    let cnv = p5.createCanvas(img.width, img.height).parent(canvasParentRef);
    cnv.background("#fff");

    for (let col = 0; col < img.width; col += 5) {
      for (let row = 0; row < img.height; row += 5) {
        let xPos = col;
        let yPos = row;

        let c = img.get(col, row);
        p5.push();
        p5.translate(xPos, yPos);
        p5.rotate(p5.radians(p5.random(360)));
        p5.noFill();
        p5.stroke(p5.color(c));
        p5.strokeWeight(p5.random(5));
        // fill(color(c));
        p5.point(xPos, yPos);
        p5.strokeWeight(p5.random(3));
        // rect(col, row, 10, 5);
        p5.curve(
          xPos,
          yPos,
          p5.sin(xPos) * p5.random(60),
          p5.cos(yPos) * p5.sin(xPos) * p5.random(90),
          p5.random(10),
          p5.random(80),
          p5.cos(yPos) * p5.sin(xPos) * p5.random(100),
          p5.cos(yPos) * p5.sin(xPos) * p5.random(50)
        );
        p5.pop();
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pollock is Poo</title>
        <meta name="description" content="Because it's true." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid place-items-center h-screen grid-cols-2">
        <h1 className="font-damn text-7xl lg:text-9xl uppercase">
          POLLOCK <br />
          IS SHIT
        </h1>
        <AnimatePresence>
          {selectedImage ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1 }}
              className="space-y-2"
            >
              <Sketch preload={preload} setup={setup} />
              <button
                className="border w-32 p-4 border-black font-space"
                onClick={() => setSelectedImage(null)}
              >
                Remove
              </button>
            </motion.div>
          ) : (
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              type="file"
              name="myImage"
              accept=".jpg, .png"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
