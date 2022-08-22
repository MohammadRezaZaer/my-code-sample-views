import {getLayout} from "@components/layouts/layout";
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Logs from "@framework/logs/logs";
import {LogsProvider} from "@framework/logs/logs.context";

export {getServerSideProps} from '@framework/ssr/logs'
export default function ResultHistory() {
    return (
        <LogsProvider>
            <section className="max-w-1920 w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
                <header className="text-center md:text-left sm:mt-2 xl:mt-4 mb-10 lg:mb-14">
                    <h1 className="text-xl md:text-2xl sm:text-3xl 2xl:text-4xl text-light font-bold mb-4 sm:mb-5 2xl:mb-7">
                        {"Result History"}
                    </h1>
                    <p className="text-sm md:text-base text-light 2xl:text-lg px-0.5">
                        {"RESULT CHART"}
                    </p>
                </header>

                <Logs/>

            </section>
        </LogsProvider>
    );
}
ResultHistory.authenticate = true;
ResultHistory.getLayout = getLayout;
// export const getStaticProps: GetStaticProps = async ({locale}) => {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale!, ['common', 'terms'])),
//         },
//     };
// };
