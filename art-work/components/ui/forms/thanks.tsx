import React, {forwardRef, useEffect, useRef, useState} from 'react'
import {motion} from 'framer-motion'
import {Image} from "@components/ui/elements/image";

const containerVariants = {
    hidden: {
        opacity: 0,
        x: '100vw',
        transition: {
            staggerChildren: 0.3
        }
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            mass: 0.4,
            damping: 8,
            staggerChildren: 0.1,
            when: 'beforeChildren'
        }
    }
}

const childVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}


const Thanks = (ref) => {


    return (


        <>
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                className='flex flex-col place-content-center items-center text-black2 min-h-screen text-center space-y-6 overflow-hidden p-4'

            >
                <motion.div variants={childVariants} className="w-full bg-black2 ">
                    <Image
                        src={"/mis/thank mob back.svg"}
                        alt={"about_us_pic"}
                        width={"100%"}
                        height={"100%"}
                        layout='fill'
                        className="bg-black2"
                        objectFit='cover'
                    />
                </motion.div>
                <motion.div variants={childVariants}
                            className="invisible md:visible ellipse-desk-for-thank absolute -top-[5%] -left-[5%]"/>
                <motion.div variants={childVariants}
                            className="invisible md:visible ellipse-desk-for-thank absolute -bottom-[5%] -right-[5%]"/>
                <p
                    className="first-letter:text-blue-500  text-black2 font-bold text-5xl z-10"
                >
                    Thanks!
                </p>


                <motion.p
                    variants={childVariants}
                    className="text-grey2 font-medium text-xl max-w-screen-md z-10 "
                >
                    We will review your portfolio and respond as soon as possible and will send an email to you within
                    the
                    <span
                        className="relative">
                        <span className="block absolute -inset-1 -skew-y-3 bg-[#CEFE54]" aria-hidden="true"/>
                        <span className="relative ">next 20</span>
                    </span> days.
                </motion.p>


            </motion.div>

        </>
    )


}

export default forwardRef(Thanks)