
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import cn from "classnames";
import Image from "next/image";
import Button from "@components/ui/button";
import {Android} from "@components/icons/android";
import {Element} from "react-scroll";
import {Apple} from "@components/icons/apple";
import Link from "@components/ui/link";
import {getLayout} from "@components/layouts/layout";


export default function IosPage() {
    const {t} = useTranslation();
    return (
<>
        <div className="container flex-grow p-5  mt-16 w-full flex flex-col md:flex-row flex-wrap items-center justify-center ">
            <div className={"p-8 md:w-1/2 md:text-left text-center items-center leading-relaxed justify-center"}>
                <h1 className=" text-4xl xl:text-5xl xl:leading-relaxed leading-relaxed text-light2 font-medium mb-4  ">
                    Download TryMySpeed for iOS
                </h1>
                <p className="text-2xl text-[#FEFFFF] mb-6 ">
                    {"Your IOS phone is only as good as the network it’s connecting to."} </p>
                <ul className="text-[#C4C4C4] md:list-disc 	md:ml-5 mb-6">
                    <li>Internet freedom on your ios devices</li>
                    <li>good as the network it’s connecting to.</li>
                    <li>Internet freedom on your ios devices</li>
                </ul>
                <div className=" text-light   ">
                    <Link href="http://google.com">

                    <Button className="font-semibold"  size="medium" variant="dark">
                        <span className="mr-3"><Apple/></span>{t("Apple store")}
                    </Button>
                    </Link>

                </div>
            </div>
            <div className=" relative  z-10 md:w-1/2 w-3/4 max-w-prose order-first	md:order-2 p-5">
                    <div className=" absolute top-[-33%]  right-[0] bulb "/>
                <div className="absolute top-[0] right-[0] w-full  ">

                    <Image
                        alt="TryMySpeed For iOS Backgground"
                        src="/banner/iosback.png"
                        layout="responsive"
                        loading="lazy"
                        width={"600px"}
                        height={"600px"}
                    />
                </div>
                <div className="w-[88%] m-auto">
                <Image
                    alt="TryMySpeed For iOS Background"
                    src="/banner/iospagepic.png"
                    layout="responsive"
                    loading="lazy"
                    width={"100%"}
                    height={"100%"}
                />
                </div>

            </div>




        </div>

    </>
    );
}

IosPage.getLayout = getLayout;

export const getStaticProps = async ({locale}: any) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "faq"])),
        },
    };
};
