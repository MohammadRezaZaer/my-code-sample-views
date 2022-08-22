import {IP} from "@components/icons/ip";
import {Loc} from "@components/icons/loc";
import {Server} from "@components/icons/server";
import {CSSTransition} from "react-transition-group";
import {Mb, MB} from "@lib/constants";
import {useSettings} from "@components/settings/settings.context";

interface Props {
    download: number;
    upload: number;
    ping: number;
    jitter: number;
    pocketloss: number;
    unit: string
}
const units = {'Mb/s': 128000, 'kB/s': 1024, 'MB/s': 1048576};
const StatusTable: React.FC<Props> = ({download, upload, ping, jitter, pocketloss, unit}) => {

    return (
        <>

            <div
                className="z-10  text-center px-7 py-7 flex m-5 md:flex-row flex-col items-center justify-center w-5/6 h-full text-infoLight ">

                <div className="flex flex-col items-center justify-center px-8">

                        <span
                            className={"text-[18px] pt-2 md:pt-unset"}>{`Download `}</span>
                            <CSSTransition
                                in={unit === MB}
                                appear={unit === MB}
                                timeout={{
                                    appear: 300,
                                    enter: 300,
                                    exit: 100,
                                }}
                                classNames="fadeMe"

                            >
                        <span
                            className={"text-[18px] "}>{`(${unit})`}</span>
                    </CSSTransition>
                    <span
                        className={"text-[#AF5BFA] text-[22px]"}>{ ((download) / units[unit]).toFixed(2)}</span>
                </div>

                <div
                    className="flex flex-col items-center justify-center px-8 md:border-l-2 md:border-borderLight border-0 ">
                    <span className={"text-[18px]"}>{`Upload `}</span>
                    <CSSTransition
                        in={unit === MB}
                        appear={unit === MB}
                        timeout={{
                            appear: 300,
                            enter: 300,
                            exit: 100,
                        }}
                        classNames="fadeMe"

                    >
                        <span className={"text-[18px]"}>{`(${unit})`}</span>
                    </CSSTransition>
                    <span
                        className={"text-[#506EF6] text-[22px]"}>{((upload) / units[unit]).toFixed(2)}</span>
                </div>
                <div
                    className="flex flex-col items-center justify-center px-8 md:border-l-2 md:border-borderLight border-0 ">
                    <span className={"text-[18px]"}>{"Ping (ms)"}</span><span
                    className={"text-[#CFCECF] text-[22px]"}>{ping }</span></div>
                <div
                    className="flex flex-col items-center justify-center px-8 md:border-l-2 md:border-borderLight border-0 ">
                    <span className={"text-[18px]"}>{"Jitter (ms)"}</span><span
                    className={"text-[#CFCECF] text-[22px]"}>{jitter}</span></div>
                <div
                    className="flex flex-col items-center justify-center px-8 md:border-l-2 md:border-borderLight border-0 ">
                    <span className={"text-[18px]"}>{"Pocket Loss (%)"}</span><span
                    className={"text-[#CFCECF] text-[22px]"}>{pocketloss}</span></div>
            </div>

        </>

    )
}

export default StatusTable;