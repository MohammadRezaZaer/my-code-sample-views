import cn from "classnames";
import {useTranslation} from "next-i18next";
import Image from "next/image";
import Button from "@components/ui/button";
import {Apple} from "@components/icons/apple";
import {Element} from "react-scroll";
import {Android} from "@components/icons/android";

type BannerProps = {

    className?: string;
};
const AppsScene: React.FC<BannerProps> = ({className}) => {
    const {t} = useTranslation("banner");

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {/*<div className="min-h-140 overflow-hidden -z-1">*/}
            {/*<Image*/}
            {/*  alt={banner?.heading}*/}
            {/*  src={banner?.image ?? "/banner/grocery.png"}*/}
            {/*  layout="fill"*/}
            {/*  objectFit="cover"*/}
            {/*/>*/}
            {/*</div>*/}
            <div className="p-5 mt-8  inset-0 w-full flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl xl:text-6xl text-light2 font-medium mb-5 xl:mb-8">
                    {t("TryMySpeed For iOS & Android")}
                </h2>
                <p className="xl:text-lg text-light mb-10 xl:mb-14 xl:mx-40">
                    {t("Your Android phone is only as good as the network it’s connecting to. Find out how fast the internet is anywhere in the world with the free Speedtest Android app and the help of our massive global server network.\n" +
                        "Your Android phone is only as good as the network it’s connecting to. ")}
                </p>
                <div className="w-[350px] lg:w-[458px]
                  mb-20 overflow-hidden z-10">
                    <Image
                        alt="TryMySpeed For iOS & Android"
                        src="/banner/phones.png"
                        layout="responsive"
                        loading="lazy"
                        width={458}
                        height={478}
                    />


                </div>
                <div className="absolute top-[6%] left-[25%] bulb "/>
                <div className="absolute top-[-32%] right-[-17%] bulb  opacity-10"/>
                <div className="absolute bottom-[-32%] left-[-17%] bulb  opacity-10"/>
                <div className="flex flex-col lg:flex-row">

                    <div className="flex text-light m-5 items-center flex-row justify-center">
                        <div className="mx-4">Download Android App</div>
                        <Button className="font-semibold " size="medium" variant="dark">
                            <span className="mr-3"><Android/></span>{t("Google Play")}
                        </Button>
                    </div>
                    <Element
                        name="grid"
                        className="flex flex-1 border-l-0 lg:border-l-2 border-solid border-border-100 border-opacity-70"
                    >
                        <div className="flex text-light m-5 items-center flex-row justify-center">
                            <Button className="font-semibold " size="medium" variant="dark">
                                <span className="mr-3"><Apple/></span>{t("Apple store")}
                            </Button>
                            <div className="mx-4">Download IOS App</div>
                        </div>
                    </Element>
                </div>
                {/*<div className="max-w-3xl w-full">*/}
                {/*  <Search label="search" />*/}
                {/*</div>*/}

            </div>
        </div>
    );
};

export default AppsScene;
