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

      <main className="grid place-items-center min-h-screen md:grid-cols-2">
        <div>
          <h1 className="font-damn text-7xl lg:text-9xl uppercase">
            POLLOCK <br />
            IS SHIT
          </h1>
        </div>
        <div className="flex justify-center items-center flex-col">
          <AnimatePresence>
            {selectedImage ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1 }}
                className="canvas-container space-y-4 md:space-y-0 flex justify-center items-center flex-col relative group"
              >
                <Sketch preload={preload} setup={setup} />
                <button
                  className="border md:absolute transition md:opacity-0 group-hover:opacity-100 bg-white md:bottom-8 md:left-1/2 transform md:-translate-x-1/2 w-32 p-4 border-black font-space"
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
          <svg
            width="300"
            height="200"
            viewBox="0 0 175 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-48 h-32 md:h-auto md:w-auto md:absolute md:bottom-8 bench"
          >
            <path
              d="M42 51.5L26 66H12V17.5H163V66H148.5L132 51.5V34H42V51.5Z"
              fill="#EAD4C1"
            />
            <path
              d="M26 66L42 51.5V34M26 66H12V17.5H163V66H148.5M26 66V34H42M42 34H132M132 34V51.5L148.5 66M132 34H148.5V66"
              stroke="#EAD4C1"
            />
            <path
              d="M42 51.5L26.5 65.5L26 35H42V51.5Z"
              fill="#E0A875"
              stroke="#E0A875"
            />
            <path
              d="M148 65.5L132 51.5V35H148V65.5Z"
              fill="#E0A875"
              stroke="#E0A875"
            />
            <path
              d="M26.1781 9L13 16.5H87V9H26.1781Z"
              fill="#E0A875"
              stroke="#E0A875"
            />
            <path
              d="M87.5 9H148.587L155.044 12.75L161.5 16.5H87.5V9Z"
              fill="#E0A875"
              stroke="#E0A875"
            />
          </svg>
        </div>
      </main>
    </div>
  );
}
