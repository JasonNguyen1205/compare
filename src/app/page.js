"use client";
import BaseCamera from "@/components/base-camera";
import Image from "next/image";
import { useState } from "react";
import ReactCompareImage from "react-compare-image";

export default function Home() {
  const [urlImageFirst, setUrlImageFirst] = useState(
    "https://wallpaperswide.com/download/a_window_to_the_mediterranean_sea_altafulla_catalonia-wallpaper-1920x1080.jpg"
  );
  const [urlImageSecond, setUrlImageSecond] = useState(
    "https://wallpaperswide.com/download/the_egg-wallpaper-1920x1080.jpg"
  );

  const onUploadPhoto = (e, cb) => {
    const newUrl = URL.createObjectURL(e.target.files[0]);
    cb(newUrl);
  };
  return (
    <main className="  w-2/5  items-center justify-between m-auto text-sm ">
      <div className="  ">
        <div className="grid grid-cols-2 gap-5 my-6   ">
          <div className="col-span-1 flex gap-2 items-center justify-between w-full">
            <BaseCamera cb={setUrlImageFirst} />
            <label
              className="border flex items-center gap-2 border-gray-600 px-3 py-1 rounded-sm hover:bg-gray-400 hover:text-white transition-all ease-in-out"
              for="file-first"
            >
              Select file{" "}
              <Image src={require("../assets/icons/upload.svg")} width={18} />
            </label>
            <input
              id="file-first"
              className="hidden"
              onChange={(event) => {
                onUploadPhoto(event, setUrlImageFirst);
              }}
              type="file"
              multiple={false}
            />
          </div>

          <div className="col-span-1 flex gap-2 items-center justify-between">
            <BaseCamera cb={setUrlImageSecond} />
            <label
              className="border flex items-center gap-2 border-gray-600 px-3 py-1 rounded-sm hover:bg-gray-400 hover:text-white transition-all ease-in-out"
              for="file-first"
            >
              Select file
              <Image src={require("../assets/icons/upload.svg")} width={18} />
            </label>
            <input
              id="file-second"
              className="hidden"
              onChange={(event) => {
                onUploadPhoto(event, setUrlImageSecond);
              }}
              type="file"
            />
          </div>
        </div>
        <div className="mb-5 rounded-md overflow-hidden shadow-md">
          <ReactCompareImage
            leftImage={urlImageFirst}
            rightImage={urlImageSecond}
          />
        </div>
        <div className="mb-5 rounded-md overflow-hidden shadow-md">
          <ReactCompareImage
            leftImage={urlImageFirst}
            rightImage={urlImageSecond}
          />
        </div>

        <button className="bg-blue-600 border transform duration-150 ease-in-out hover:bg-opacity-80 border-blue-500 flex gap-2 item-center justify-center p-2 rounded-sm w-full text-white my-10 mt-5">
          HANDLE  <Image className=" filter fill-slate-200 " src={require("../assets/icons/manage.svg")} width={18} />
        </button>
      </div>
    </main>
  );
}
