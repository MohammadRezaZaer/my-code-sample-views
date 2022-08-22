import {useUI} from "@contexts/ui.context";

import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import Image from "next/image";
import Pencil from "@components/icons/pencil";
import {UserIcon} from "@components/icons/user-icon";


export default function FilterBar({wordsCount}) {
    const {t} = useTranslation("common");
    const {openSidebar, setSidebarView} = useUI();
    const {query} = useRouter();
    const router = useRouter();
    let {category} = query;
    if (!category) {
        category = "1";
    }
     //console.log(wordsCount);
    function handleNavigate() {

        router.push("/")
        // setSidebarView("FILTER_VIEW");
        // return openSidebar();
    }

    return (
        <div
            className=" m-4 flex flex-col xl:hidden items-center justify-between py-3 px-5 lg:px-7 bg-light rounded-3xl">
            <div className={"flex justify-between w-full my-2"}>
                <button
                    onClick={handleNavigate}
                    className="flex items-center h-8 md:h-10 py-1 md:py-1.5 px-6 md:px-4 text-sm  bg-accent  rounded-xl  font-semibold text-light  duration-200 focus:outline-none  hover:bg-accent-hover"
                >
                    {/*<FilterIcon width="18" height="14" className="me-2" />*/}
                    {t("text-filter")}
                </button>
                {/*<ProductTypeMenu btnClassName="text-heading transition-colors duration-200 hover:text-accent focus:text-accent" />*/}
                <span className="font-bold text-xl">  {category === "1" && "مبتدی" || category === "2" && "متوسط" || category === "3" && "پیشرفته"}</span>
            </div>
            <div className="flex w-full justify-between bg-[#ffeac8] rounded-xl text-center ">
                <div className="relative overflow-hidden flex flex-col justify-between items-center w-full p-2">
                    <div className="absolute w-full h-full opacity-50">

                        <Image
                            alt={"bubbles"}
                            src={"/banner/bubbles.svg"}
                            layout="fill"

                        />
                    </div>
                    <div className="flex justify-between w-full">
                        <div>1/{wordsCount}</div>
                        <div>لغات یاد گرفته شده</div>
                    </div>

                    <div className="z-1 w-full bg-gray-100 flex justify-end rounded-full">
                        <div className="rounded-full py-0.5 text-xs text-center h-[10px] text-accent bg-gray-500 w-[5%]"/>
                    </div>

                    <span className="self-start">1%</span>

                </div>
                <div className="flex">
                    <Image
                        alt={"person"}
                        src={"/banner/level_bg_2.png"}
                        layout="fixed"
                        objectFit="contain"
                        width={"150px"}
                        height={"150px"}

                    />
                </div>


            </div>
            <div className={"flex justify-between w-full my-2"}>
                <button
                    // onClick={handleNavigate}
                    className="flex bg-light items-center h-8 md:h-10 py-4 px-2 rounded border-grey-500 border-2 font-semibold transition-colors duration-150  hover:border-accent-hover  hover:bg-accent-hover "
                >
                    {/*<FilterIcon width="18" height="14" className="me-2" />*/}
                    ویرایش اطلاعات
                    <Pencil className="px-1" width={20} height={20} />
                </button>
                {/*<ProductTypeMenu btnClassName="text-heading transition-colors duration-200 hover:text-accent focus:text-accent" />*/}
                <span className="flex gap-2">
                    نام کاربر
                <UserIcon/>
                </span>
            </div>
        </div>
    );
}
