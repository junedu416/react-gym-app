import React from "react";
import "./DropZone.css";

const DropZone = () => {
  const dragOver = (event) => {
    event.preventDefault();
  };

  const dragEnter = (event) => {
    event.preventDefault();
  };

  const dragLeave = (event) => {
    event.preventDefault();
  };

  const fileDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log(files);
  };

  return (
    <>
      <div className="container">
        <div
          className="drop-container"
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
        >
          <div className="drop-message">
            <div className="upload-icon"></div>
            Drag & Drop files here or click to upload
          </div>
        </div>
      </div>
    </>
  );
};
export default DropZone;
