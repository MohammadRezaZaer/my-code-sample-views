import Loader from '@components/ui/loaders/spinner/spinner';
import useUser from '@framework/auth/use-user';
import Login from '@framework/auth/login';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@store/authorization-atom';
import { BackArrowRound } from '@components/icons/back-arrow-round';
import {useEffect, useState} from "react";

const PrivateRoute: React.FC = ({ children }) => {
    const [requestLogin, setRequestLogin] = useState(false)
    const [isAuthorized] = useAtom(authorizationAtom);
    //console.log("isAuthorized,requestLogin",isAuthorized,requestLogin)
    const router = useRouter();
    // const { me } = useUser();
    useEffect(() => {
        // had to move into a useEffect hook
        !isAuthorized && setRequestLogin(true);
    }, [isAuthorized])
    //const isUser = !!me;
    if (/*!isUser &&*/ requestLogin) {
        return (
            <div className="flex w-full justify-center py-5 md:py-8 relative">
                <button
                    className="w-8 md:w-16 h-8 md:h-16 flex items-center justify-center absolute top-5 md:top-1/2 start-5 md:start-10 md:-mt-8 text-gray-200 md:text-gray-300 hover:text-gray-400 transition-colors"
                    onClick={router.back}
                >
                    <BackArrowRound />
                </button>
                <Login />
            </div>

        );
    }
    else  {
        return <div>{children}</div>;
    }

    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    // return <Loader showText={false} />;
};

export default PrivateRoute;
