import { reqUrl } from "../../constants/webRequestConstants"
import { func_post_request } from "../webRequest"

// 获取房间信息
export function get_room_info(roomCode) {
    const url = reqUrl.urlGetRoomInformation
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

// 获取房间操作日志
export function get_room_operation_log(roomCode, operationType) {
    const url = reqUrl.urlGetRoomOperationLog
    const data = {
        roomCode: roomCode,
        operationType: operationType,
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

// +2
export function add2(roomCode) {
    const url = reqUrl.urlAdd2
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

// -2
export function sub2(roomCode) {
    const url = reqUrl.urlSub2
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

// 锁定房间
export function lock_room(roomCode) {
    const url = reqUrl.urlLockRoom
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

// 解锁房间
export function unlock_room(roomCode) {
    const url = reqUrl.urlUnlockRoom
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

// 提交当前筹码
export function submit_fin_cash(roomCode, finCash) {
    const url = reqUrl.urlSubmitFinCash
    const data = {
        roomCode: roomCode,
        finCash: finCash
    }
    return new Promise((resolve, reject) => {
        func_post_request(url, data, function (resp, error) {
            if (error) {
                console.log("Error:", error)
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

// 计算分摊金额
export function calculate_amount(roomCode) {
    const url = reqUrl.urlCalculateAmount
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

// 删除玩家信息
export function delete_player(roomCode, playerId) {
    const url = reqUrl.urlDeletePlayer
    const data = {
        roomCode: roomCode,
        playerId: playerId
    }
    return new Promise((resolve, reject) => {
        func_post_request(url, data, function (resp, error) {
            if (error) {
                console.log("Error:", error)
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