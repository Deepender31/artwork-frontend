import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="  bg-white overflow-hidden">
      <div className=" mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20  lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center justify-between">
              <div className="sm:text-center lg:text-left ">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">
                    Discover the beauty of
                  </span>{" "}
                  <span className="block text-blue-600 xl:inline">art</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Explore our gallery to find the perfect piece for your
                  collection.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/gallery"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Explore Gallery
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2">
              <img
                src="https://picsum.photos/300/200"
                alt="Random artwork"
                className="object-cover rounded-lg shadow-xl"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
