import classNames from "classnames";
import React from "react";
import Alert from "@components/ui/alert";
import {useServersQuery} from "@framework/app/settings.query";
import {useIsServerAvailableQuery} from "@framework/app/is-server-available.query";
import Spinner2 from "@components/ui/spinner2";

interface ChangeserverListItemProps {
    ChangeserverListItem: any;
    checked: boolean;
}

const ChangeserverListCard: React.FC<ChangeserverListItemProps> = ({checked, ChangeserverListItem}) => {
    // console.log(checked);
    if(checked && !ChangeserverListItem.isAvailableStatus){
        const { data, isLoading: loading, error } = useIsServerAvailableQuery(ChangeserverListItem);
        if(!loading&&!error&&data.data.status==="Available"){
            console.log(data.data.status);
           ChangeserverListItem.isAvailableStatus=true
        }
    }

    return (
        <>
            <div
                className={classNames(
                    "text-left relative p-4 rounded border cursor-pointer group hover:border-accent",
                    {
                        "text-light border-accent shadow-sm": checked,
                        "text-light border-white border-opacity-30 shadow-sm": (checked && !ChangeserverListItem.isAvailableStatus),
                        "text-textBlue border-transparent": !checked,
                    }
                )}
            >
            <span className="font-semibold block m-1">
              {ChangeserverListItem.shortName} - <span className={"text-[#676680]"}>{ChangeserverListItem.location}</span>
            </span>
            {(checked && !ChangeserverListItem.isAvailableStatus) && (
<Spinner2 className="absolute"/>
                    )}

            </div>

        </>
    );

};

export default ChangeserverListCard;
