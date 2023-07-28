"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import 'react-html5-camera-photo/build/css/index.css';
const BaseCamera = (props) => {
  const [visible, setVisible] = useState(true);

  function handleTakePhoto(dataUri) {
    let file = new File([dataUri], props.name);
    console.log("file", file);

    let newForm = new FormData()
    newForm.append("file", file)

    fetch(`/api/upload/${props.folder}`, { method: "POST", body: newForm }).then(result => {
      props.cb(dataUri);
      setVisible(true);
    }).catch(err => { console.log(err) })

  }
  return (
    <>
      {!visible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   z-40 ">
          <Camera
            isImageMirror={true}
            isSilentMode={false}
            idealResolution={{ width: 1940, height: 1080 }}
            isDisplayStartCameraError={true}
            sizeFactor={1}
            isMaxResolution={{ width: 1940, height: 1080 }}
            isFullscreen={true}
            fileType={IMAGE_TYPES.JPG}
            idealFacingMode={FACING_MODES.ENVIRONMENT || FACING_MODES.USER}
            onTakePhoto={(dataUri) => {
              handleTakePhoto(dataUri);
            }}
          />
        </div>
      )}

      <button
        className="border border-gray-600 px-3 py-1 flex gap-2 items-center rounded-sm hover:bg-gray-400 hover:text-white transition-all ease-in-out"
        onClick={() => {
          setVisible(false);
        }}
      >
        Camera <Image src={require("../assets/icons/camera.svg")} width={18} />
      </button>
    </>
  );
};

export default BaseCamera;
