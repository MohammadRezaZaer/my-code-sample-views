
import StartScene from "@components/ui/sections/startScene";
import AppsScene from "@components/ui/sections/appsScene";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { getLayout } from '@components/layouts/layout';
import {  Element } from 'react-scroll';




export default function HomePage() {
    const { t } = useTranslation('terms');

    return (
        <>

            <StartScene />
            <AppsScene className="min-h-screen container" />

            <Element
                name="grid"
                className="flex flex-1 "
            >
                <main className="flex-1">
                </main>
            </Element>

        </>
    );
}
HomePage.getLayout = getLayout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common'])),
        },
    };
};
