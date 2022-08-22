import React from 'react'
import {Mb} from "@lib/constants";
import {useSettings} from "@components/settings/settings.context";

function useAnimateValue(value: number, duration: number) {
    const [current, setCurrent] = React.useState(value)

    React.useEffect(() => {
        const stepDuration = 1 / 50
        const totalSteps = duration / stepDuration
        const stepSize = (value - current) / totalSteps
        let currentStep = 0

        const interval = setInterval(() => setCurrent(current => {
            currentStep++
            if (currentStep >= totalSteps) {
                clearInterval(interval)
                return value
            }

            return current + stepSize
        }), stepDuration * 1000)

        return () => clearInterval(interval)
    }, [value, duration])

    return current
}

const AnimatePercentage = React.memo(({value, duration}) => {
    const v = useAnimateValue(value, duration)
    return Math.round(v * 100) / 100
})

// @ts-ignore
function _Progress({
                       progress = 0,
                       strokeWidth = 4,
                       ballStrokeWidth = 16,
                       reduction = 0.45,
                       transitionDuration = 0.5,
                       transitionTimingFunction = 'ease',
                       background = '#9398FB',
                       hideBall = false,
                       hideValue = false,
                       gradient = [{stop: 0.0, color: '#fffc9b'}, {stop: 1, color: '#5eaefd'}],
                       subtitle = "",
                       unit = "",

                   }) {

    const units = {'Mb/s': 128000, 'kB/s': 1024, 'MB/s': 1048576};
    const  {selectedUnit} =useSettings();

    progress =(progress/units[selectedUnit])
    progress = Math.round(progress * 100) / 100
   // console.log(subtitle +" "+ progress)
    const center = 118;
    const height = 300 || center + center * Math.cos(reduction * Math.PI)
    //const [unique] = React.useState(() => Math.random().toString())
    const rotate = 90 + 180 * reduction
    const r = center - strokeWidth / 2 - (ballStrokeWidth / 2)
    const circumference = Math.PI * r * 2
    const offset = circumference * (100 - progress * (1 - reduction)) / 100
    const x_diff = -10;
    const y_diff = -30;



    return (

            <svg viewBox={`0 0 272 245`} className={"w-[400px]"} >
                <defs>
                    <linearGradient id={"gradient" } x1="0%" y1="0%" x2="0%" y2="100%">
                        {gradient.map(({stop, color}) => <stop key={stop} offset={stop * 100 + "%"}
                                                               stopColor={color}/>)}
                    </linearGradient>
                    <filter id="ppp" x="-50" y="0.577148" width="361.873" height="361.873"
                            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dx="-1" dy="6"/>
                        <feGaussianBlur stdDeviation="10"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.48 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dx="4" dy="5"/>
                        <feGaussianBlur stdDeviation="6"/>
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"/>
                        <feBlend mode="normal" in2="shape" result="effect2_innerShadow"/>
                    </filter>
                </defs>

                {!hideValue &&
                <text x={center-x_diff+6} y={center-y_diff+20} textAnchor="middle" fontSize="58" fill="#fff">
                    {/*<AnimatePercentage value={progress} duration={transitionDuration}/>*/}
                    {(progress)}
                </text>
                }
                <text fontSize={"16"} x={center-x_diff+7} y={(center +5) * 3 / 4} textAnchor="middle" fill="#B7B7B7">{subtitle}</text>
                <text fontSize={"18"} x={center-x_diff+7} y={(center + 150)* 3 / 4} textAnchor="middle" fill="#B7B7B7">{unit}</text>
                <circle
                    transform={`rotate(${rotate} ${center} ${center})`}
                    id="path"
                    cx={center + x_diff}
                    cy={center + y_diff}
                    r={r}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * reduction}
                    fill="none"
                    stroke={'#17162F'}
                    filter="url(#ppp)"
                    strokeLinecap="round">
                </circle>
                <circle
                    style={{transition: `stroke-dashoffset ${transitionDuration}s ${transitionTimingFunction}`}}
                    transform={`rotate(${rotate} ${center} ${center})`}
                    id="path"
                    cx={center + x_diff}
                    cy={center + y_diff}
                    r={r}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference}`}
                    strokeDashoffset={offset}
                    fill="none"
                    stroke={`url(#gradient)`}
                    strokeLinecap="round">
                </circle>
                {!hideBall && <circle
                    style={{transition: `stroke-dashoffset ${transitionDuration}s ${transitionTimingFunction}`}}
                    transform={`rotate(${rotate} ${center} ${center})`}
                    id="path"
                    cx={center + x_diff}
                    cy={center + y_diff}
                    r={r}
                    strokeWidth={ballStrokeWidth}
                    strokeDasharray={`1 ${circumference}`}
                    strokeDashoffset={offset}
                    fill="none"
                    stroke={`url(#gradient)`}
                    strokeLinecap="round">
                </circle>}

                <g>
                    <g id="Group_1" transform="translate(57.55 57.808)">
                        <g id="Path_1">
                            <path fill={background} d="M182.6,139.5l-1.8-0.9c0.3-0.6,0.6-1.2,0.9-1.8l1.8,0.9C183.2,138.3,182.9,138.9,182.6,139.5z M-32.5,139
				c-0.3-0.6-0.7-1.2-1-1.8l1.8-1c0.3,0.6,0.6,1.2,1,1.7L-32.5,139z M188.9,125.8L187,125c0.2-0.6,0.5-1.2,0.7-1.9l1.9,0.7
				C189.4,124.5,189.1,125.1,188.9,125.8z M-39.1,125.4c-0.3-0.6-0.5-1.3-0.7-1.9l1.9-0.7c0.2,0.6,0.5,1.2,0.7,1.8L-39.1,125.4z
				 M193.4,111.3l-1.9-0.5c0.2-0.6,0.3-1.3,0.5-1.9l1.9,0.4C193.7,110,193.6,110.7,193.4,111.3z M-43.8,111c-0.2-0.7-0.3-1.3-0.5-2
				l1.9-0.5c0.2,0.6,0.3,1.3,0.5,1.9L-43.8,111z M196.1,96.5l-2-0.2c0.1-0.7,0.1-1.3,0.2-2l2,0.2C196.3,95.1,196.2,95.8,196.1,96.5z
				 M-46.6,96.1c-0.1-0.7-0.1-1.3-0.2-2l2-0.2c0.1,0.7,0.1,1.3,0.2,2L-46.6,96.1z M195,81.4c0-0.7,0-1.3,0-2l2,0c0,0.7,0,1.3,0,2
				L195,81.4z M-45.2,81.1l-2-0.1c0-0.7,0-1.3,0.1-2l2,0.1C-45.2,79.8-45.2,80.4-45.2,81.1z M193.9,66.5c-0.1-0.7-0.2-1.3-0.3-2
				l2-0.3c0.1,0.7,0.2,1.3,0.3,2L193.9,66.5z M-43.8,66.3l-2-0.3c0.1-0.7,0.2-1.3,0.3-2l2,0.4C-43.6,65-43.7,65.7-43.8,66.3z
				 M191.1,52c-0.2-0.6-0.3-1.3-0.5-1.9l1.9-0.5c0.2,0.6,0.4,1.3,0.5,1.9L191.1,52z M-40.5,51.8l-1.9-0.6c0.2-0.6,0.4-1.3,0.6-1.9
				l1.9,0.6C-40.1,50.6-40.3,51.2-40.5,51.8z M-35.3,37.9l-1.8-0.8c0.3-0.6,0.5-1.2,0.8-1.8l1.8,0.8C-34.8,36.7-35.1,37.3-35.3,37.9
				z M186.4,37.8c-0.2-0.6-0.5-1.2-0.7-1.8l1.8-0.8c0.3,0.6,0.5,1.2,0.8,1.9L186.4,37.8z M-28.5,24.7l-1.7-1c0.3-0.6,0.7-1.2,1-1.7
				l1.7,1C-27.9,23.5-28.2,24.1-28.5,24.7z M180.1,24.4c-0.3-0.6-0.6-1.2-1-1.7l1.7-1c0.3,0.6,0.7,1.2,1,1.8L180.1,24.4z
				 M-20.3,12.3l-1.6-1.2c0.4-0.5,0.8-1.1,1.2-1.6l1.6,1.2C-19.4,11.3-19.9,11.8-20.3,12.3z M172.1,11.8c-0.4-0.5-0.8-1.1-1.2-1.6
				l1.6-1.2c0.4,0.5,0.8,1.1,1.2,1.6L172.1,11.8z M-10.6,1l-1.5-1.4c0.5-0.5,0.9-1,1.4-1.5l1.4,1.4C-9.7,0-10.2,0.5-10.6,1z
				 M162.7,0.4c-0.4-0.5-0.9-1-1.4-1.4l1.4-1.4c0.5,0.5,0.9,1,1.4,1.5L162.7,0.4z M0.2-9.2l-1.3-1.5c0.5-0.4,1-0.9,1.6-1.3l1.3,1.5
				C1.2-10.1,0.7-9.7,0.2-9.2z M151.9-9.8c-0.5-0.4-1-0.8-1.5-1.3l1.3-1.6c0.5,0.4,1,0.8,1.6,1.3L151.9-9.8z M12.1-18.2L11-19.8
				c0.6-0.4,1.1-0.7,1.7-1.1l1.1,1.7C13.2-18.9,12.7-18.5,12.1-18.2z M139.9-18.6c-0.6-0.4-1.1-0.7-1.7-1.1l1.1-1.7
				c0.6,0.4,1.1,0.7,1.7,1.1L139.9-18.6z M24.9-25.7L24-27.5c0.6-0.3,1.2-0.6,1.8-0.9l0.9,1.8C26.1-26.3,25.5-26,24.9-25.7z
				 M126.9-26c-0.6-0.3-1.2-0.6-1.8-0.9l0.9-1.8c0.6,0.3,1.2,0.6,1.8,0.9L126.9-26z M38.6-31.6l-0.7-1.9c0.6-0.2,1.3-0.5,1.9-0.7
				l0.7,1.9C39.8-32,39.2-31.8,38.6-31.6z M113.3-32c-0.6-0.2-1.2-0.4-1.9-0.7l0.6-1.9c0.6,0.2,1.3,0.4,1.9,0.7L113.3-32z
				 M52.8-35.8l-0.4-2c0.7-0.1,1.3-0.3,2-0.4l0.4,2C54.1-36.1,53.5-35.9,52.8-35.8z M99.1-36.1c-0.6-0.1-1.3-0.3-1.9-0.4l0.4-2
				c0.7,0.1,1.3,0.3,2,0.4L99.1-36.1z M67.5-38l-0.2-2c0.7-0.1,1.3-0.1,2-0.2l0.1,2C68.8-38.2,68.2-38.1,67.5-38z M84.4-38.2
				c-0.7,0-1.3-0.1-2-0.1l0.1-2c0.7,0,1.3,0.1,2,0.1L84.4-38.2z"/>
                        </g>
                    </g>
                    <g id="Path_2">
                        <path fill={background} d="M22.9,205.7c0.1,6.4-6.9,4.3-5.6-1.4C17.2,198,24.2,200,22.9,205.7z M21.7,204.1c0.4-1.8-1.5-3.9-3-2.1
			c-0.7,1.8-0.6,4.2,0,6C21.3,210.5,22.1,206,21.7,204.1z"/>
                    </g>
                    <g id="Path_3">
                        <path fill={background} d="M2.9,115l0.5-4.5h4.6v1.1H4.3L4,114c3-1.8,5.5,2.5,3.4,4.8c-1.5,1.6-4.8,0.7-4.9-1.7h1.1c0,1.5,2,2.1,3,1
			c1.6-1.9-0.9-4.8-2.8-2.9L2.9,115z"/>
                    </g>
                    <g id="Path_4">
                        <path fill={background} d="M247.8,209.5h-1.1v-7.6l-2.3,0.8v-1c0.2,0,3.3-1.3,3.4-1.2L247.8,209.5z"/>
                    </g>
                    <g id="Path_5">
                        <path fill={background} d="M256.7,205.7c0.8,4.9-6.3,5.2-5.6,0.2c0-1.5-0.2-3.2,0.7-4.4C255,198.5,257.4,202.5,256.7,205.7z
			 M255.6,204.1c0.4-1.8-1.5-3.9-3-2.1c-0.7,1.8-0.6,4.2,0,6C255.2,210.5,255.9,206,255.6,204.1z"/>
                    </g>
                    <g id="Path_6">
                        <path fill={background} d="M263.8,205.7c0.1,6.4-6.9,4.3-5.6-1.4C258.1,198,265.1,200,263.8,205.7z M262.6,204.1
			c0.4-1.8-1.5-3.9-3-2.1c-0.7,1.8-0.6,4.2,0,6C262.2,210.5,263,206,262.6,204.1z"/>
                    </g>
                    <g id="Path_7">
                        <path fill={background} d="M29.4,196.7c0,3.2-5,3.2-5,0C24.3,193.4,29.4,193.4,29.4,196.7z"/>
                    </g>
                    <g id="Path_8">
                        <path fill={background} d="M241.4,196.9c0,2.4-3.8,2.4-3.8,0C237.6,194.4,241.4,194.4,241.4,196.9z"/>
                    </g>
                    <g id="Path_9">
                        <path fill={background} d="M128.7,6.8c5.5,0.4,0.9-6.2-0.6-1.6H127c0.4-5.2,8.9-0.9,4,2c5.2,2.9-3.6,7.7-4.1,2.2h1.1
			c1.6,4.8,6.4-2.3,0.7-1.7L128.7,6.8z"/>
                    </g>
                    <g id="Path_10">
                        <path fill={background} d="M139.8,8.1c0.8,4.9-6.3,5.2-5.6,0.2c0-1.5-0.2-3.2,0.7-4.4C138,0.8,140.4,4.9,139.8,8.1z M138.6,6.5
			c0.4-1.8-1.5-3.9-3-2.1c-0.7,1.8-0.6,4.2,0,6C138.2,12.9,139,8.4,138.6,6.5z"/>
                    </g>
                    <g id="Path_11">
                        <path fill={background} d="M264,111.2l-3.7,8.3h-1.2l3.7-8h-4.8v-0.9h6L264,111.2z"/>
                    </g>
                    <g id="Path_12">
                        <path fill={background} d="M270.9,115.7c0.1,6.4-6.9,4.3-5.6-1.4C265.2,108,272.2,110,270.9,115.7z M269.7,114.1
			c0.4-1.8-1.5-3.9-3-2.1c-0.6,1.1-0.4,2.7-0.4,3.8c-0.4,1.7,1.5,4,2.9,2.2C269.9,117,269.7,115.3,269.7,114.1z"/>
                    </g>
                    <g id="Path_13">
                        <path fill={background}
                              d="M46.1,42.1h-5.9v-0.8c8.9-8.1,0.9-8.8,1-5.5h-1.1c0.6-5.5,11.1-2.7,1.5,5.4h4.5L46.1,42.1z"/>
                    </g>
                    <g id="Path_14">
                        <path fill={background} d="M52.9,38.3c0.8,4.9-6.3,5.2-5.6,0.2c0-1.5-0.2-3.2,0.7-4.4C51.2,31.1,53.6,35.1,52.9,38.3z M51.8,36.7
			c0.4-1.8-1.5-3.9-3-2.1c-0.6,1.1-0.4,2.7-0.4,3.8c-0.4,1.7,1.5,4,2.9,2.2C52,39.6,51.8,37.9,51.8,36.7z"/>
                    </g>
                    <g id="Path_15">
                        <path fill={background} d="M213.6,37.6l0.5-4.5h4.6v1.1h-3.6l-0.3,2.4c3-1.8,5.5,2.5,3.4,4.8c-1.5,1.6-4.8,0.7-4.9-1.7h1.1
			c0,1.5,2,2.1,3,1c1.6-1.9-0.9-4.8-2.8-2.9L213.6,37.6z"/>
                    </g>
                    <g id="Path_16">
                        <path fill={background} d="M225.8,38.3c0.8,4.9-6.3,5.2-5.6,0.2c0-1.5-0.2-3.2,0.7-4.4C224.1,31.1,226.5,35.1,225.8,38.3z
			 M224.7,36.7c0.4-1.8-1.5-3.9-3-2.1c-0.6,1.1-0.4,2.7-0.4,3.8c-0.4,1.7,1.5,4,2.9,2.2C224.8,39.6,224.6,37.9,224.7,36.7z"/>
                    </g>
                    <g id="Path_17">
                        <path fill={background}
                              d="M253.8,116.4c0,2.4-3.8,2.4-3.8,0C250,114,253.8,114,253.8,116.4L253.8,116.4z"/>
                    </g>
                    <g id="Path_18">
                        <path fill={background} d="M58.5,46.8c0,2.4-3.8,2.4-3.8,0C54.7,44.3,58.5,44.3,58.5,46.8z"/>
                    </g>
                    <g id="Path_19">
                        <path fill={background} d="M211.9,46.6c0,2.4-3.8,2.4-3.8,0C208.1,44.1,212,44.1,211.9,46.6z"/>
                    </g>
                    <g id="Path_20">
                        <path fill={background} d="M135.3,19.2c0,2.4-3.8,2.4-3.8,0C131.5,16.8,135.3,16.8,135.3,19.2z"/>
                    </g>
                    <g id="Path_21">
                        <path fill={background} d="M17,116.4c0,2.4-3.8,2.4-3.8,0C13.2,113.9,17.1,113.9,17,116.4z"/>
                    </g>
                </g>
            </svg>

        )
}

export const Progress = React.memo(_Progress)
Progress.displayName = "Progress"

export default Progress
