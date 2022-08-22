import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'

import consultFormModel from '@components/survey/FormModel/consultFormModel'
import Router from 'next/router'
import Thanks from "@components/ui/forms/thanks";
import {gsap} from 'gsap'
import {useIsomorphicLayoutEffect} from 'lib/gsap-hooks'
import {LogoAfterApprove} from "@components/ui/icons/logo-after-approve";
import GetCatData from "@components/survey/FormModel/get-cat-data";
import NumberTimeline from "@components/survey/number-timeline";
import GetGoalData from "@components/survey/FormModel/get-goal-data";
import GetYearData from "@components/survey/FormModel/get-year-data";
import GetBriefData from "@components/survey/FormModel/get-brief-data";


const {
    formField: {
        activityCat,
        Goal,
        Year,
        Brief
    }
} = consultFormModel


function onClickClose() {

    Router.push('/')


}

function Survey() {

    const el = useRef()
    const query = gsap.utils.selector(el)

    const [questId, setQuestId] = useState("0")
    const [success, setSuccess] = useState(false)

    const prevQuestIdRef = useRef();
    useEffect(() => {
        prevQuestIdRef.current = questId;
    }, [questId]);


    const panels = useRef([])
    const createPanelsRefs = (panel, index) => {
        panels.current[index] = panel
    }

    useIsomorphicLayoutEffect(() => {
        let prevQuestId = -1;
        if (prevQuestIdRef.current === undefined) prevQuestId = -1
        else prevQuestId = prevQuestIdRef.current
        // console.log(+questId,+prevQuestIdRef.current)
        if (prevQuestId === undefined) {
            gsap.to(panels.current[0], {rotationX: 90, autoAlpha: 0})
            panels.current[questId] && gsap.fromTo(panels.current[questId], {rotationX: -90, autoAlpha: 0}, {
                rotationX: 0,
                autoAlpha: 1
            })
        } else if (+prevQuestId < +questId) {
            gsap.to(panels.current[prevQuestId], {rotationX: 90, autoAlpha: 0})
            panels.current[questId] && gsap.fromTo(panels.current[questId], {rotationX: -90, autoAlpha: 0}, {
                rotationX: 0,
                autoAlpha: 1
            })
        } else if (+prevQuestId > +questId) {
            gsap.to(panels.current[prevQuestId], {rotationX: -90, autoAlpha: 0})
            gsap.fromTo(panels.current[questId], {rotationX: 90, autoAlpha: 0}, {rotationX: 0, autoAlpha: 1})
        }
// if(+prevQuestId<+questId)
    }, [questId])

    const nextQuest = () => {
        // console.log('questId', questId, quests.length)
        if (+questId === quests.length - 1) {
            console.log('done')
            setSuccess(true)
        } else if (quests.length > 1) {
            const cid = +questId + 1 >= quests.length ? quests.length : (+questId + 1)
            setQuestId(quests[+cid].id + "")
        }
    }
    const prevQuest = () => {

        let cid

        if (questId - 1 === quests.length - 2) {
            //console.log(query(".quest"))
            gsap?.set(query('.quest'), {rotationX: -90, autoAlpha: 0})

        }

        if (+questId - 1 < 0) {
            cid = 0
        } else {

            gsap.to(panels.current[questId], {rotationX: -90, autoAlpha: 0})
            cid = questId - 1 <= 0 ? 0 : (questId - 1)
            gsap.fromTo(panels.current[cid], {rotationX: 90, autoAlpha: 0}, {rotationX: 0, autoAlpha: 1})
        }

        setQuestId(quests[+cid].id + "")

    }

    useIsomorphicLayoutEffect(() => {
        gsap?.set(query('.quest'), {rotationX: -90, transformOrigin: '50% 50% -200', autoAlpha: 0})
        gsap?.fromTo(panels.current[questId], {rotationX: -90, autoAlpha: 0}, {
            rotationX: 0,
            autoAlpha: 1
        })

    }, [])

    const quests = [
        {id: "0", type: Year},
        {id: "1", type: activityCat},
        {id: "2", type: Goal},
        {id: "3", type: Brief},
    ]
    const [values, setValues] = useState(
        {
            name: 'asd',
            activityCat: {selections: ['Other'], OtherCategory: '666'},
            Goal: {selections: ['Other'], OtherGoal: '666'},
            Year: {selections: ['Other'], OtherYear: '666'},
            Brief: {BriefText: '666'},

        }
    )
    const addText = (value: string, leaf: string, key: string) => {
        console.log(value, leaf)
        values[leaf][key] = value[key]
        setValues({...values})
        //console.log(consult)
    }

    const addItem = (value: string, leaf: string, key: string, mode: string) => {
        // console.log(value, leaf, key, mode)
        if (key.includes('selections')) {
            if (value.includes("Other")) {
                mode = "single"
            }
            if (mode === "multiple") {
                let newItems

                if (!values[leaf][key]?.includes(value)) {
                    if (values[leaf][key]?.includes("Other")) {
                        return
                    }

                    newItems = [...values[leaf][key], value]
                } else {
                    newItems = values[leaf][key]?.filter(item => item !== value)
                }
                values[leaf][key] = newItems
                setValues({...values})
            } else if (mode === "single") {
                let newItems
                if (!values[leaf][key]?.includes(value)) {
                    newItems = [value]
                } else {
                    newItems = []
                }
                values[leaf][key] = newItems
                setValues({...values})
            }

        }

    }


    function onSubmit(value) {

        addText(value, currentQuest.type.name, currentQuest.type.textInputKey)

        changeQuest(currentQuest.id + 1)
        // mutate(values);
    }


    function onClickBack() {
        prevQuest()
    }


    // if (questId !== quests.length - 1) {
    return (
        <>
            {!success && <>


                <div className="flex flex-col bg-gray-100 min-h-screen justify-evenly">

                    <LogoAfterApprove className="self-center my-4"/>
                    <NumberTimeline questID={questId} setQuestId={setQuestId}/>
                    <div ref={el}
                         className='flex flex-col flex-1 gap-2 md:flex-row w-full relative  h-full px-2 md:px-8 place-content-center'>


                        <div
                            className='quest-parent grid grid-cols-1   w-full   relative min-h-[70vh] max-w-screen-md overflow-x-hidden  '>


                            <GetYearData addItem={addItem} addText={addText} onSubmit={onSubmit} values={values}
                                         currentQuest={quests[0]}
                                         ref={(e) => createPanelsRefs(e, 0)}/>

                            <GetCatData addItem={addItem} addText={addText} onSubmit={onSubmit} values={values}
                                        currentQuest={quests[1]}
                                        ref={(e) => createPanelsRefs(e, 1)}/>

                            <GetGoalData addItem={addItem} addText={addText} onSubmit={onSubmit} values={values}
                                         currentQuest={quests[2]}
                                         ref={(e) => createPanelsRefs(e, 2)}/>

                            <GetBriefData addText={addText} onSubmit={onSubmit} values={values}
                                          currentQuest={quests[3]}

                                          ref={(e) => createPanelsRefs(e, 3)}/>


                        </div>


                    </div>

                </div>
            </>}
            {success &&
            <>
                <Thanks/>
            </>


            }
        </>
    )
    // } else {
    //   return (
    //     <>
    //       <Thanks/>
    //     </>
    //   )
    // }
}

export default Survey