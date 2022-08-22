import React, {forwardRef, useMemo, useRef} from 'react'
import {useIsomorphicLayoutEffect} from "lib/gsap-hooks";
import {gsap} from 'gsap'
import cn from "classnames";


const NumberTimeline = ({questID,setQuestId},ref) => {
    const tl = useMemo(() => gsap.timeline({defaults:{duration:1}}), [])
    const el = useRef()
    const query = gsap.utils.selector(el)


    useIsomorphicLayoutEffect(() => {
        const bar = query(".bar")

        gsap.set(bar, {scaleX:0, transformOrigin:"left top"})
        tl.to(bar, {scaleX:"0"})
            .addPause("+=0", animate, [1])
            .addLabel("0")
            .to(bar, {scaleX:"+=0.33"})
            .addPause("+=0", animate, [2])
            .addLabel("1")
            .to(bar, {scaleX:"+=0.33"})
            .addPause("+=0", animate, [3])
            .addLabel("2")
            .to(bar, {scaleX:"+=0.34"})
            .addPause("+=0", animate, [4])
            .addLabel("3")



        function animate(index) {
            // console.log(index)
            gsap.to(query(`.circle:nth-child(${index}) div`), { ease:"none",scale:1.5, repeat:1, yoyo:true, duration:0.2})
        }

    }, []);
    useIsomorphicLayoutEffect(() => {
        console.log(questID,tl.labels,tl.currentLabel())
        tl.tweenTo(questID,{duration:0.2})
    },[questID])
    return (


            <div  className="w-full" ref={el}>
            <div  className="circles w-1/2 mx-auto max-w-screen-md">
                <div className="circle" onClick={()=>setQuestId("0")}>
                    <div className={cn("border border-grey3 bg-white text-black2",questID>="0"&&"!bg-black2 !text-white")}>1</div>
                </div>
                <div className="circle" onClick={()=>setQuestId("1")}>
                    <div className={cn("border border-grey3 bg-white text-black2",questID>="1"&&"!bg-black2 !text-white")}>2</div>
                </div>
                <div className="circle" onClick={()=>setQuestId("2")}>
                    <div className={cn("border border-grey3 bg-white text-black2",questID>="2"&&"!bg-black2 !text-white")}>3</div>
                </div>
                <div className="circle" onClick={()=>setQuestId("3")}>
                    <div className={cn("border border-grey3 bg-white text-black2",questID>="3"&&"!bg-black2 !text-white")}>4</div>
                </div>
            </div>
            <div className="progress w-1/2 bg-grey3 mx-auto max-w-screen-md mt-2">
                <div className="bar bg-black2"/>
            </div>
            </div>


    )
}

export default forwardRef(NumberTimeline)