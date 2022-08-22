import { SPEEDTEST } from '@lib/constants';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import {Server} from "@framework/types";


interface SpeedTestState {
    server: Server | null;
    [key: string]: unknown;

}
export const defaultSpeedTest: SpeedTestState = {
    server: null,

};

// Original atom.
export const speedtestAtom = atomWithStorage(SPEEDTEST, defaultSpeedTest);
export const clearSpeedtestAtom = atom(null, (_get, set, _data) => {
  return set(speedtestAtom, defaultSpeedTest);
});

export const selectedServerAtom = atom(
  (get) => get(speedtestAtom).server,
  (get, set, data: Server) => {
    const prev = get(speedtestAtom);
    return set(speedtestAtom, { ...prev, server: data });
  }
);

