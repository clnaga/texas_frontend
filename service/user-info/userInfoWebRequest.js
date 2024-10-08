import { reqUrl } from "../../constants/webRequestConstants";
import { func_post_request } from "../webRequest";

export function changeName(nickName) {
    const url = reqUrl.urlChangePlayerName
    const data = {
        "playerName": nickName
    }
    func_post_request(url, data, function(resp, err){
        if(err){
            console.log("Error: ", err)
        }else{
            return resp.data
        }
    })
}