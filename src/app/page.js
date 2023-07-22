"use client";
import BaseCamera from "@/components/base-camera";
import Image from "next/image";
import { useState } from "react";
import ReactCompareImage from "react-compare-image";

export default function Home() {
  const [urlImageFirst, setUrlImageFirst] = useState(
    "https://thanhphatme.com/wp-content/uploads/2016/05/thumbnail-default.jpg"
  );
  const [urlImageSecond, setUrlImageSecond] = useState(
    "https://thanhphatme.com/wp-content/uploads/2016/05/thumbnail-default.jpg"
  );
  const [urlImageFirstDone, setUrlImageFirstDone] = useState(
    "https://thanhphatme.com/wp-content/uploads/2016/05/thumbnail-default.jpg"
  );
  const [urlImageSecondDone, setUrlImageSecondDone] = useState(
    "https://thanhphatme.com/wp-content/uploads/2016/05/thumbnail-default.jpg"
  );

  const onUploadPhoto = (e, cb,folder,) => {
    var newForm =new FormData()
    newForm.append("file", e.target.files[0])
    fetch(`/api/upload/${folder}`,{method:"POST",body:newForm}).then(result=>{
      const newUrl = URL.createObjectURL(e.target.files[0]);
   
    cb(newUrl);
    }).catch(err=>{console.log(err)})
    
  };

  const onHandlePhoto=()=>{
    setUrlImageFirstDone("http://10.100.27.57:4000/diff")
    setUrlImageSecondDone("http://10.100.27.57:4000/difference")
  }
  return (
    <main className="  lg:w-2/5 md:w-3/4 sm:w-full    items-center justify-between m-auto text-sm ">
      <div className="  ">
        <div className="grid grid-cols-2 gap-5 my-6   ">
          <div className="col-span-1 flex gap-2 items-center justify-between max-sm:flex-col w-full">
            <BaseCamera cb={setUrlImageFirst} folder="img1"  name="photo1.jpg" />
            <label
              className="border bg flex items-center gap-2 border-gray-600 bg-gray-600 px-3 py-1 rounded-sm hover:bg-gray-400 text-white transition-all ease-in-out"
              for="file-first"
            >
              Select file{" "}
              <Image src={require("../assets/icons/upload.svg")} width={18} />
            </label>
            <input
              id="file-first"
              className="hidden"
              onChange={(event) => {
                onUploadPhoto(event, setUrlImageFirst,"img1");
              }}
              type="file"
              multiple={false}
            />
          </div>

          <div className="col-span-1 flex gap-2 items-center justify-between max-sm:flex-col ">
            <BaseCamera cb={setUrlImageSecond} folder="img2"  name="photo2.jpg"/>
            <label
              className="border flex items-center gap-2 border-gray-600 px-3 py-1 rounded-sm bg-gray-600 hover:bg-gray-400 text-white transition-all ease-in-out"
              for="file-second"
            >
              Select file
              <Image src={require("../assets/icons/upload.svg")} width={18} />
            </label>
            <input
              id="file-second"
              className="hidden"
              onChange={(event) => {
                onUploadPhoto(event, setUrlImageSecond,"img2");
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
            leftImage={urlImageFirstDone}
            rightImage={urlImageSecondDone}
          />
        </div>

        <button onClick={onHandlePhoto} className="bg-blue-600 border font-semibold transform duration-150 ease-in-out hover:bg-opacity-80 border-blue-500 flex gap-2 item-center justify-center p-2 rounded-sm w-full text-white my-10 mt-5">
          HANDLE  <Image className=" filter fill-slate-200 " src={require("../assets/icons/manage.svg")} width={18} />
        </button>
      </div>
    </main>
  );
}
