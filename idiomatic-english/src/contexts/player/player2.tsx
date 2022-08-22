import Pause from "@components/common/pause";
import Sound from "@components/common/sound";
import Stop from "@components/common/stop";
import {useEffect, useState} from "react";
import {useAudioGlobal} from "./audio.context";
import Play from "@components/common/play";


const Player2 = ({haveStopBtn, purl}) => {
    const {stop, pause, play, gplaying, gurl, setSource} = useAudioGlobal();
    // console.log("purl,gurl",purl, gurl)
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
            //console.log("gplaying,changed",gplaying,changed);
            if ( (purl!==gurl)) {
                playing && setPlaying(false);
            }else{
                setPlaying(gplaying)
            }
        },
        [gplaying, gurl]
    );
    return (

        <>
            {playing ?
                <>
                    <Pause onPlayerClick={() => {
                    setPlaying(false);
                    pause();
                }}/> {haveStopBtn && <Stop onPlayerClick={() => {
                    stop();
                    setPlaying(false);
                }}/>}
                </> :
                <>
                <Sound onPlayerClick={()=> {
                   // console.log("Play purl,",purl)
                }}/>
                    <Play onPlayerClick={() => {
                        //console.log("Play purl,",purl)
                        setSource(purl);
                        setPlaying(true);
                        play();
                    }}/>
                </>
            }

        </>

    );
};

export default Player2;
