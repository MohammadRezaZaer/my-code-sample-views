import {RadioGroup} from '@headlessui/react';
import {useAtom} from 'jotai';
import ChangeserverListCard from './changeserverlist-card';
import {useEffect, useState} from 'react';
import {useTranslation} from 'next-i18next';
import SearchBox from "@components/ui/search/search-box";
import {selectedServerAtom, speedtestAtom} from "@components/settings/speedtest";
import {useSettings} from "@components/settings/settings.context";
import Scrollbar from '@components/ui/scrollbar';
import {motion} from "framer-motion";
import {SelectAuto} from "@components/icons/selectAuto";
import {Element} from "react-scroll";
import {AddressType} from "@framework/utils/constants";

interface ServerListProps {
    label: string;
    className?: string;

}

function handleAutoSelect() {
    // if (isAuthorize) {

    // } else {
    //     openModal("LOGIN_VIEW");
    // }

}

export const ChangeServerList: React.FC<ServerListProps> = ({
                                                                label,
                                                                className,

                                                            }) => {
    const {t} = useTranslation('common');
    const {selectedServer, servers, setServer,setManual} = useSettings();
     //console.log(servers);

    // const [selectedServer, setServer] = useAtom(selectedServerAtom);

    const [searchTerm, updateSearchTerm] = useState('');
    const [filteredSERVERS, updatefilteredSERVERS] = useState(servers);
    const handleOnChange = (e: any) => {
        const {value} = e.target;
        updateSearchTerm(value);
        updatefilteredSERVERS(servers?.filter(
            (server) => server?.shortName?.toLowerCase().includes(value)
        ))
        //console.log(servers);
        //console.log(filteredSERVERS);
    };
    const onSearch = (e: any) => {
        e.preventDefault();

    };

    function clearSearch() {
        updateSearchTerm('');
    }


    useEffect(() => {

        if(selectedServer){
        const index = servers.findIndex((a) => a.id === selectedServer?.id);
        setServer(servers[index]);
        }

    }, []);
    //console.log("selectedServer",selectedServer.id);

    return (
        <div className="px-4">
            <p className="text-lg lg:text-xl  capitalize">{label}</p>
            <div className={"py-2"}>
                <SearchBox
                    label={label}
                    onSubmit={onSearch}
                    onClearSearch={clearSearch}
                    onChange={handleOnChange}
                    value={searchTerm}
                    name="search"
                    variant={"minimal"}
                    placeholder={t('common:text-search-placeholder-minimal')}

                />
            </div>
            <Element
                name="grid"
                className="flex flex-1 pb-3 mb-3 items-center justify-center border-b-[1px] border-solid border-border-100 border-opacity-50"
            >
                <motion.button
                    whileTap={{scale: 0.88}}
                    onClick={() => handleAutoSelect()}
                    className="py-2"
                >
                    <SelectAuto className="cursor-pointer "/>
                </motion.button>
            </Element>
            {filteredSERVERS && filteredSERVERS?.length ? (
                <Scrollbar
                    className="w-full"
                    style={{height: 'calc(40vh )'}}
                >
                    <RadioGroup value={selectedServer} onChange={(val)=>{
                        console.log("onChange",val);setManual();setServer(val)}}>
                        <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
                        <div className="flex flex-col gap-2 ">

                            {filteredSERVERS?.map((server: any, idx: number) => (
                                <RadioGroup.Option value={server} key={idx}>


                                    {() => {
                                        const checked = (selectedServer.id === server.id);
                                        //console.log("selectedServer.id,server.id",selectedServer.id,server.id);

                                        return <ChangeserverListCard checked={checked} ChangeserverListItem={server}/>
                                    }}

                                </RadioGroup.Option>

                            ))}

                        </div>
                    </RadioGroup>
                </Scrollbar>
            ) : (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <span className="relative px-5 py-6 text-base text-center bg-gray-100 rounded border border-border-200">
            {t('text-no-server-found')}
          </span>
                </div>
            )}

        </div>
    );
};
export default ChangeServerList;
