import { PlusIcon } from '@components/icons/plus-icon';
import { useTranslation } from 'next-i18next';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {DOWNLOAD, UPLOAD} from "@lib/constants";
import {useEffect} from "react";

const data = [
    {
        time: "1",
        Download: 4000,
        Upload: 2400,
    },
    {
        time: "2",
        Download: 3000,
        Upload: 1398,
    },
    {
        time: "3",
        Download: 2000,
        Upload: 9800,
    },
    {
        time: "4",
        Download: 2780,
        Upload: 3908,
    },
    {
        time: "5",
        Download: 4800,
        Upload: 1000,
    },
    {
        time: "6",
        Download: 2390,
        Upload: 3800,
    },
    {
        time: "7",
        Download: 4000,
        Upload: 4000,
    }
];
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        //console.log("payload,label",payload,label);
        return (
            <div className="rounded-lg bg-[#1D1B45] bg-opacity-40 p-4">
                <p className={"text-[#942CF0]"}>{`${payload[0].name} : ${payload[0].value}`}</p>
                <p className={"text-[#506EF6]"}>{`${payload[1].name} : ${payload[1].value}`}</p>
                {/*<p className="intro">{getIntroOfPage(label)}</p>*/}
                {/*<p className="desc">Anything you want can be displayed here.</p>*/}
            </div>
        );
    }

    return null;
};
interface Props {
    readyLogs: any[];
}
export const StartChart: React.FC<Props> = ({readyLogs}) => {
  //const { t } = useTranslation('common');

    //console.log("readyLogs",readyLogs);
  return (

<>
      {/*// <div style={{ width: "100%", height: 300 }}>*/}

      <ResponsiveContainer width={"85%"} aspect={5} >
            <AreaChart

                data={readyLogs}
                margin={{
                    top: 10,
                    right: 10,
                    left: 10,
                    bottom: 0
                }}
            >
                <defs>
                    <linearGradient id="colorDl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#942CF0" stopOpacity={0.83}/>
                        <stop offset="95%" stopColor="#942CF0" stopOpacity={0.15}/>
                    </linearGradient>

                    <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3740EA" stopOpacity={0.83}/>
                        <stop offset="95%" stopColor="#3740EA" stopOpacity={0.15}/>
                    </linearGradient>


                </defs>
                {/*<CartesianGrid strokeDasharray="3 3" />*/}
                <XAxis dataKey="time"  axisLine={true} allowDuplicatedCategory={true}/>
                {/*<YAxis />*/}
                <Tooltip content={<CustomTooltip />}  />
                <Legend verticalAlign="top" />


                <Area
                    type="monotone"
                    dataKey="download"
                    fill="url(#colorDl)"
                    fill-opacity="0.5"
                    stroke="#942CF0"
                    stroke-width="0.75"
                    unit="ms"
                />
                <Area
                    type="monotone"
                    dataKey="upload"
                    fill="url(#colorUp)"
                    fill-opacity="0.5"
                    stroke="#506EF6"
                    stroke-width="0.75"
                    unit="ms"
                />
            </AreaChart>
            </ResponsiveContainer>
      {/*// </div>*/}

    </>
  );
};
function prepareDataForStartChart(downloads,uploads ) {


    const downloadsBmW =  downloads?.map(([sec, value]) => ({sec, value}));
    const uploadsBmW = uploads?.map(([sec, value]) => ({sec, value}));
    return [
        uploadsBmW && {
            name: UPLOAD,
            data: [...uploads]
        }
        , downloadsBmW && {
            name: DOWNLOAD,
            data: [...downloads]
        }
    ];
}