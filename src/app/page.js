"use client";
import BaseCamera from "@/components/base-camera";
import Image from "next/image";
import { useState } from "react";
import ReactCompareImage from "react-compare-image";

export default function Home() {
  const [urlImageFirst, setUrlImageFirst] = useState("");
  const [urlImageSecond, setUrlImageSecond] = useState("");
  const [urlImageFirstDone, setUrlImageFirstDone] = useState("");
  const [urlImageSecondDone, setUrlImageSecondDone] = useState("");

  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [a, setA] = useState("");
  const [d, setD] = useState("");
  const [e, setE] = useState("");

  const [filenameUpload, setFilenameUpload] = useState("");

  const [resultVisual, setResultVisual] = useState("");

  const [diffDetail, setDiffDetail] = useState("");

  const onUploadPhoto = async (e, cb, folder) => {
    setUrlImageFirstDone("");
    setUrlImageSecondDone("");
    setDiffDetail("");
    setA("");
    setB("");
    setC("");
    setD("");
    setE("");
    let newForm = new FormData();
    newForm.append("file", e.target.files[0]);
    await fetch(`/api/upload/${folder}`, { method: "POST", body: newForm })
      .then(() => {
        const newUrl = URL.createObjectURL(e.target.files[0]);
        cb(newUrl);
        setFilenameUpload(e.target.files[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const startVisual = async () => {
    setUrlImageFirstDone("");
    setUrlImageSecondDone("");
    setDiffDetail("");
    setA("");
    setB("");
    setC("");
    setD("");
    setE("");

    let response = await fetch(
      `http://10.100.27.61:4000/PartNo/Stations/${filenameUpload}`,
      {
        method: "POST",
      }
    ).catch((err) => {
      console.log(err);
    });

    if (response != null) {
      const arr = response.json();
      console.log(arr);

      setUrlImageFirst("http://10.100.27.61:4000/5/image1");
      setUrlImageSecond("http://10.100.27.61:4000/5/image2");
      setUrlImageFirstDone("http://10.100.27.61:4000/5/diff");
      setUrlImageSecondDone("http://10.100.27.61:4000/5/difference");
      setDiffDetail("http://10.100.27.61:4000/5/image2");
      setE("http://10.100.27.61:4000/0/diff");
      setA("http://10.100.27.61:4000/1/diff");
      setB("http://10.100.27.61:4000/2/diff");
      setC("http://10.100.27.61:4000/3/diff");
      setD("http://10.100.27.61:4000/4/diff");
    } else {
      setResultVisual("");
      setUrlImageSecond("");
      setUrlImageFirstDone("");
      setUrlImageSecondDone("");
      setDiffDetail("");
      setA("");
      setB("");
      setC("");
      setD("");
      setE("");
    }

    console.log(resultVisual);
  };

  return (
    <div className="text-white p-3 px-5">
      <div className="">
        <div className="d-flex justify-content-between align-items-center">
          <h1>FRIWO Vietnam</h1>
          <h6 className="text-secondary">Visual Inspection Helper</h6>
        </div>
        <div className="d-flex mb-4 mt-3">
          <button
            onClick={async () => {
              await startVisual();
            }}
            className="btn btn-primary w-100 "
          >
            <Image
              className=" filter fill-slate-200 "
              src={require("../assets/icons/compare-solid.svg")}
              width={18}
            />
          </button>
        </div>
        <div>
          <div className="d-flex justify-content-between mb-3">
            <div className="d-flex gap-2 ">
              <BaseCamera
                cb={setUrlImageSecond}
                folder="img2"
                name={urlImageSecond}
              />
              <div className="">
                <label
                  className="bg-white text-dark d-flex align-items-center gap-2 justify-content-center h-100 px-2"
                  htmlFor="file-second"
                >
                  {filenameUpload == "" ? "Select source" : " "}
                  <Image
                    src={require("../assets/icons/upload.svg")}
                    width={18}
                    alt=""
                  />
                  {filenameUpload}
                </label>
                <input
                  id="file-second"
                  className="none"
                  onChange={async (event) => {
                    await onUploadPhoto(event, setUrlImageSecond, "img2").then(
                      (r) => {
                        console.log(r);
                      }
                    );
                  }}
                  type="file"
                />
              </div>
            </div>
            <div className="d-flex gap-3">
              <span
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
                className="text-dark"
              >
                <span
                  className="carousel-control-prev-icon text-dark"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden vs">Previous</span>
              </span>
              <span
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </span>
            </div>
          </div>
        </div>
        <div
          id="carouselExampleControls"
          className="carousel slide h-full"
          data-bs-ride="carousel"
          data-bs-interval="false"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <ReactCompareImage
                leftImage={urlImageFirst}
                rightImage={urlImageSecond}
                // leftImage={"https://picsum.photos/600/300"}
                // rightImage={"https://picsum.photos/601/300"}
                leftImageAlt="picture1"
                rightImageAlt="picture2"
              />
            </div>
            <div className="carousel-item">
              <ReactCompareImage
                leftImage={urlImageFirstDone}
                rightImage={urlImageSecondDone}
                // leftImage={"https://picsum.photos/602/300"}
                // rightImage={"https://picsum.photos/603/300"}
                leftImageAlt="picture1"
                rightImageAlt="picture2"
              />
            </div>

            <div className="carousel-item">
              <img
                className="w-full h-full"
                src={a}
                // src={"https://picsum.photos/602/300"}
              />
            </div>
            <div className="carousel-item">
            <img
              className="w-full h-full"
              src={b}
              // src={"https://picsum.photos/602/300"}
            />
          </div>
          <div className="carousel-item">
            <img
              className="w-full h-full"
              src={c}
              // src={"https://picsum.photos/602/300"}
            />
          </div>
          <div className="carousel-item">
            <img
              className="w-full h-full"
              src={d}
              // src={"https://picsum.photos/602/300"}
            />
          </div>
          <div className="carousel-item">
            <img
              className="w-full h-full"
              src={e}
              // src={"https://picsum.photos/602/300"}
            />
          </div>
          <div className="carousel-item">
            <img
              className="w-full h-full"
              src={diffDetail}
              // src={"https://picsum.photos/602/300"}
            />
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
