import React, {useEffect, useMemo, useRef} from 'react';
import {prepareDataForChart} from "@lib/prepare-data-for-chart";
import {useSettings} from "@components/settings/settings.context";

type State = typeof initialState;
const initialState = {logs: [], mode: ''};
export const LogsContext = React.createContext<State | any>(initialState);

LogsContext.displayName = 'LogsContext';

export const LogsProvider: React.FC = (props) => {
    const [state, dispatch] = React.useState(initialState);
    const {selectedUnit} = useSettings();
    const chartData = React.useMemo(
        () => {
            console.log("calculate Executed");
            return prepareDataForChart(state.logs, selectedUnit)
        },
        [state.logs,selectedUnit]
    );
    const value = React.useMemo(
        () => {
            // console.log(state)
            return ({readyLogs: chartData, mode: state.mode, setLogs: dispatch})
        },
        [state,selectedUnit]
    );
    // const prevValue = usePrevious(value)
    //
    console.log("value", value);
    // console.log("prevValue",prevValue);

    return <LogsContext.Provider value={value} {...props} />;
};

export const useLogs = () => {
    const context = React.useContext(LogsContext);
    if (context === undefined) {
        throw new Error(`useLogs must be used within a LogsProvider`);
    }
    return context;
};

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}