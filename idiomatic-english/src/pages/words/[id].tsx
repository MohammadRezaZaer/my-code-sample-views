import { GetStaticProps} from "next";

import {fetchProducts} from "@data/product/use-products.query";
import {fetchProduct} from "@data/product/use-product.query";
import {Product} from "@ts-types/custom.types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import WordDetails from "@components/product/word-details";
import HomeLayout from "@components/layout/home-layout";


// This function gets called at build time
export async function getStaticPaths() {
    const products = await fetchProducts({
        queryKey: ["products"],
    });
    const paths = products?.data?.map((product: Product) =>
        ({params: {id: product?.id?.toString()}})
    );
    // const paths=[{params:{id:"246"}}];
    console.log(paths);
    return {
        paths:paths,
        fallback: "blocking",
    };
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
    const slug = params?.id as string;
    // const queryClient = new QueryClient();

    // await queryClient.prefetchQuery("settings", fetchSettings);
    try {
        const product = await fetchProduct(slug);
        return {
            props: {
                product,
                ...(await serverSideTranslations(locale!, ["common"])),
                // dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            },
            revalidate: 60,
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

export default function ProductSinglePage({product}: any) {
    return (
        <>
            <div >
                <WordDetails product={product}/>


            </div>

        </>
    );
}
ProductSinglePage.Layout = HomeLayout;
