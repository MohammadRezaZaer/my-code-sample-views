import { useState } from "react";
import {Arrow, useHover, useLayer} from "react-laag";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {zoomInBottom} from "@lib/motion/zoom-in-bottom";
import {siteSettings} from "@settings/site";

export default function AppsMenu() {
  // const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("common");


  // function close() {
  //   setOpen(false);
  //   console.log(hoverProps,isOver,isOpen)
  // }
  const [isOver, hoverProps,close] = useHover({delayLeave: 100});
  function handleClick(path: string) {
    router.push(path);
    close();
  }
  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen: isOver,
    onOutsideClick: close, // close the menu when the user clicks outside
    onDisappear: close, // close the menu when the menu gets scrolled out of sight
    overflowContainer: false, // keep the menu positioned inside the container
    placement: "bottom-center", // we prefer to place the menu "bottom-end"
    triggerOffset: 10, // keep some distance to the trigger
    containerOffset: 16, // give the menu some room to breath relative to the container
    arrowOffset: 4,
    onParentClose:close
  });


  return (
    <>
      <button
        type="button"
        className="flex items-center focus:outline-none text-light"
        aria-label="toggle apps dropdown"
        // onClick={() => setOpen(!isOpen)}

        {...triggerProps}
        {...hoverProps}
      >
          Apps
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
                Phones & Tablets
              </li>
              {siteSettings.appsLinks.map(({ href, label ,icon}) => (

                  <li key={`${href}${label}`}>

                  <button
                    onClick={() => handleClick(href)}
                    className="block w-full py-2.5 px-2 text-sm text-start font-semibold capitalize text-dropdownText transition duration-200 hover:text-accent focus:outline-none"
                  >
                    <span className={"flex items-center"}>
                    <span >
                   {icon}</span>
                    <span className={"px-2"}>{t(label)}</span>
                    </span>

                  </button>



                </li>
              ))}
              <Arrow {...arrowProps} size={8} backgroundColor={"#353360"} roundness={1} />

            </motion.ul>

          )}
        </AnimatePresence>
      )}
    </>
  );
}
