import Layout from "@components/layout/layout";
import { termsAndServices } from "@settings/terms.settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import {motion} from "framer-motion";
import {useRouter} from "next/router";
import {ROUTES} from "@utils/routes";
import {Whatsapp} from "@components/icons/whatsapp";
import Image from "next/image";
import {siteSettings} from "@settings/site.settings";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}

export default function ClassRegister() {
  const { t } = useTranslation("terms");
  const { title, content } = termsAndServices;
  const router = useRouter();
  function handleClick(path: string) {
    close();
    router.push(path);
  }
  return (

      <>
    <section className="dir-right text-right  max-w-1920 w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      {/*<header className="sm:mt-2 xl:mt-4 mb-10 lg:mb-14">*/}
      {/*  <h1 className="text-xl md:text-2xl sm:text-3xl 2xl:text-4xl text-heading font-bold mb-4 sm:mb-5 2xl:mb-7">*/}
      {/*    {t(title)}*/}
      {/*  </h1>*/}

      {/*</header>*/}
      {/* End of page header */}

      <div className="flex flex-col md:flex-row">
        <nav className="md:w-72 xl:w-3/12 mb-8 md:mb-0">
          <ol className="sticky md:top-16 lg:top-22 bg-gray-100 z-10 text-center md:text-right">
            {content?.map((item) => (
              <li key={item.title}>
                <Link
                  spy={true}
                  offset={-120}
                  smooth={true}
                  duration={500}
                  to={makeTitleToDOMId(item.title)}
                  activeClass="text-sm lg:text-base text-heading font-semibold"
                  className="cursor-pointer inline-flex py-3 text-sub-heading uppercase"
                >
                  {t(item.title)}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        {/* End of section scroll spy menu */}

        <div className="md:w-9/12 md:ps-8 md:pb-96">
          {content?.map((item) => (
            <Element
              key={item.title}
              name={makeTitleToDOMId(item.title)}
              className="mb-10"
            >
              <div
                  className="bg-white rounded-xl shadow-sm p-4"
              >
                <div className={"h-96 w-full relative"}>
                <Image
                    src={ "/"+item.pic}
                    alt={"class register"+item.id}
                    layout="fill" // required
                    objectFit="cover"
                    loading="eager"

                    className="rounded"
                />
              </div>
              <h2 className="text-lg md:text-xl lg:text-2xl text-[#3f98da] font-bold mb-4 py-2">
                {t(item.title)}
              </h2>

              <div
                className="text-body-dark leading-loose"
                dangerouslySetInnerHTML={{ __html: t(item.description) }}
              /></div>
            </Element>
          ))}
        </div>

        {/* End of content */}
      </div>
    </section>
        <div className="fixed p-2 bottom-0 flex justify-center w-full bg-white shadow-sm">
        <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => {} }
            className="flex  h-full w-full items-center justify-center focus:outline-none focus:text-accent"
        >
          <button
              className="flex p-2 w-full items-center justify-center  rounded-full bg-[#0dc143] text-light"
              onClick={() => handleClick(ROUTES.CONTACT)}
          >
            <Whatsapp className="px-2" width="40px" height="40px"/>

            تماس از طریق واتس اپ
          </button>

        </motion.button>
        </div>
      </>
  );
}

ClassRegister.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "terms"])),
    },
  };
};
