import React, { useEffect, useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { ad_loBuilder, locator, Saver } from "../Manager/tools";
import { connect } from "react-redux";
import { store } from "../App";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
// import { nanoid } from "nanoid";
import { nanoid } from "../Manager/tools";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// export const str = JSON.parse(localStorage.getItem("files"));
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link, useParams } from "react-router-dom";
import Drawe from "react-modern-drawer";
import QRCode from "react-qr-code";

const langMapImage = {
  python: "/icons/py.svg",
  javascript: "/icons/js.svg",
  cpp: "/icons/cpp.png",
  java: "/icons/java.svg",
  c: "/icons/c.png",
};
const File = ({ file, onFileClick, currFile }) => {
  const handle = () => {
    onFileClick(file);
  };
  return (
    <div
      // className="File flex"
      className={`File flex ${file.id === currFile.id ? "FileActive" : ""}`}
      onClick={handle}
    >
      {file.language ? (
        <img
          src={langMapImage[file.language]}
          className={"File_img"}
          alt={file.name}
        />
      ) : (
        <InsertDriveFileIcon className="File_img" style={{ color: "blue" }} />
      )}
      {file.name}
    </div>
  );
};

// const FFolder = ({})=>{
//   return
// }

const Folder = ({ folder, currFile, onFileClick }) => {
  const handle = () => {
    onFileClick(folder);
  };
  const [fold, setFold] = useState(false);
  const handleFold = (p) => {
    return () => {
      setFold(p);
    };
  };
  return (
    <div className="Folder flex col">
      <div
        className={`Folder_name flex ${
          folder.id === currFile.id ? "FActive" : ""
        }`}
      >
        {fold ? (
          <KeyboardArrowRightIcon onClick={handleFold(false)} />
        ) : (
          <KeyboardArrowDownIcon onClick={handleFold(true)} />
        )}
        <div className="flex" onClick={handle}>
          <FolderIcon style={{ color: "grey" }} />
          {folder.name}
        </div>
      </div>
      <div className="Folder_body" style={fold ? { display: "none" } : {}}>
        {folder.files
          .filter((e) => e.permission !== 0)
          .map((file) => {
            if (file.type === "file")
              return (
                <File
                  key={file.id}
                  onFileClick={onFileClick}
                  file={file}
                  currFile={currFile}
                  // fileAddress={fileAddress}
                ></File>
              );
            return (
              <Folder
                key={file.id}
                folder={file}
                onFileClick={onFileClick}
                currFile={currFile}
                // fileAddress={[...fileAddress, file.name]}
              />
            );
          })}
      </div>
    </div>
  );
};

const langMap = {
  py: "python",
  js: "javascript",
  java: "java",
  c: "c",
  cpp: "cpp",
};

const languageSelector = (str) => {
  let a = str.split(".");
  return langMap[a[a.length - 1].toLowerCase()];
};

const calculateLocation = (folder) => {
  console.log(folder.files);
  return [...folder.location, folder.size];
};

const FFOptions = ({ file, mode, handleQr, setqrOpen }) => {
  const addFile = () => {
    // let strLocation = locator().location;
    // console.log(strLocation);
    let name = prompt("Enter Name: ");

    let data = {
      type: "ADD_FILE",
      data: {
        type: "file",
        name,
        language: languageSelector(name),
        id: nanoid(),
        content: "",
        location: calculateLocation(file),
        address: [...file.address, name],

        size: 0,
        permission: 1, // {0:noReadUser, 1:readWriteAll, 2: readWriteUser}
      },
    };
    store.dispatch(data);
  };

  const addFolder = () => {
    // let name = "main.js";
    // let strLocation = locator().location;

    let name = prompt("Enter Name: ");

    let data = {
      type: "ADD_FILE",
      data: {
        type: "folder",
        name,
        language: languageSelector(name),
        id: nanoid(),
        content: "",
        location: calculateLocation(file),
        address: [...file.address, name],

        size: 0,
        files: [],
        permission: 1, // {0:noReadUser, 1:readWriteAll, 2: readWriteUser}
      },
    };
    store.dispatch(data);
  };

  const deleteFolder = () => {
    let e = locator();
    store.dispatch({
      type: "DELETE_ANY",
      data: {
        strLocation: e.location,
        pstrLocation: e.plocation,
        id: file.id,
      },
    });
  };

  const handleShare = () => {
    let shareLink = `/share/${localStorage.getItem("id")}/${
      file.id
    }/${JSON.stringify(file.location)}`;
    console.log(shareLink);
    handleQr(window.location.origin + shareLink);
    setqrOpen(true);
    return shareLink;
  };

  if (file.type === "folder")
    return (
      <div className="FFOptions flex space-around">
        {mode && (
          <>
            <NoteAddIcon onClick={addFile} />
            <CreateNewFolderIcon onClick={addFolder} />
            <DeleteForeverIcon onClick={deleteFolder} />

            {/* <Link to={}> */}
          </>
        )}
        {/* </Link> */}
      </div>
    );
  else if (file.type === "file") {
    return (
      <div className="FFOptions flex space-around">
        <DeleteForeverIcon onClick={deleteFolder} />
        <GroupsIcon onClick={handleShare}></GroupsIcon>
      </div>
    );
  }
};

let myid = localStorage.getItem("id");
export default connect((state) => ({
  file: state.file,
  files: state.files,
  share: state.share,
}))(function FExplorer({ file, files, mode, share, Draw }) {
  // const [currFile, setFile] = useState({});
  const param = useParams();
  const handleFileClick = (file, ad) => {
    // console.log(file.address);i
    // setFile(file);
    store.dispatch({ type: "SET_FILE", data: file });

    try {
      if (mode) {
        Saver({ mode, id: param.id });
      } else {
        document.socket.emit(myid, {
          to: param.id,
          from: myid,
          cmd: "ASK_FILES",
          subcmd: "SINGLE_FILE",
          ...file,

          location: JSON.stringify(file.location),
        });
      }
    } catch (e) {
      console.log(e);
    }

    // document.setEv(file);
    // localStorage.setItem("file", JSON.stringify(file));
  };
  useEffect(() => {
    // ad_loBuilder(str, [], []);
    // console.log(JSON.stringify(str));
  }, []);

  return (
    <>
      <div className="FExplorer flex col">
        <div className="FExplorer_head">File Manager</div>
        <div className="FExplorer_mid col flex space-between">
          {/* <div className="flex">{file.address?.join("/")}</div> */}
          {/* <div className="flex">Hey</div> */}
          <FFOptions
            file={file}
            mode={mode}
            handleQr={Draw.setqrtext}
            setqrOpen={Draw.setqrOpen}
          />
        </div>
        <div className="FExplorer_body">
          <Folder
            folder={mode ? files : share[param.id] || files}
            onFileClick={handleFileClick}
            currFile={file}
            // fileAddress={["."]}
          />
        </div>
      </div>
    </>
  );
});
