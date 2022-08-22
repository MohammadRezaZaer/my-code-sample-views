import React, {useCallback} from 'react';
import logoPlaceholder from '@assets/placeholders/logo.svg';
import {Server} from '@framework/types';
import {useLocalStorage} from "@lib/use-local-storage";
import {Mb, SETTING_KEY} from "@lib/constants";
import {settingsReducer} from "@components/settings/settingsReducer";
import platform from "platform";


const siteSettings = {
    name: 'Try My Speed Internet Speed Test',
    description: '',
    logo: logoPlaceholder,
};

export type State = typeof initialState;

export const initialState = {
    siteTitle: siteSettings.name,
    siteSubtitle: siteSettings.description,
    logo: {
        id: 1,
        thumbnail: siteSettings.logo,
        original: siteSettings.logo,
    },
    seo: {
        metaTitle: '',
        metaDescription: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: {
            id: 1,
            thumbnail: '',
            original: '',
        },
        twitterHandle: '',
        twitterCardType: '',
        metaTags: '',
        canonicalUrl: '',
    },
// currentSpeedToShow: "0.0",
    // os: "",
    // browser: "",
    operationId: 0,
    selectedUnit: Mb,
    gaugeMaxValue: 100,
    startTime: 0,
    logId: 0,

    avgPing: 0,
    jitter: 0,
    packetLoss: 0.0,

    dlAvg: 0,
    dlCurrent: 0,
    downloadData: [] ,
    uploadData: [] ,
    manual: false,
    servers: [],
    selectedServer: {},
    deviceInfo: {},
    downloadSize: "10240",
    // dlDuration: 0,
    userIp: {},
    upAvg: 0.0,
    upCurrent: 0.0,
    uploadSize: 5242880 * 2 * 20,
    isInProgress:false,
    currentSpeed:0
    // upDuration: 0,
};

export const SettingsContext = React.createContext<State | any>(initialState);

SettingsContext.displayName = 'settingContext';

export const SettingsProvider: React.FC<{ initialValue?: any }> = ({
                                                                       initialValue,
                                                                       ...props
                                                                   }) => {


    // const [savedLocalSettings] = React.useState({...initialState ,...initialValue} );
    // const [savedLocalSettings, saveToLocalSettings] = useLocalStorage(
    //     SETTING_KEY,
    //     JSON.stringify({...initialState, ...initialValue})
    // );
    const [state, dispatch] = React.useReducer(
        settingsReducer,
        // JSON.parse(savedLocalSettings!)
        {...initialState, ...initialValue}
    );

    // const [, emptyVerifiedResponse] = useAtom(verifiedResponseAtom);
    // React.useEffect(() => {
    //     emptyVerifiedResponse(null);
    // }, [emptyVerifiedResponse, state]);

    // React.useEffect(() => {
    //     saveToLocalSettings(JSON.stringify(state));
    // }, [state, saveToLocalSettings]);

    React.useEffect(() => {
        //console.log("initialValue",initialValue)
        dispatch({type: 'SET_SERVERS', initialValue})
    }, [initialValue]);

    React.useEffect(() => {
        //set platform
        setDeviceInfo(platform);
    }, []);

    React.useEffect(() => {
        if (state.servers.length > 0) {
            for (const server of state.servers) {
                if (server.isAvailableStatus === true) {
                    setServer(server);
                    break;
                }
            }
        }
        //console.log("fire setServer ")
    }, [state.servers.length]);

    const resetThings = () => dispatch({type: 'RESET_THINGS'});
    const setServer = (server: Server) => dispatch({type: 'PICK_SERVER', server});
    const setDeviceInfo = (platform:{}) => dispatch({type: 'SET_DEVICE', platform});
    const setManual = (server: Server) => dispatch({type: 'SET_MANUAL'});
    const setUnit = (unit: string) => dispatch({type: 'SET_UNIT', unit});
    const setOperation = (opId: number) => dispatch({type: 'SET_OPERATION', opId});
    const setLogId = (logId: number) => dispatch({type: 'SET_LOG_ID', logId});
    const setStartTime = (time: number) => dispatch({type: 'SET_START_TIME', time});
    const setUpAvg = (upAvg: number) => dispatch({type: 'SET_UP_AVG', upAvg});
    const setDlAvg = (dlAvg: number) => dispatch({type: 'SET_DL_AVG', dlAvg});
    const setAvgPing = (AvgPing: number) => dispatch({type: 'SET_AVG_PING', AvgPing});
    const setJitter = (jitter: number) => dispatch({type: 'SET_JITTER', jitter});
    const setPacketLoss = (packetLoss: number) => dispatch({type: 'SET_PACKET_LOSS', packetLoss});
    const setUpCurrent = (upCurrent: number) => dispatch({type: 'SET_UP_CURRENT', upCurrent});
    const setDlCurrent = (dlCurrent: number) => dispatch({type: 'SET_DL_CURRENT', dlCurrent});
    const setCurrentSpeed = (currentSpeed: number) => dispatch({type: 'SET_CURRENT_SPEED', currentSpeed});
    const setUploadData = (uploadData:[]) => dispatch({type: 'SET_UPLOAD_DATA', uploadData});
    const setDownloadData = (downloadData:[]) => dispatch({type: 'SET_DOWNLOAD_DATA', downloadData});
    const setInProgress = (isInProgress: boolean) => dispatch({type: 'SET_IN_PROGRESS', isInProgress});


    const value = React.useMemo(
        () => {
           // console.log("useMemo",state);
            return {
                ...state,
                setServer,
                setManual,
                resetThings,
                setUnit,
                setOperation,
                setLogId,
                setStartTime,
                setUpAvg,
                setDlAvg,
                setAvgPing,
                setJitter,
                setPacketLoss,
                setUpCurrent,
                setDlCurrent,
                setUploadData,
                setDownloadData,
                setInProgress,
                setCurrentSpeed
            }

        },
        [state]
    );


    return <SettingsContext.Provider value={value} {...props} />;
};

export const useSettings = () => {
    const context = React.useContext(SettingsContext);
    if (context === undefined) {
        throw new Error(`useSettings must be used within a SettingsProvider`);
    }
    return context;
};
