
import React from "react";
import Logo from "@components/ui/logo";
import Link from "@components/ui/link";
import { useTranslation } from 'next-i18next';
import {ROUTES} from "@lib/routes";
import {siteSettings} from "@settings/site";

function Footer() {
    const { t } = useTranslation('common');

    return (
        <>
            <footer className="footer bg-dark w-full relative md:mt-[121px]">
                <div className="container mx-auto ">
                    <div className="flex flex-col md:flex-row justify-center items-center mt-10 mb-8 text-light">
                        <Link
                            href={ROUTES.ABOUT_US}
                            className="font-normal  m-4  flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
                        >
                            {t("About-Us")}
                        </Link>
                        <Link
                            href={ROUTES.PRIVACY}
                            className="font-normal  m-4  flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
                        >
                            {t("Privacy-Policy")}
                        </Link>
                        <Link
                            href={ROUTES.CONTACT}
                            className="font-normal  m-4  flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
                        >
                            {t("Give-Us-Feedback")}
                        </Link>
                    </div>
                    <div className="sm:flex border-t border-solid border-border-200 border-opacity-70">
                        <div className="mb-8 mt-16  w-full px-8 flex flex-col lg:flex-row justify-between items-center ">
                            <div className="flex flex-col m-3">
                                <Logo className="mx-auto lg:mx-0" />

                            </div>
                            <div className="flex flex-col m-3">
                                <span
                                    className="font-normal text-light ">Copyright © 2021 TryMySpeed.com</span>

                            </div>
                            <div className="flex flex-col m-3 mb-16 xl:mb-5">


                                    <div className="flex items-center justify-start">
                                        {siteSettings.author.social?.map((item, index) => (
                                            <a
                                                key={index}
                                                href={item.link}
                                                target="_blank"
                                                className={`text-muted focus:outline-none me-8 last:me-0 transition-colors duration-300 hover:${item.hoverClass}`}
                                            >
                                                {item.icon}
                                            </a>
                                        ))}
                                    </div>


                            </div>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    );
}

export default Footer;
