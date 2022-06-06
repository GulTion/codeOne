import React, { useEffect, useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { ad_loBuilder, Saver } from "../Manager/tools";
import { connect } from "react-redux";
import { store } from "../App";
export const str = JSON.parse(localStorage.getItem("files"));

const File = ({ file, onFileClick, currFile }) => {
  const handle = () => {
    onFileClick(file);
  };
  return (
    <div
      className="File flex"
      style={{ background: file.id === currFile.id ? "grey" : "" }}
      onClick={handle}
    >
      <InsertDriveFileIcon style={{ color: "blue" }} />
      {file.name}
    </div>
  );
};

const Folder = ({ folder, currFile, onFileClick }) => {
  return (
    <div className="Folder flex col">
      <div className="Folder_name flex ">
        <FolderIcon style={{ color: "grey" }} />
        {folder.name}
      </div>
      <div className="Folder_body">
        {folder.files.map((file) => {
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
        <div className="flex">{file.address?.join("/")}</div>
        <div className="flex">Hey</div>
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
