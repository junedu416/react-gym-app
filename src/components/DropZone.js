import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "@mui/material";
// import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
// import { modalStyling } from "../styled-components/modal";
import { StyledModal } from "../styled-components";
// import CloseIcon from "@mui/icons-material/Close";
// import IconButton from "@mui/material/IconButton";

import "./DropZone.css";
import { Container } from "../styled-components";
import { CloudUpload, Upload, UploadFile } from "@mui/icons-material";

const Dropzone = () => {
  const fileInputRef = useRef();
  const modalImageRef = useRef();
  const modalRef = useRef();
  let progressRef = useRef();
  let uploadRef = useRef();
  const uploadModalRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ModalContent, setModalContent] = useState(null);

  useEffect(() => {
    let filteredArr = selectedFiles.reduce((acc, current) => {
      const x = acc.find((item) => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    setValidFiles([...filteredArr]);
  }, [selectedFiles]);

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const dragOver = (e) => {
    preventDefault(e);
  };

  const dragEnter = (e) => {
    preventDefault(e);
  };

  const dragLeave = (e) => {
    preventDefault(e);
  };

  const fileDrop = (e) => {
    preventDefault(e);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        files[i]["invalid"] = true;
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        setErrorMessage("File type not permitted");
        setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
      }
    }
  };

  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/x-icon",
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }

    return true;
  };

  const fileSize = (size) => {
    if (size === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };

  const removeFile = (name) => {
    const index = validFiles.findIndex((e) => e.name === name);
    const index2 = selectedFiles.findIndex((e) => e.name === name);
    const index3 = unsupportedFiles.findIndex((e) => e.name === name);
    validFiles.splice(index, 1);
    selectedFiles.splice(index2, 1);
    setValidFiles([...validFiles]);
    setSelectedFiles([...selectedFiles]);
    if (index3 !== -1) {
      unsupportedFiles.splice(index3, 1);
      setUnsupportedFiles([...unsupportedFiles]);
    }
  };
// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "calc(50% + 115px)",
//   transform: "translate(-50%, -50%)",
//   overflow: "hidden",
//   objectFit: "cover",
//   width: "100%",
//   height: "300px",
//   backgroundSize: "contain",
//   backgroundRepeat: "no-repeat",
//   backgroundPosition: "center",
// }

  const openImageModal = (file) => {
    const reader = new FileReader();


    // modalRef.current.style.display = "block";

    reader.readAsDataURL(file);
    reader.onload = function (e) {
        setModalContent(<div style={{ backgroundImage:`url(${e.target.result})`}}></div>)
        handleOpen();
    //   modalImageRef.backgroundImage = <img src={`url(${e.target.result})`} />;
    //   modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
    };
  };

  const closeModal = () => {
    modalRef.current.style.display = "none";
    modalImageRef.current.style.backgroundImage = "none";
  };

  const uploadFiles = async () => {
    // ============================================================
    uploadModalRef.current.style.display = "block";
    // ============================================================

    handleOpen();
    // ============================================================
    uploadRef.current.innerHTML = "File(s) Uploading...";
    // ============================================================

    for (let i = 0; i < validFiles.length; i++) {
      const formData = new FormData();
      formData.append("image", validFiles[i]);
      formData.append("key", "");

      axios
        // CHANGE URL TO FILE UPLOAD FOR FIREBASE
        .post("https://api.imgbb.com/1/upload", formData, {
          onUploadProgress: (progressEvent) => {
            const uploadPercentage = Math.floor(
              (progressEvent.loaded / progressEvent.total) * 100
            );

            // ============================================================
            progressRef = `${uploadPercentage}%`;
            // progressRef.current.innerHTML = `${uploadPercentage}%`;
            progressRef.current.style.width = `${uploadPercentage}%`;
            // ============================================================

            if (uploadPercentage === 100) {
              // ============================================================
              uploadRef = "File(s) Uploaded";
              // uploadRef.current.innerHTML = "File(s) Uploaded";
              // ============================================================

              validFiles.length = 0;
              setValidFiles([...validFiles]);
              setSelectedFiles([...validFiles]);
              setUnsupportedFiles([...validFiles]);
            }
          },
        })
        .catch(() => {
          // ============================================================
          uploadRef = `<span class="error">Error Uploading File(s)</span>`;
          //   uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
          progressRef.current.style.backgroundColor = "red";
          // ============================================================
        });
    }
  };

  const closeUploadModal = () => {
    uploadModalRef.current.style.display = "none";
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
          onClick={fileInputClicked}
        >
          <div className="drop-message">
            <div>
              {/* DIFFERENT ICONS FOR UPLOAD in DROPZONE */}
              {/* <CloudUpload sx={{ fontSize: "8rem" }} /> */}
              <UploadFile sx={{ fontSize: "8rem" }} />
              {/* <Upload sx={{ fontSize: "8rem" }} /> */}
            </div>
            {/* <div className="upload-icon"></div> */}
            Drag & Drop files here or click to select file(s)
          </div>
          <input
            ref={fileInputRef}
            className="file-input"
            type="file"
            multiple
            onChange={filesSelected}
          />
        </div>
        {unsupportedFiles.length === 0 && validFiles.length ? (
          <Container>
            <Button
              variant="contained"
              size="large"
              onClick={() => uploadFiles()}
              className="file-upload-btn"
              sx={{ mt: 2, mb: 5 }}
              style={{ justifySelf: "center" }}
            >
              Upload Files
            </Button>
          </Container>
        ) : (
          ""
        )}
        {unsupportedFiles.length ? (
          <p>Please remove all unsupported files.</p>
        ) : (
          ""
        )}
        <div className="file-display-container">
          {validFiles.map((data, i) => (
            <div className="file-status-bar" key={i}>
              <div
                onClick={
                  !data.invalid
                    ? () => openImageModal(data)
                    : () => removeFile(data.name)
                }
              >
                <div className="file-type-logo"></div>
                <div className="file-type">{fileType(data.name)}</div>
                <span
                  className={`file-name ${data.invalid ? "file-error" : ""}`}
                >
                  {data.name}
                </span>
                <span className="file-size">({fileSize(data.size)})</span>{" "}
                {data.invalid && (
                  <span className="file-error-message">({errorMessage})</span>
                )}
              </div>
              <div
                className="file-remove"
                onClick={() => removeFile(data.name)}
              >
                X
              </div>
            </div>
          ))}
        </div>
      </div>

      <StyledModal ref={modalRef} open={open} onClose={handleClose}>
        <Fade>
          <Box>
            {ModalContent}
            <div className="modal-image" ref={modalImageRef}></div>
          </Box>
        </Fade>
      </StyledModal>
      <Modal children={uploadModalRef} open={open} onClose={handleClose}>
        <div className="progress-container">
          <span ref={uploadRef}></span>
          <div className="progress">
            <div className="progress-bar" ref={progressRef}></div>
          </div>
        </div>
      </Modal>

      <div className="modal" ref={modalRef}>
        <div className="overlay"></div>
        <span className="close" onClick={() => closeModal()}>
          X
        </span>
        <div className="modal-image" ref={modalImageRef}></div>
      </div>

      <div className="upload-modal" ref={uploadModalRef}>
        <div className="overlay"></div>
        <div className="close" onClick={() => closeUploadModal()}>
          &times;
        </div>
        <div className="progress-container">
          <span ref={uploadRef}></span>
          <div className="progress">
            <div className="progress-bar" ref={progressRef}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropzone;
