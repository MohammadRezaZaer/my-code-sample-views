import {useRef, useState} from "react";
import {Arrow, useHover, useLayer} from "react-laag";
import {motion, AnimatePresence} from "framer-motion";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {zoomInBottom} from "@lib/motion/zoom-in-bottom";
import {siteSettings} from "@settings/site";
import {Packet} from "@components/icons/packet";
import Input from "@components/ui/forms/input";

export default function LogActionsMenu({id}) {
    const [isOpen, setOpen] = useState(false);
    const router = useRouter();
    const {t} = useTranslation("common");
    const inputRef = useRef(null);

    // helper function to close the menu
    function close() {
        setOpen(false);
    }

    const [isOver, hoverProps] = useHover({delayLeave: 100});

    const {renderLayer, triggerProps, layerProps, arrowProps} = useLayer({
        isOpen: isOver,
        onOutsideClick: close, // close the menu when the user clicks outside
        onDisappear: close, // close the menu when the menu gets scrolled out of sight
        overflowContainer: true, // keep the menu positioned inside the container
        placement: "top-center", // we prefer to place the menu "bottom-end"
        triggerOffset: 10, // keep some distance to the trigger
        containerOffset: 16, // give the menu some room to breath relative to the container
        arrowOffset: 4
    });

    function handleClick(path: string) {
        close();
        router.push(path);
    }

    return (
        <>
            <button
                type="button"
                className="flex items-center focus:outline-none text-light"
                aria-label="toggle direct link dropdown"
                onClick={() => setOpen(!isOpen)}

                {...triggerProps}
                {...hoverProps}
            >
                <Packet width={20}/>
            </button>

            {renderLayer(
                <AnimatePresence>
                    {isOver && (
                        <motion.ul
                            {...layerProps}
                            {...hoverProps}
                            initial="from"
                            animate="to"
                            exit="from"
                            variants={zoomInBottom()}
                            className=" w-48 bg-dropdownBack rounded-xl shadow-700 z-20 p-4"
                            // onMouseEnter={() => setOpen(true)}
                            // onMouseLeave={() => setOpen(false)}

                        >
                            <li className={"text-[#B6B6B6] py-2"}>
                                Direct Link To This Result:
                            </li>
                            <p className="pb-1">Web</p>
                            <Input
                                ref={inputRef}
                                name={"web"}
                                variant="outline"
                                className="mb-4 sm:mb-0 sm:me-4 flex-1 text-white w-full"
                                dimension="small"
                                defaultValue={"https://client.trymyspeed.com/results/?id="+id}
                                onClick={()=>{
                                    //console.log(inputRef?.current);
                                    inputRef?.current?.select()}}
                            />


                            <Arrow {...arrowProps} size={8} backgroundColor={"#353360"} roundness={1}/>

                        </motion.ul>

                    )}
                </AnimatePresence>
            )}
        </>
    );
}
