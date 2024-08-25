import {DragEvent, useCallback, useEffect, useState} from "react";
import "../pages/Page.scss";
import "./HubCollection.scss";
import {getPagesJson} from "../repositories/Articles/request";
import {LogException} from "../repositories/utils/utilities";

import {PageData, TPage} from "./PageData";
import {Button} from "react-bootstrap";
import {uploadSrtFiles} from "../utils/dato-file";

export const AdminPage = () => {



    function dropHandler(ev: DragEvent<HTMLDivElement>) {
        console.log("File(s) dropped");

        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();

        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            alert("please use files")
        } else {
            // Use DataTransfer interface to access the file(s)
            const files: (File[]) = [];
            for(let i =0; i < ev.dataTransfer.files.length; ++i)
            {
                const file = ev.dataTransfer.files.item(i);
                if(file)
                    files.push(file);
            }
            files.forEach((file, i) => {
                console.log(`… file[${i}].name = ${file?.name}`);
            });
            uploadSrtFiles({videoId:"OAixKSjGTXGEjqyOxIlbFg", srtFiles:files})
        }
    }
    function dragOverHandler(ev: { preventDefault: () => void; }) {
        console.log("File(s) in drop zone");

        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
    }
    return (
        <>

            <div id="drop_zone" onDrop={(event) => dropHandler(event)} onDragStart={dragOverHandler} >
                <p>Drag one or more files to this <i>drop zone</i>.</p>
            </div>
        </>
    );
};
