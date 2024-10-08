import { reqUrl } from "../../constants/webRequestConstants"
import { func_post_request } from "../webRequest";


// 创建房间
export function create_room(roomCode, roomHeadCount, roomHeadAmount) {
    const url = reqUrl.urlCreateRoom
    const data = {
        roomCode: roomCode,
        roomHeadCount: roomHeadCount,
        roomHeadAmount: roomHeadAmount
    }
    return new Promise((resolve, reject) => {
        func_post_request(url, data, function (resp, error) {
            if (error) {
                console.log("Error: ", error)
            } else {
                if (resp.code != 200) {
                    reject(resp)
                } else {
                    resolve(resp.data)
                }
            }
        })
    })
}

// 加入房间
export function join_room(roomCode) {
    const url = reqUrl.urlJoinRoom
    const data = {
        roomCode: roomCode
    }
    return new Promise((resolve, reject) => {
        func_post_request(url, data, function (resp, error) {
            if (error) {
                console.log("Error: ", error)
                reject(error)
            } else {
                if (resp.code != 200) {
                    reject(resp)
                } else {
                    resolve(resp.data)
                }
            }
        })
    })
}

// 获取房间信息
export function get_room_list() {
    const url = reqUrl.urlGetRoomList
    const data = {
        page: 1,
        pageSize: 500
    }
    return new Promise((resolve, reject) => {
        func_post_request(url, data, function (resp, error) {
            if (error) {
                console.log("Error: ", error)
                reject(error)
            } else {
                if (resp.code != 200) {
                    reject(resp)
                } else {
                    resolve(resp.data)
                }
            }
        })
    })
}