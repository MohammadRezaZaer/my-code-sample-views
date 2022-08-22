import {PlusIcon} from '@components/icons/plus-icon';
import {useTranslation} from 'next-i18next';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend, Line
} from 'recharts';
import {useEffect, useState} from "react";
import {useLogs} from "@framework/logs/logs.context";
import {BOTH, DOWNLOAD, UPLOAD} from "@lib/constants";
import {isNegative} from "@lib/is-negative";
import {useSettings} from "@components/settings/settings.context";
import MultiToggleUnitMode from "@components/toggle/multi-toggle-unit-mode";


export const ResultChart: React.FC = () => {
    //const { t } = useTranslation('common');

    const {readyLogs, mode} = useLogs();

    // console.log("readyLogs",readyLogs);
    const {selectedUnit} = useSettings();


    return (

        <>

            <div style={{width: "100%", height: 300}}>

                <ResponsiveContainer width={"100%"} aspect={5}>
                    <AreaChart

                        data={readyLogs}
                        margin={{
                            top: 10,
                            right: 5,
                            left: 5,
                            bottom: 0
                        }}
                    >
                        <defs>
                            <linearGradient id="colorDl" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#942CF0" stopOpacity={0.83}/>
                                <stop offset="95%" stopColor="#942CF0" stopOpacity={0.15}/>
                            </linearGradient>

                            <linearGradient id="colorUP" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3740EA" stopOpacity={0.83}/>
                                <stop offset="95%" stopColor="#3740EA" stopOpacity={0.15}/>
                            </linearGradient>


                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <XAxis dataKey="time" axisLine={true} allowDuplicatedCategory={true} unit="S"/>

                        <YAxis dataKey={(mode === DOWNLOAD || mode === BOTH)?"download" : "upload"} mirror={true} unit={selectedUnit}/>
                        <Tooltip content={<CustomTooltip/>}/>
                        {/*<Legend verticalAlign="top"/>*/}

                        {(mode === UPLOAD || mode === BOTH) &&
                        <Area
                            dataKey="upload"
                            connectNulls
                            type="monotone"
                            // dataKey="download"
                            fill="url(#colorUP)"
                            fill-opacity="0.5"
                            stroke="#506EF6"
                            stroke-width="0.75"
                            baseValue="dataMin"
                        />

                        }
                        {(mode === DOWNLOAD || mode === BOTH) &&
                        <Area
                            dataKey="download"
                            connectNulls
                            type="monotone"
                            // dataKey="upload"
                            fill="url(#colorDl)"
                            fill-opacity="0.5"
                            stroke="#942CF0"
                            stroke-width="0.75"
                            unit={selectedUnit}
                            baseValue="dataMin"
                        />
                        }
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center">
                <MultiToggleUnitMode/>
            </div>
        </>
    );
};
const CustomTooltip = ({active, payload, label}: any) => {
    if (active && payload && payload.length) {
        //console.log("payload,label",payload,label);
        return (
            <div className="rounded-lg bg-[#1D1B45] bg-opacity-40 p-4">
                {payload[1] &&
            <p className={`text-[${payload[1]?.color}]`}>{`${payload[1]?.name} : ${payload[1]?.value}`}</p>}
                {payload[0] &&
                <p className={`text-[${payload[0]?.color}]`}>{`${payload[0]?.name} : ${payload[0]?.value}`}</p>}

                {/*<p className="intro">{getIntroOfPage(label)}</p>*/}
                {/*<p className="desc">Anything you want can be displayed here.</p>*/}
            </div>
        );
    }

    return null;
};