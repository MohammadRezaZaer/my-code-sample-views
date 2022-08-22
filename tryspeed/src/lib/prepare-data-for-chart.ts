import {useMemo} from "react";
import {BOTH, DOWNLOAD, Mb, UPLOAD} from "@lib/constants";

export function prepareDataForChart(rawChartData: object | undefined, selectedUnit: string) {


    // const downloads =  rawChartData?.downloadChartData?.map(([sec, value]) => ({sec, value}));
    // const uploads = rawChartData?.uploadChartData?.map(([sec, value]) => ({sec, value}));
    // return [
    //     uploads && {
    //         name: UPLOAD,
    //         data: [...uploads]
    //     }
    //     , downloads && {
    //         name: DOWNLOAD,
    //         data: [...downloads]
    //     }
    // ];
    const changeUnit = selectedUnit === Mb ? 1 : 8;
    const downloads = rawChartData?.downloadChartData;
    const uploads = rawChartData?.uploadChartData;
    //console.log("uploads", uploads);
    //console.log("downloads", downloads);

    let mapped=[];
    if (downloads) {

        mapped =
            downloads.map(function (x, i) {
                const upload = (uploads[i] === undefined ? 0 : (uploads[i][1] / changeUnit));
                const download = (x[1] / changeUnit);
                //console.log("x[1],download,changeUnit",x[1],download,changeUnit)

                //console.log("x[0],upload",x[0],upload);
                return {time: Number(x[0]).toFixed(1) , download, upload}


            })

        //console.log("mapped", mapped)
    }
    return mapped;
}