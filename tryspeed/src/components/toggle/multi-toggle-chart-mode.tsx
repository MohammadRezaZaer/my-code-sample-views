import {RadioGroup} from '@headlessui/react';
import {useAtom} from "jotai";
import {useState} from "react";
import AddressCard from "@components/address/address-card";
import classNames from "classnames";
import {BOTH, DOWNLOAD, UPLOAD} from "@lib/constants";
import {useLogs} from "@framework/logs/logs.context";


const MultiToggleChartMode: React.FC = (props) => {
    const {mode: selectedChartMode, setLogs} = useLogs();

    const modes = [DOWNLOAD, BOTH, UPLOAD];
    return (
        <RadioGroup {...props} value={selectedChartMode} onChange={(in_mode) =>
            setLogs((prev: any) => ({
                // ...prev,
                logs: prev.logs,
                mode: in_mode
            }))}>
            <RadioGroup.Label className="sr-only">Chart Mode</RadioGroup.Label>
            <div
                className="flex flex-col triple-toggle-back  items-center justify-between md:w-[433px] md:flex-row min-h-[47px] ">

                {modes?.map((mode) => (
                    <RadioGroup.Option value={mode} key={mode} className="flex-1 w-full">
                        {({checked}) => (
                            <div
                                className={classNames(
                                    'flex items-center justify-center text-center cursor-pointer py-2 md:py-[unset] ',
                                    {
                                        'text-[#CFCECF] box md:py-2': checked,
                                        'md:border-l-[1px] xl:border-none border-[#ffffff22] text-[#969698]': !checked,
                                        'border-none': !checked && mode === BOTH,
                                        'text-[#969698] border-none': !checked && selectedChartMode === UPLOAD && mode === "Download",
                                        ' border-none': !checked && selectedChartMode === "Download" && mode === "Both",
                                        'flex text-[#969698] border-none': !checked && selectedChartMode === mode,
                                    }
                                )}
                            >
                                {mode}
                            </div>
                        )}
                    </RadioGroup.Option>
                ))}

            </div>
        </RadioGroup>
    );
};

export default MultiToggleChartMode;
