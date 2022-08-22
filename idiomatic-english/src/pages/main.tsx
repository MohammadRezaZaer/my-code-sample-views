import {useEffect} from "react";
import {useRouter} from "next/router";
import {scroller, Element} from "react-scroll";

import Banner from "@components/common/banner";
import HomeLayout from "@components/layout/home-layout";
import PromotionSlider from "@components/common/promotion-slider";
import ProductFeed from "@components/product/feed";
import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
import FilterBar from "@components/common/filter-bar";
import {sitePages, PageName} from "@settings/site-pages.settings";
import {getKeyValue} from "@utils/get-key-value";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {
    GetStaticProps
} from "next";
import {QueryClient} from "react-query";
import {fetchProducts} from "@data/product/use-products.query";
import {fetchCategories} from "@data/category/use-categories.query";


// This function gets called at build time
// export async function getStaticPaths({ locales }: GetStaticPathsContext) {
//   const { types } = await fetchTypes();
//
//   const paths = types
//     ?.filter((t: any) => t.slug !== "bakery")
//     .flatMap((type: any) =>
//       locales?.map((locale) => ({ params: { type: type.slug }, locale }))
//     );
//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

export const getStaticProps: GetStaticProps = async ({locale}) => {
    const queryClient = new QueryClient();
    // await queryClient.prefetchQuery("settings", fetchSettings);
    //
    await queryClient.prefetchInfiniteQuery(
        ["products"],
        fetchProducts,
        {
            staleTime: 60 * 1000,
        }
    );
    await queryClient.prefetchQuery(
        ["fetch-parent-category"],
        fetchCategories,
        {
            staleTime: 60 * 1000,
        }
    );
    // await queryClient.prefetchQuery("types", fetchTypes, {
    //   staleTime: 60 * 1000,
    // });

    return {
        props: {
            ...(await serverSideTranslations(locale!, ["common", "banner"])),
            // dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
        revalidate: 120,
    };
};



export default function HomePage() {
    const {query} = useRouter();
    // useEffect(() => {
    //     if (query.text || query.category) {
    //         scroller.scrollTo("grid", {
    //             smooth: true,
    //             offset: -110,
    //         });
    //     }
    // }, [query.text, query.category]);


    const getPageData = getKeyValue(sitePages, "info" as PageName);

    return (
        <>
            <Banner banner={getPageData?.banner} className="min-h-screen"/>
            {/*<PromotionSlider/>*/}



                <main className="flex-1">
                    <ProductFeed/>
                </main>
                <CategoryDropdownSidebar/>

        </>
    );
}

HomePage.Layout = HomeLayout;
