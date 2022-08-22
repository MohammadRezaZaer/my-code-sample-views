import Image from "next/image";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
import {useEffect} from "react";
import {useModalAction} from "@components/ui/modal/modal.context";
import {useCart} from "../../store/quick-cart/cart.context";

export default function Catselect() {
    const router = useRouter();
    const handleNavigate = (id: number) => {
        router.push(`/main/?category=${id}`)
    };
    const {openModal} = useModalAction();

    const {
        isFirst
    } = useCart();

    useEffect(() => {
        isFirst && openModal("INSTALL_VIEW")
    }, []);

    return (
        <>
            <div className={"flex flex-col  bg-white h-screen "}>
                <div className=" flex-[0.7] text-right bg-accent relative ">
                    <div>
                        <Image
                            src="/catpage.svg"
                            alt={("category_main_page")}
                            layout={"fill"}
                        />
                    </div>
                    <div className={"waveback absolute w-full h-[96px]  md:h-[130px] lg:h-[190px] "}/>
                </div>
                <div className={"flex flex-col gap-4 xl:mt-[-1rem] mb-6 z-1 self-center w-full md:w-1/2"}>
                    <p className={"text-right dir-right p-4"}>سطح زبان مورد نظر را انتخاب نمایید:</p>

                    <motion.button
                        whileTap={{scale: 0.88}}
                        onClick={() => handleNavigate(1)}
                        className="relative  min-h-[60px] p-4 bg-gradient-to-l text-white font-bold from-[#fe1010] mx-4 rounded-2xl text-right"
                    >
                        <p>مبتدی</p>
                        <p>beginner</p>
                        <Image
                            alt={"star"}
                            src={"/banner/star1.svg"}
                            layout="fixed"
                            width="23px"
                            height="23px"
                        />
                        <div className=" w-full h-full opacity-50">

                            <Image
                                alt={"bubbles"}
                                src={"/banner/bubbles.svg"}
                                layout="fill"

                            />
                        </div>
                    </motion.button>
                    <motion.button
                        whileTap={{scale: 0.88}}
                        onClick={() => handleNavigate(2)}
                        className={"relative min-h-[60px] p-4 bg-gradient-to-l text-white font-bold from-[#30f10c] mx-4 rounded-2xl text-right"}>
                        <p>متوسط</p>
                        <p>Intermediate</p>
                        <Image
                            alt={"bubbles"}
                            src={"/banner/star1.svg"}
                            layout="fixed"
                            width="23px"
                            height="23px"
                        />
                        <Image
                            alt={"bubbles"}
                            src={"/banner/star1.svg"}
                            layout="fixed"
                            width="23px"
                            height="23px"
                        />

                        <div className=" w-full h-full opacity-50">

                            <Image
                                alt={"bubbles"}
                                src={"/banner/bubbles.svg"}
                                layout="fill"

                            />
                        </div>
                    </motion.button>
                    <motion.button
                        whileTap={{scale: 0.88}}
                        onClick={() => handleNavigate(3)}
                        className={"relative min-h-[60px] p-4 bg-gradient-to-l text-white font-bold from-[#0507fc] mx-4 rounded-2xl text-right"}>
                        <p>پیشرفته</p>
                        <p>Advanced</p>
                        <Image
                            alt={"bubbles"}
                            src={"/banner/star1.svg"}
                            layout="fixed"
                            width="23px"
                            height="23px"
                        />
                        <Image
                            alt={"bubbles"}
                            src={"/banner/star1.svg"}
                            layout="fixed"
                            width="23px"
                            height="23px"
                        />
                        <Image
                            alt={"bubbles"}
                            src={"/banner/star1.svg"}
                            layout="fixed"
                            width="23px"
                            height="23px"
                        />
                        <div className=" w-full h-full opacity-50">

                            <Image
                                alt={"bubbles"}
                                src={"/banner/bubbles.svg"}
                                layout="fill"

                            />
                        </div>
                    </motion.button>
                </div>

            </div>


        </>
    );
}
