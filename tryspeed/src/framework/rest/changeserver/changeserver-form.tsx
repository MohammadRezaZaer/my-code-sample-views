import {
    useModalAction,
    useModalState,
} from '@components/ui/modal/modal.context';
import Button from "@components/ui/button";
import cn from "classnames";
import {useTranslation} from "next-i18next";
import SearchBox from "@components/ui/search/search-box";
import {useSearch} from "@components/ui/search/search.context";
import Pencil from "@components/icons/pencil";
import ChangeServerList from "@framework/changeserver/changeserverlist/change-server-list";

const ServerChangeView = () => {
    const {t} = useTranslation('common');
    const { searchTerm, updateSearchTerm } = useSearch();
    const {data} = useModalState();
    const {closeModal} = useModalAction();

    // const { mutate: deleteAddressById, isLoading } = useDeleteAddressMutation();

    function handleDelete() {
        // deleteAddressById({ id: data?.addressId });
        closeModal();
    }

    return (
        <div className="p-4 pb-6 bg-[#1D1B45] text-[#D3D2E1] shadow-700 m-auto max-w-sm w-full rounded-md md:rounded-xl sm:w-[24rem]">
            <div className="w-full h-full text-center">
                <div className="flex h-full flex-col justify-between">

                    <ChangeServerList

                        label={t('text-select-host')}

                    />



                </div>
            </div>
        </div>
    );
};

export default ServerChangeView;
