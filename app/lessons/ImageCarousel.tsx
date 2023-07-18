'use client';
import React, { useState } from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


const imageData = [
  {
    label: "Image 1",
    alt: "image1",
    url:
      "/slide1.svg"
  },

];


export default function ImageCarousel({username}:{username:string}) {
  const renderSlides = imageData.map((image) => (
    <div key={image.alt} className="relative">
      <Image src={image.url} alt={image.alt} width={100} height={100} className=""/>
      <div className=" bg-black/60 absolute top-0 left-0 flex justify-center items-center h-full w-full gap-8 p-8">
      <Image src="/monochromeflower.svg" alt={image.alt} width={100} height={100} className="max-h-[350px] max-w-[350px] "/>
      <div className="w-[50%] text-left">
        <h1 className=" text-7xl capitalize">hello {username}</h1>
        <p className="text-4xl">Welcome to your Dashboard</p>
        <p className="text-blue-500">Continue from where you left off</p>
      </div>
        
      </div>
      {/* <p className="legend">{image.label}</p> */}
    </div>
  ));
  const [currentIndex, setCurrentIndex] = useState(0);
  function handleChange(index:number) {
    setCurrentIndex(index);
  }
  return (
    <div className="App">
      <Carousel
        showArrows={true}
        // autoPlay={true}
        // infiniteLoop={true}
        selectedItem={currentIndex}
        onChange={handleChange}
        className="carousel-container"
      >
        {renderSlides}
      </Carousel>
    </div>
  );
}