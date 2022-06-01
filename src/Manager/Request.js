import axios from "axios";
import { RUN_SERVER } from "../config";

export function runRequest({content}){
    return axios.post(RUN_SERVER, {
        "properties":{
            "language":"python",
            "files":[
                {
                    "name":"a.py",
                    content
                }]}},{  headers: {"content-type": "application/json"}})
}