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

// export const str = JSON.parse(localStorage.getItem("files"));
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const File = ({ file, onFileClick, currFile }) => {
  const handle = () => {
    onFileClick(file);
  };
  return (
    <div
      className="File flex"
      style={{ background: file.id === currFile.id ? "#d1d1d1" : "" }}
      onClick={handle}
    >
      <InsertDriveFileIcon style={{ color: "blue" }} />
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
  return (
    <div className="Folder flex col">
      <div
        className="Folder_name flex "
        onClick={handle}
        style={{ background: folder.id === currFile.id ? "#d1d1d1" : "" }}
      >
        <FolderIcon style={{ color: "grey" }} />
        {folder.name}
      </div>
      <div className="Folder_body">
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

const FFOptions = ({ file }) => {
  const addFile = () => {
    let name = "main.js";

    store.dispatch({
      type: "ADD_FILE",
      data: {
        type: "file",
        name,
        language: languageSelector(name),
        id: nanoid(),
        content: "",
        location: calculateLocation(file),
        address: [...file.address, name],
        strLocation: locator().location,
        size: 0,
        permission: 1, // {0:noReadUser, 1:readWriteAll, 2: readWriteUser}
      },
    });

    // store.dispatch({
    //   type: "SET_FILE",
    //   data: file,
    // });
  };

  const addFolder = () => {
    let name = "main.js";
    store.dispatch({
      type: "ADD_FILE",
      data: {
        type: "folder",
        name,
        // language: languageSelector(name),
        id: nanoid(),
        content: "",
        location: calculateLocation(file),
        address: [...file.address, name],
        strLocation: locator().location,
        files: [],
        size: 0,
        permission: 1, // {0:noReadUser, 1:readWriteAll, 2: readWriteUser}
      },
    });
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

  if (file.type === "folder")
    return (
      <div className="FFOptions flex space-around">
        <NoteAddIcon onClick={addFile} />
        <CreateNewFolderIcon onClick={addFolder} />
        <DeleteForeverIcon onClick={deleteFolder} />
      </div>
    );
  else if (file.type === "file") {
    return (
      <div className="FFOptions flex space-around">
        <DeleteForeverIcon onClick={deleteFolder} />
      </div>
    );
  }
};

export default connect((state) => ({
  file: state.file,
  files: state.files,
}))(function FExplorer({ file, files }) {
  // const [currFile, setFile] = useState({});

  const handleFileClick = (file, ad) => {
    // console.log(file.address);
    // setFile(file);
    try {
      Saver();
    } catch (e) {
      console.log(e);
    }
    store.dispatch({ type: "SET_FILE", data: file });
    // document.setEv(file);
    // localStorage.setItem("file", JSON.stringify(file));
  };
  useEffect(() => {
    // ad_loBuilder(str, [], []);
    // console.log(JSON.stringify(str));
  }, []);
  return (
    <div className="FExplorer flex col">
      <div className="FExplorer_head">File Manager</div>
      <div className="FExplorer_mid col flex space-between">
        {/* <div className="flex">{file.address?.join("/")}</div> */}
        {/* <div className="flex">Hey</div> */}
        <FFOptions file={file} />
      </div>
      <div className="FExplorer_body">
        <Folder
          folder={files}
          onFileClick={handleFileClick}
          currFile={file}
          // fileAddress={["."]}
        />
      </div>
    </div>
  );
});
