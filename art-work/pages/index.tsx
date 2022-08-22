import type {NextPage} from 'next'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderWithPagination from "@components/ui/slider/slider-with-pagination";
import {LogoMob} from "@components/ui/icons/logo-mob";
import {useRef, useState} from "react";
import consultFormModel from "@components/ui/forms/model/mainFormModel";
import {LogoDesk} from "@components/ui/icons/logo-desk";
import cn from "classnames";
import MainForm from "@components/ui/forms/mainForm";
import {motion} from 'framer-motion';
import Thanks from "@components/ui/forms/thanks";


const {
    formField: {
        Name,
        Email,
        Portfolio
    }
} = consultFormModel
const quests = [
    {id: Name.id, type: Name.name},
    {id: Email.id, type: Email.name},
    {id: Portfolio.id, type: Portfolio.name},

]
const Home: NextPage = () => {

    const panels = useRef([])
    const [success,setSuccess ]=useState(false)
    const animRef = useRef()

    const createPanelsRefs = (panel, index) => {
        panels.current[index] = panel
    }
    function onSubmit(value) {
        // console.log(value)
        addData(value)
         setSuccess(true)
        // animRef.current.gotoandplay(0)
        // mutate(values);

    }
    const [consult, setData] = useState(
        {
            name: 'my name',
            email: 'a@p.com',

            portfolio: "http://gg.com",

        }
    )


    const addData = (data) => {
        setData({...consult, ...data})
        //console.log(consult)
    }
    return (
        <>
        {success && <Thanks/> }
        {!success &&
            <main className={"min-h-screen flex flex-col"}>


                <div className="grid xl:grid-cols-2  relative overflow-hidden h-full flex-grow ">
                    {/*1*/}
                    <div className="flex flex-col w-full p-4">
                        <div className="top-left-ellipse-desk-for-white hidden lg:block absolute -top-[12%] -left-[12%]"/>

                        <motion.div
                            drag
                            dragConstraints={{left: 0, top: 0, right: 0, bottom: 0}}
                            dragElastic={0.1}
                            className='self-end z-10'

                        >
                            <LogoDesk className="my-8 hidden xl:block left-logo z-10 top-[7%] "/>
                        </motion.div>
                        <div className="xl:px-[10%]">

                            <div className="bottom-right-ellipse-mob xl:hidden absolute w-1/2 bottom-[20%] right-[10%]"/>

                            <MainForm addData={addData} consult={consult} quests={quests}
                                      questId={5}
                                      ref={(e) => createPanelsRefs(e, 5)}
                                      onSubmit={onSubmit}
                            />


                        </div>

                    </div>

                    {/*2*/}
                    <div
                        className="relative p-4 bg-black2 overflow-hidden  w-full order-first xl:order-last flex flex-col items-center   ">

                        <motion.div
                            drag
                            dragConstraints={{left: 0, top: 0, right: 0, bottom: 0}}
                            dragElastic={0.1}
                            className='self-start z-10 '

                        >
                            <LogoDesk className="my-8 hidden xl:block self-start right-logo z-10 top-[7%] "/>
                        </motion.div>
                        <div className="top-left-ellipse-mob absolute w-1/2 -top-[20%] -left-[20%]"/>
                        <div className="bottom-right-ellipse-mob absolute w-1/2 bottom-[20%] right-[10%]"/>

                        <div className="top-0 absolute mat-bg absolute w-full h-full"/>

                        <LogoMob className="xl:hidden w-[80%] my-4"/>
                        <h2 className=" xl:hidden text-xl text-shiri text-center my-4">Access the worlds largest art gallery from
                            anywhere. Built by artists, for artists</h2>
                        <SliderWithPagination className="w-full max-w-[45vh] self-center xl:self-start xl:max-w-[85vh] 2xl:max-w-[67vh] self-start mb-4 xl:ml-[5%]"/>
                    </div>
                </div>

            </main>

}
        </>

    )
}

export default Home
