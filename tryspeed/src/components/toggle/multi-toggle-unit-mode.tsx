import {RadioGroup} from '@headlessui/react';
import {useAtom} from "jotai";
import {useState} from "react";
import AddressCard from "@components/address/address-card";
import classNames from "classnames";
import { Mb, MB} from "@lib/constants";
import {useSettings} from "@components/settings/settings.context";


const MultiToggleUnitMode: React.FC = (props) => {
    const {selectedUnit,setUnit} = useSettings();

    const modes = [MB, Mb];
    return (
        <RadioGroup {...props} className="z-10" value={selectedUnit} onChange={setUnit}>
            <RadioGroup.Label className="sr-only">Chart Mode</RadioGroup.Label>
            <div
                className="flex  triple-toggle-back  items-center justify-between w-[170px] md:flex-row min-h-[27px] ">

                {modes?.map((mode) => (
                    <RadioGroup.Option value={mode} key={mode} className="flex-1 w-full">
                        {({checked}) => (
                            <div
                                className={classNames(
                                    'flex items-center justify-center text-center cursor-pointer py-2 md:py-[5px] ',
                                    {
                                        'text-[#CFCECF] box ': checked,
                                        'md:border-l-[1px] xl:border-none border-[#ffffff22] text-[#969698]': !checked,

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

export default MultiToggleUnitMode;
