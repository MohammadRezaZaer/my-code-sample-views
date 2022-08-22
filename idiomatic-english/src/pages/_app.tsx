import type {AppProps /*, AppContext */} from "next/app";

import "@assets/main.css";
import "react-toastify/dist/ReactToastify.css";
import {UIProvider} from "@contexts/ui.context";
import {SearchProvider} from "@contexts/search.context";
import SidebarContainer from "@components/common/sidebar/sidebar-container";

import {QueryClient, QueryClientProvider} from "react-query";
import {Hydrate} from "react-query/hydration";
import {ReactQueryDevtools} from "react-query/devtools";
import {appWithTranslation} from "next-i18next";
import { useRef} from "react";
import {ToastContainer} from "react-toastify";
import Seo from "@components/ui/seo";

import ManagedModal from "@components/ui/modal/managed-modal";
import {
    ModalProvider,
} from "@components/ui/modal/modal.context";
import {CartProvider} from "../store/quick-cart/cart.context";
import {AudioProvider} from "../contexts/player/audio.context";

const Noop: React.FC = ({children}) => <>{children}</>;



function CustomApp({Component, pageProps}: AppProps) {
    const queryClientRef = useRef<any>(null);
    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient();
    }
    const Layout = (Component as any).Layout || Noop;
    return (
        <QueryClientProvider client={queryClientRef.current}>
            <Hydrate state={pageProps.dehydratedState}>
                    <ModalProvider>
                        <CartProvider>

                            <UIProvider>
                                    <SearchProvider>
                                    <AudioProvider>
                                        <Layout {...pageProps}>
                                            <Seo/>
                                            <Component {...pageProps} />
                                        </Layout>
                                        <ToastContainer autoClose={2000}/>
                                        <ManagedModal/>
                                        <SidebarContainer/>
                                    </AudioProvider>
                                    </SearchProvider>

                            </UIProvider>
                        </CartProvider>
                    </ModalProvider>
                <ReactQueryDevtools/>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default appWithTranslation(CustomApp);
