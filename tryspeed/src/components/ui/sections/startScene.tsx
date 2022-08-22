import cn from "classnames";
import {StartText} from "@components/icons/startText";
import {motion} from "framer-motion";


import {ChangeServer} from "@components/icons/changeserver";
import {RetestBtn} from "@components/icons/retest";
import {Sharebtn} from "@components/icons/sharebtn";

import {useModalAction} from "@components/ui/modal/modal.context";
import Progress from "@components/ui/sections/progress";
import Iptable from "@components/ui/sections/ip-table";
import StatusTable from "@components/ui/sections/status-table";
import {StartChart} from "@components/chart/startChart";
import MultiToggleUnitMode from "@components/toggle/multi-toggle-unit-mode";
import {useSettings} from "@components/settings/settings.context";
import Button from "@components/ui/button";
import OpTransition from "@components/ui/optransition";
import {API_ENDPOINTS} from '@framework/utils/endpoints';
import io from "socket.io-client";
import {CronJob} from "cron";
import axios from "axios";
import {DOWNLOAD, Mb, UPLOAD} from "@lib/constants";
import {randomUUID} from "crypto";
import {useQueryClient} from "react-query";
import React from "react";
import {toast} from "react-toastify";


const StartScene: React.FC = () => {
    const units = {'Mb/s': 128000, 'kB/s': 1024, 'MB/s': 1048576};

    const downloadTime = 14000;
    const uploadTime = 14000;

    const downloadCancelToken = axios.CancelToken.source();
    const uploadCancelToken = axios.CancelToken.source();
    // @ts-ignore
    let dlCurrentSpeedTemp: any[] = [];
    // @ts-ignore
    let upCurrentTemp: any[] = [];
// @ts-ignore
    let dlSpeeds: any[] = [];
    // @ts-ignore
    let upSpeeds: any[] = [];

    let drawDlChartInterval: NodeJS.Timer;
    let drawUpChartInterval: NodeJS.Timer;

    // @ts-ignore
    let drawDlProgressInterval: NodeJS.Timer;
    // @ts-ignore
    let drawUpProgressInterval: NodeJS.Timer;

    const dlInstances = 10;
    const upInstances = 10;

    const {
        selectedServer,

        downloadSize,
        uploadSize,
        deviceInfo,
        upAvg,
        dlAvg,
        packetLoss,
        jitter,
        avgPing,
        userIp,
        currentSpeed,
        logId,
        uploadData,
        downloadData,

        setLogId,

        setUpAvg,
        setDlAvg,
        setAvgPing,
        setJitter,
        setPacketLoss,
        setInProgress,
        setCurrentSpeed,
        setDownloadData,
        setUploadData,
        resetThings,
        operationId, selectedUnit, setOperation
    } = useSettings();

    const {openModal} = useModalAction();

    //const [isAuthorize] = useAtom(authorizationAtom);

    function handleChangeServer() {
        // if (isAuthorize) {
        return openModal("CHANGE_SERVER");
        // } else {
        //     openModal("LOGIN_VIEW");
        // }

    }
    function handleShare() {
        // if (isAuthorize) {
        //return openModal("CHANGE_SERVER");
        // } else {
        //     openModal("LOGIN_VIEW");
        // }
        navigator.clipboard.writeText(`${"https://client.trymyspeed.com"}/results/?id=${logId}`);
        toast.success("Link Copied!");
        //  navigator.clipboard.writeText(`${mainClientUrl}/results/?id=${logId}`);
//doLog()
    }

    const queryClient = useQueryClient();

    return (


        <>


            {/*<Button*/}

            {/*    onClick={() =>*/}
            {/*        setOperation(operationId + 1)*/}
            {/*        //doLog()*/}
            {/*    }*/}
            {/*>*/}
            {/*    Show Message*/}
            {/*</Button>*/}


            <div
                className={cn("relative  overflow-hidden min-h-[400px] flex flex-col justify-center items-center mb-16 mt-16 container ", (operationId !== 0 && operationId !== 1) && "overflow-hidden")}>


                <OpTransition show={operationId === 0}>
                    <div className="flex flex-col items-center justify-center ">
                        <h1 className="z-10 text-4xl xl:text-6xl text-light2 font-medium mb-5 xl:mb-8">
                            {("Internet Speed Test")}
                        </h1>
                        <p className="xl:text-lg text-center text-light mb-10 xl:mb-14 z-10">
                            {("Test your download and upload speeds in under 30 seconds.")}
                        </p>

                        <div className=" w-[300px] h-[300px] circle">
                            <div className="innerbutton w-[190px] h-[190px]"
                                 onClick={() => {
                                     console.log("start click");
                                     doThing()
                                 }}

                                 role="button">


                                <StartText
                                />


                            </div>
                            <span className="circle__back_0 w-[280px] h-[280px]"/>
                            <span className="circle__back_1 w-[300px] h-[300px]"/>
                            <span className="circle__back_2 w-[300px] h-[300px]"/>
                        </div>
                        <div className={"flex gap-8 flex-col md:flex-row items-center justify-center mt-[90px]"}>
                            {/*<motion.button*/}
                            {/*    whileTap={{scale: 0.7}}*/}
                            {/*    onClick={() => {*/}
                            {/*        queryClient.invalidateQueries(API_ENDPOINTS.SERVERS).then(r => console.log(r));*/}
                            {/*        setOperation(1);*/}
                            {/*        resetThings()*/}
                            {/*    }}*/}
                            {/*    className=" h-full items-center justify-center z-10"*/}
                            {/*>*/}
                            {/*    <RetestBtn className="cursor-pointer "/>*/}
                            {/*</motion.button>*/}
                            <motion.button
                                whileTap={{scale: 0.88}}
                                onClick={() => handleChangeServer()}
                                className="  h-full items-center justify-center z-10"
                            >
                                <ChangeServer className="cursor-pointer "/>
                            </motion.button>
                            {/*<motion.button*/}
                            {/*    whileTap={{scale: 0.7}}*/}
                            {/*    //onClick={() => handleChangeServer()}*/}
                            {/*    className="  h-full items-center justify-center z-10"*/}
                            {/*>*/}
                            {/*    <Sharebtn className="cursor-pointer "/>*/}
                            {/*</motion.button>*/}
                        </div>
                        <Iptable />
                    </div>
                </OpTransition>

                <OpTransition show={operationId === 1}>
                    <div className="flex flex-col items-center justify-center absolute ">

                        <Progress progress={currentSpeed} strokeWidth={18} unit={selectedUnit} subtitle={"Download"}
                                  gradient={[{stop: 0.0, color: '#CCBDFF'}, {stop: 1, color: '#942CF0'}]}
                        />
                        <MultiToggleUnitMode/>
                    </div>
                </OpTransition>

                <OpTransition show={operationId === 2}>
                    <div className={"flex flex-col items-center justify-center absolute"}>

                        <Progress progress={currentSpeed} strokeWidth={18} unit={selectedUnit} subtitle={"Upload"}
                                  gradient={[{stop: 0.0, color: '#A8ACFF'}, {stop: 1, color: '#3740EA'}]}
                        />
                        <MultiToggleUnitMode/>
                    </div>
                </OpTransition>

                <OpTransition show={operationId === 3}>
                    <>
                        {
                            downloadData.length > 1 &&
                            <StartChart readyLogs={prepareDataForStartChart(downloadData, uploadData)}/>
                        }
                        <StatusTable download={dlAvg} upload={upAvg} ping={avgPing} jitter={jitter}
                                     pocketloss={packetLoss}
                                     unit={selectedUnit}/>

                        <MultiToggleUnitMode/>
                        <motion.button
                            whileTap={{scale: 0.7}}
                            onClick={() => handleShare()}
                            className="  h-full items-center justify-center z-10"
                        >
                            <Sharebtn className="cursor-pointer m-4"/>
                        </motion.button>
                    </>
                </OpTransition>

                <OpTransition show={operationId === 4}>
                    {
                        downloadData.length > 1 &&
                        <StartChart readyLogs={prepareDataForStartChart(downloadData, uploadData)}/>
                    }
                    <div className={"flex flex-col items-center justify-center absolute"}>

                        <StatusTable download={dlAvg} upload={upAvg} ping={avgPing} jitter={jitter}
                                     pocketloss={packetLoss}
                                     unit={selectedUnit}/>
                        <MultiToggleUnitMode/>

                    </div>
                </OpTransition>


            </div>


        </>

    );

    function prepareDataForStartChart(downloads: [], uploads: []) {
        //console.log("downloads", downloads);
        // console.log("uploads", uploads);
        let mapped = [];
        if (uploads.length > 5) {
            const changeUnit = selectedUnit === Mb ? 1 : 8;

            mapped = downloads.map(function (x, i) {
                const upload = (uploads[i] === undefined ? 0 : (uploads[i][1] / changeUnit));
                const download = (x[1] / changeUnit);
                return {time: Number(x[0]).toFixed(1), download, upload}
            })
            return mapped;
        }
    }

    function doLog() {
        // console.log(this.state);
        // const queryUrl = this.props.location.search;
        // const {frameId} = queryString.parse(queryUrl);

        // downloadDuration: this.state.dlDuration.toString(),
        // uploadDuration: this.state.upDuration.toString(),
        const data = {
            appVersion: "web",
            os: deviceInfo.os.family + "-" + deviceInfo.os.version,
            ispName: userIp.connection.isp,
            ispLat: userIp.latitude.toString(),
            ispLng: userIp.longitude.toString(),
            ip: userIp.ip,
            ping: avgPing.toString(),
            jitter: jitter.toString(),
            packetLoss: packetLoss.toString(),
            downloadSpeed: dlAvg.toString(),
            uploadSpeed: upAvg.toString(),
            userAgent: deviceInfo.name + "-" + deviceInfo.version,
            downloadChartData: downloadData,
            uploadChartData: uploadData,
            server: selectedServer.id,


        };

        //const frameId = randomUUID();
        //if (frameId) {
        //    data.owner = frameId;
        //}

        axios
            .post(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}v1/logs`, data, {
                headers: {
                    Authorization: "*my3!Secure@token&",
                    from: "web",
                    Host: "api.trymyspeed.com",
                    Origin: "https://next.trymyspeed.com/",
                },
            })
            .then((res) => {
                console.log(res);
                // @ts-ignore
                setLogId(res.data.log.id);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    function doThing() {


        setOperation(1);
        setInProgress(true);

        const client = io(`${selectedServer.url}:${selectedServer.port}`, {
            transports: ["websocket"],
        });
        client.on("msg", () => {
            pingArray.push(new Date().getTime() - sendTime);
            receivedPackets += 1;
            console.log(`calc ping ${new Date().getTime() - sendTime} ms`);
        });

        const sendPacket = () => {

            if (sentPackets === packetsToSend) {
                client.disconnect();
                job.stop();
                calculateResults(pingArray);

                downloadPrepare();
            }
            sendTime = new Date().getTime();
            client.emit("msg", message);
            sentPackets += 1;

        };

        const calculateResults = (arr: any[]) => {
            const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
            setAvgPing(avg);

            // Packet loss Calculation
            const packetLoss = 100 - (receivedPackets / sentPackets) * 100;
            setPacketLoss(packetLoss);

            // Jitter Calculation
            const jArr = [];
            for (let i = 0; i < arr.length - 1; i++) {
                jArr.push(Math.abs(arr[i] - arr[i + 1]));
            }
            const jitter = (jArr.reduce((a, b) => a + b, 0) / jArr.length);
            setJitter(jitter);

        };

        const job = new CronJob(
            "* * * * * *",
            () => {
                sendPacket();
            },
            null,
            true,
            "America/Los_Angeles"
        );
        job.start();
        const packetSize = 64; // size of each packet in byte

        const packetsToSend = 4; // number of packets to send
// @ts-ignore
        const message = new Buffer.alloc(packetSize);

        let pingArray: number[] = [];

        let DownloadData = [[0, 0]];
        let UploadData = [[0, 0]];


        let sendTime: number = 0;

        let sentPackets = 0;

        let receivedPackets = 0;

        let startTime = 0;

        let DlCurrent = 0;

        let UpCurrent = 0;


        const downloadPrepare = () => {

            drawDlChartInterval = setInterval(() => {
                let currentTime = new Date().getTime() - startTime;
                console.log("startTime drawDlChartInterval", currentTime);
                DownloadData =
                    [
                        ...DownloadData,
                        [currentTime / 1000,
                            Number((
                                DlCurrent /
                                // @ts-ignore
                                units[Mb]).toFixed(2))],
                        //[time,speed]
                    ];

            }, 500);

            drawDlProgressInterval = setInterval(() => {
                const cs =
                    (Number(DlCurrent));
                //console.log("dlCurrent drawDlProgressInterval", DlCurrent);
                setCurrentSpeed(cs)

            }, 1000);

            //////////////////dl thread

            startTime = new Date().getTime();
            for (let i = 0; i < dlInstances; i++) {
                setTimeout(async () => {
                    try {

                        const instanceStartTime = new Date().getTime();

                        await axios.get(`${selectedServer.downloadLink}/${downloadSize}`, {

                            headers: {"Cache-Control": "no-cache", Pragma: "no-cache", Expires: "0"},

                            cancelToken: downloadCancelToken.token,

                            onDownloadProgress: (progressEvent) => {
                                let instanceCurrentTime = new Date().getTime() - instanceStartTime;
                                // let percentCompleted = ((progressEvent.loaded * 100) / progressEvent.total).toFixed(2);
                                dlCurrentSpeedTemp[i] = (progressEvent.loaded / (instanceCurrentTime / 1000));

                                const totalDlCurrent = dlCurrentSpeedTemp.reduce((a, b) => Number(a) + Number(b), 0);

                                dlSpeeds.push(totalDlCurrent);


                                DlCurrent = (totalDlCurrent);
                            },
                        });
                    } catch (err) {
                        if (axios.isCancel(err)) {
                            console.log("canceled dl", err);
                        } else {
                            // @ts-ignore
                            console.log(err.response);
                        }
                    }
                }, 1);
            }

            ///////////


            setTimeout(() => {
                stopDownloadThread();
            }, downloadTime);
        };


        const stopDownloadThread = () => {
            clearInterval(drawDlProgressInterval);
            clearInterval(drawDlChartInterval);

            downloadCancelToken.cancel();

            const indice = Math.ceil(dlSpeeds.length / 4);
            dlSpeeds.splice(0, indice);
            let dlSpeedSum = 0.0;
            for (let sp of dlSpeeds) {
                dlSpeedSum += Number(sp);
            }
            setDlAvg((dlSpeedSum / dlSpeeds.length));
            setDownloadData(DownloadData);
            uploadPrepare();
        };


        const uploadPrepare = () => {

            setOperation(2);

/////////////upload thread

            const form_data = new FormData();
            const blob = new Blob([new ArrayBuffer(uploadSize)], {type: "application/zip"});
            form_data.append("file", blob);
            startTime = new Date().getTime();

            for (let i = 0; i < upInstances; i++) {
                setTimeout(async () => {
                    try {
                        const instanceStartTime = new Date().getTime();

                        await axios.post(`${selectedServer.uploadLink}`, form_data, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                Authorization: "*my3!Secure@token&",
                            },
                            cancelToken: uploadCancelToken.token,
                            onUploadProgress: (progressEvent) => {
                                let currentTime = new Date().getTime() - instanceStartTime;
                                // let percentCompleted = ((progressEvent.loaded * 100) / progressEvent.total).toFixed(2);
                                upCurrentTemp[i] = (progressEvent.loaded / (currentTime / 1000));
                                const totalUpCurrent = upCurrentTemp.reduce((a, b) => Number(a) + Number(b), 0);
                                upSpeeds.push(totalUpCurrent);
                                UpCurrent = (totalUpCurrent);
                            },
                        });
                    } catch (err) {
                        if (axios.isCancel(err)) {
                            console.log("canceled up", err);
                        } else {
                            // @ts-ignore
                            console.log(err.response);
                        }
                    }
                }, 1);
            }

            //////////////////

            drawUpChartInterval = setInterval(() => {
                let currentTime = new Date().getTime() - startTime;


                UploadData =
                    [
                        ...UploadData,
                        // @ts-ignore
                        [currentTime / 1000,
                            Number(
                                ((UpCurrent) / units[Mb]).toFixed(2)
                            )
                        ],
                    ];

            }, 500);

            drawUpChartInterval = setInterval(() => {
                // @ts-ignore
                setCurrentSpeed(((UpCurrent)))

            }, 1000);
            setTimeout(() => {
                stopUpload();
            }, uploadTime);
        };


        const stopUpload = () => {
            clearInterval(drawUpChartInterval);
            clearInterval(drawUpProgressInterval);

            uploadCancelToken.cancel();

            const indice = Math.ceil(upSpeeds.length / 4);
            upSpeeds.splice(0, indice);
            let upSpeedSum = 0.0;
            for (let sp of upSpeeds) {
                upSpeedSum += Number(sp);
            }
            setUpAvg((upSpeedSum / upSpeeds.length));

            setOperation(3);
            setInProgress(false);
            setUploadData(UploadData);
            setTimeout(() => {
                //doLog();
            }, 1500);
        };
    }


};

export default StartScene;