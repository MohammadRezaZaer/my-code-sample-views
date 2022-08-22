import {InitialValue, Server} from "@framework/types";
import {initialState, State} from "@components/settings/settings.context";


type Action =
    | { type: "PICK_SERVER"; server: Server }
    | { type: "SET_DEVICE"; platform: {} }
    | { type: "SET_SERVERS"; initialValue: {} }
    | { type: "SET_UNIT"; unit: string }
    | { type: "SET_OPERATION"; opId: number }
    | { type: "SET_DL_CURRENT"; dlCurrent: number }
    | { type: "SET_UP_CURRENT"; upCurrent: number }
    | { type: "SET_CURRENT_SPEED"; currentSpeed: number }
    | { type: "SET_PACKET_LOSS"; packetLoss: number }
    | { type: "SET_JITTER"; jitter: number }
    | { type: "SET_AVG_PING"; AvgPing: number }
    | { type: "SET_DL_AVG"; dlAvg: number }
    | { type: "SET_UP_AVG"; upAvg: number }
    | { type: "SET_START_TIME"; time: number }
    | { type: "SET_LOG_ID"; logId: number }
    | { type: "SET_IN_PROGRESS"; isInProgress: boolean }
    | { type: "SET_DOWNLOAD_DATA"; downloadData: [] }
    | { type: "SET_UPLOAD_DATA"; uploadData: [] }
    | { type: "SET_MANUAL" }
    | { type: "RESET_THINGS" };


export function settingsReducer(state: State, action: Action): State {
    switch (action.type) {

        // case "UPDATE_ITEM": {
        //   const items = updateItem(state.items, action.id, action.item);
        //   return generateFinalState(state, items);
        // }
        case "PICK_SERVER":
            return ({...state, selectedServer: {...action.server}})
        case "SET_SERVERS":
            //console.log("action",action)
            return ({...state, ...action.initialValue})
        case "SET_DOWNLOAD_DATA":
            return ({...state, downloadData: [...action.downloadData]})
        case "SET_UPLOAD_DATA":
            return ({...state, uploadData: [...action.uploadData]})

        case "SET_DEVICE":
            return ({...state, deviceInfo: {...action.platform}})

        case "SET_UNIT":
            return ({...state, selectedUnit: action.unit})
        case "SET_IN_PROGRESS":
            return ({...state, isInProgress: action.isInProgress})
        case "SET_OPERATION":
            const localOpId = action.opId % 4;
            return ({...state, operationId: localOpId})
        case "SET_DL_CURRENT":
            return ({...state, dlCurrent: (Number(action.dlCurrent.toFixed(2)))})
        case "SET_UP_CURRENT":
            return ({...state, upCurrent: Number(action.upCurrent.toFixed(2))})
        case "SET_CURRENT_SPEED":
            return ({...state, currentSpeed: Number(action.currentSpeed.toFixed(2))})
        case "SET_PACKET_LOSS":
            return ({...state, packetLoss: Number(action.packetLoss.toFixed(2))})
        case "SET_JITTER":
            return ({...state, jitter: Number(action.jitter.toFixed(2))})
        case "SET_AVG_PING":
            return ({...state, avgPing: Number(action.AvgPing.toFixed(2))})
        case "SET_DL_AVG":
            return ({...state, dlAvg: Number(action.dlAvg.toFixed(2))})
        case "SET_UP_AVG":
            return ({...state, upAvg: Number(action.upAvg.toFixed(2))})
        case "SET_START_TIME":
            return ({...state, startTime: action.time})
        case "SET_LOG_ID":
            return ({...state, logId: action.logId})
        case "SET_MANUAL":
            return ({...state, manual: true})

        case "RESET_THINGS":
            return initialState;
        default:
            return state;
    }
}

