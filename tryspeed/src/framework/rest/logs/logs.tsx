import ErrorMessage from '@components/ui/error-message';
import {LogView} from "@framework/logs/log-view";
import {useState} from "react";
import {useLogsQuery} from "@framework/logs/logs.query";
import Spinner2 from "@components/ui/spinner2";

const Logs = () => {
    const {
        data,
        isFetching: loading,
        error,
    } = useLogsQuery();

    if (error) {
        console.log(error)
        return <ErrorMessage message={error.message}/>
    }
    ;


    //const [ddata, setData] = useState(dummy);

    //console.log('logs me data', data);
    if (data) {
        return (
            // <div />
            <LogView logs={data?.pages[0]?.logs}/>
            // <div>
            //   <pre>{JSON.stringify(data, null, 2)}</pre>
            // </div>
        );
    } else {
        return (<Spinner2/>)
    }

};

export default Logs;
