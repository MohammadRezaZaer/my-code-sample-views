import React, {FC, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";

export interface State {
    url: string;
    isPlaying: boolean;
}

const initialState = {
    url: "",
    isPlaying: false
};

export const AudioContext = React.createContext<State | any>(initialState);

AudioContext.displayName = "AudioContext";

export const AudioProvider: FC = (props) => {
    const [gurl, updateUrl] = useState("");
    const [gplaying, setPlaying] = useState(false);
    const [audio, setAudio] = useState(typeof Audio !== "undefined" && new Audio("data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"));

    const { query } = useRouter();



    useEffect(() => {
        setPlaying(false);
    }, [query]);

    useEffect(() => {
            // console.log("gplaying", gplaying);
            if (audio) {
                gplaying ? audio.play() : audio.pause();
            }

        },
        [gplaying]
    );


    useEffect(() => {
        if (audio) {
            console.log("rendered");
            // console.log(audio);

            window.addEventListener('touchstart', () => {
                audio.autoplay = true;
                // audio.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
                // audio.play();
            })
            audio.addEventListener('ended', () => {setPlaying(false);});
            audio.addEventListener('error', () => setPlaying(false));
            return () => {
                audio.removeEventListener('ended', () => setPlaying(false));
            };
        }
    }, []);

    const setSource = (vurl) => {
        if (gurl !== vurl) {
            updateUrl (vurl) ;
            audio.src = vurl;
            //audio.pause();
            //setAudio(new Audio(vurl))
            if(gplaying){
                setTimeout(() => {
                    setPlaying(false);
                    //console.log("setSource gurl, audio, gplaying",gurl, audio, gplaying);
                }, 1);
                setTimeout(() => {
                    setPlaying(true)
                }, 1);
            }else setPlaying(true);
        }
    }

    const pause = () => {
         //console.log("toggle gurl, audio, gplaying",gurl, audio, gplaying);
            setPlaying(false);
    }
    const play = () => {
        //console.log("toggle gurl, audio, gplaying",gurl, audio, gplaying);
        setPlaying(true);
    }
    const stop = () => {
        if (gplaying && audio) {
            audio.pause();
            audio.currentTime = 0;
            setPlaying(false);
        }
    };




    const value = useMemo(
        () => ({
            gurl,
            updateUrl,
            play,
            stop,
            pause,
            gplaying,
            setSource,
        }),
        [gurl, gplaying, updateUrl, pause,play, stop]
    );

    return <AudioContext.Provider value={value}  {...props} />;
};

export const useAudioGlobal = () => {
    const context = React.useContext(AudioContext);
    if (context === undefined) {
        throw new Error(`useAudioGlobal must be used within a AudioProvider`);
    }
    return context;
};
// const useAudio = url => {
//   const [audio] = useState(typeof Audio !== "undefined" && new Audio(url));
//   const [playing, setPlaying] = useState(false);
//
//   const toggle = () => setPlaying(!playing);
//   const stopfn = () => {
//     if(playing){
//       audio.pause();
//       audio.currentTime = 0;
//       setPlaying(false);
//
//     }
//   };
//
//   useEffect(() => {
//         playing ? audio.play() : audio.pause() ;
//
//       },
//       [playing]
//   );
//
//
//
//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false));
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false));
//     };
//   }, []);
//
//   return [playing, toggle, stopfn];
// };