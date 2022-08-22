import {Table} from '@components/ui/table';
import {useTranslation} from 'next-i18next';
import {useEffect, useMemo, useState} from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Link from '@components/ui/link';
import {ROUTES} from '@lib/routes';
import {Logtwitter} from "@components/icons/logtwitter";
import {Logfacebook} from "@components/icons/logfacebook";
import Button from "@components/ui/button";
import {useModalAction} from "@components/ui/modal/modal.context";
import LogActionsMenu from "@components/layouts/menu/log-actions-menu";
import {motion} from "framer-motion";
import {RetestBtn} from "@components/icons/retest";
import {ResultChart} from "@components/chart/resultChart";
import {RadioGroup} from "@headlessui/react";
import classNames from "classnames";
import {getVariations} from "@lib/get-variations";
import {useAttributes} from "@components/products/details/attributes.context";
import {LogsProvider, useLogs} from "@framework/logs/logs.context";
import MultiToggleChartMode from "@components/toggle/multi-toggle-chart-mode";
import {BOTH} from "@lib/constants";
import {Share} from "@components/icons/share";
import {Export} from "@components/icons/export";
import {useSettings} from "@components/settings/settings.context";





export const LogView = ({logs}: { logs: any }) => {

    const {setLogs} = useLogs();
    //console.log("rend1");
    useEffect(() => {
        setLogs({logs: logs[0], mode: BOTH});
    }, []);

    const {openModal} = useModalAction();

    function handleJoin() {
        return openModal('LOGIN_VIEW');
    }

    const onRowClick = (record, index, event) => {
        setLogs((prev: any) => ({
            // ...prev,
            logs: record,
            mode: prev.mode
        }))


    };
    const units = {'Mb/s': 128000, 'kB/s': 1024, 'MB/s': 1048576};
    const {selectedUnit} = useSettings();
    const myUnit=units[selectedUnit];
    const logTableColumns =
        [
            {
                title: <div><p>{('Date')}</p><p className="text-sm text-[#8E8E8F]">Time</p></div>
                ,
                dataIndex: 'createdAt',
                key: 'createdAt',
                align: 'center',
                className: '',
                width: 100,
                render: (date: string) => {
                    dayjs.extend(relativeTime);
                    dayjs.extend(utc);
                    dayjs.extend(timezone);
                    return (
                        <span className="whitespace-nowrap">
              {dayjs.utc(date).tz(dayjs.tz.guess()).fromNow()}
            </span>
                    );
                },
            },
            {
                title: <div><p>Download</p><p className="text-sm text-[#8E8E8F]">{selectedUnit}</p></div>,
                dataIndex: 'downloadSpeed',
                key: 'downloadSpeed',
                align: "center",
                ellipsis: true,
                className: '',
                width: 100,
                render: function renderDownloadSpeed(downloadSpeed: any) {
                    return <p className="whitespace-nowrap">{downloadSpeed/myUnit}</p>;
                },
            },
            {
                title: <div><p>Upload</p><p className="text-sm text-[#8E8E8F]">{selectedUnit}</p></div>,
                dataIndex: 'uploadSpeed',
                key: 'uploadSpeed',
                align: "center",
                ellipsis: true,
                className: '',
                width: 75,
                render: function renderUploadSpeed(uploadSpeed: any) {
                    return <p className="whitespace-nowrap">{uploadSpeed/myUnit}</p>;
                },
            },
            {
                title: <div><p>Ping</p><p className="text-sm text-[#8E8E8F]">ms</p></div>,
                dataIndex: 'ping',
                key: 'ping',
                align: "center",
                ellipsis: true,
                className: '',
                width: 75,
                render: function renderPing(ping: any) {
                    return <p className="whitespace-nowrap">{ping}</p>;
                },
            },
            {
                title: <div><p>Jitter</p><p className="text-sm text-[#8E8E8F]">ms</p></div>,
                dataIndex: 'jitter',
                key: 'jitter',
                align: "center",
                ellipsis: true,
                className: '',
                width: 75,
                render: function renderJitter(jitter: any) {
                    return <p className="whitespace-nowrap">{jitter}</p>;
                },
            },
            {
                title: <div><p>Packet Loss</p><p className="text-sm text-[#8E8E8F]">%</p></div>,
                dataIndex: 'packetLoss',
                key: 'packetLoss',
                align: "center",
                ellipsis: true,
                className: '',
                width: 100,
                render: function renderPacketLoss(packetLoss: any) {
                    return <p className="whitespace-nowrap">{packetLoss}</p>;
                },
            },

            {
                title: "Actions",
                dataIndex: 'id',
                key: 'id',
                align: 'center',
                className: '!border-r-[#2B294D] !border-r-0',
                width: 100,
                render: (id: any, data: any) => {
                    // <Link
                    //     href={`${ROUTES.ORDERS}/${order?.tracking_number}`}
                    //     className="flex gap-4 justify-center items-center text-body transition duration-200 hover:text-accent-hover focus:text-accent-hover"
                    //     title={t('text-view-order')}
                    // >
                    //console.log("uploadSpeed",data)
                    return (
                        <div className="flex gap-4 justify-center items-center">
                            <LogActionsMenu id={id}/>
                            <Link
                                href={`${ROUTES.TwitterShare}${id}`}
                                title={"share in twitter"}
                            >
                                <Logtwitter width={20} id={id}/>
                            </Link>
                            TODO
                            <Link
                                href={`https://www.facebook.com/dialog/feed?app_id=---&link=https%3A%2F%2Fclient.trymyspeed.com%2Fresults%2Fid=${id}&description=My%20download%20is%20${data.downloadSpeed}%20Mbps%2C%20and%20my%20upload%20is%20${data.uploadSpeed}%20Mbps.%20How%20do%20your%20speeds%20compare%3F&redirect_uri=https%3A%2F%2Fclient.trymyspeed.com%2Fclose-facebook-popup&name=Check%20out%20my%20Speedtest%20result!%20How%20fast%20is%20your%20internet%3F`}
                                title={"share in Facebook"}
                            >
                                <Logfacebook width={20} id={id}/>
                            </Link>
                        </div>)
                },
            },
        ];
    return (
        <>
            <div className="flex flex-col gap-4 md:flex-row justify-end mb-8">

                <motion.button
                    whileTap={{scale: 0.7}}
                    // onClick={() => handleSidebar("MAIN_MENU_VIEW")}
                    className="flex self-center p-2 h-full items-center justify-center "
                >
                    <RetestBtn className="cursor-pointer "/>
                </motion.button>
                <MultiToggleChartMode/>

            </div>

            <ResultChart/>
            <div className="shadow rounded mt-10">
                <div className="flex justify-between items-center mb-4  flex-col  md:flex-row gap-5">
                    <h3 className="text-2xl text-light font-normal ">
                        INDIVIDUAL RESULTS
                    </h3>
                    <div className="flex text-[#CFCECF]  p-4 gap-5">
                        <div className="">
                            <Button className="font-normal" size="medium" variant="dark" onClick={handleJoin}>
                                <Share className="mr-2"/> Share Result
                            </Button>

                        </div>
                        <div className="">

                            <Button className="font-normal" size="medium" variant="dark" onClick={handleJoin}>
                                <Export className="mr-2"/> Export Result

                            </Button>
                        </div>
                    </div>
                </div>
                <Table
                    // @ts-ignore
                    columns={logTableColumns}
                    data={logs}
                    rowKey={(record: any) => record.createdAt}

                    className="logDetailsTable w-full text-white "
                    useFixedHeader
                    scroll={{x: 300, y: 300}}
                    onRow={(record, index) => ({
                        onClick: onRowClick.bind(null, record, index),
                    })}
                />
            </div>
        </>
    );

};
