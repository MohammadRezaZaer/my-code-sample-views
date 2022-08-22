import {IP} from "@components/icons/ip";
import {Loc} from "@components/icons/loc";
import {Server} from "@components/icons/server";
import {useSettings} from "@components/settings/settings.context";
import Spinner2 from "@components/ui/spinner2";
import React from "react";


const Iptable: React.FC = () => {
    const {selectedServer} = useSettings();
    return (
        <>
            <div
                className="z-10 gap-4 w-full px-7 py-7 flex m-5 md:flex-row flex-col items-center justify-evenly  h-full border rounded-xl border-1 border-borderLight">
                <span className="flex flex-1 items-center text-infoLight "><IP
                    className="m-2"/>{selectedServer.ip ? selectedServer.ip : <Spinner2/>}</span>
                <span
                    className="flex flex-1 items-center text-infoLight  md:border-l-2 md:border-borderLight border-0"><Loc
                    className="m-2"/> {selectedServer.location ? selectedServer.location : <Spinner2/>}</span>
                <span
                    className="flex flex-1 items-center text-infoLight  md:border-l-2 md:border-borderLight border-0"><Server
                    className="m-2"/> {selectedServer.name ? selectedServer.name : <Spinner2/>}</span>
            </div>

        </>

    )
}

export default Iptable;