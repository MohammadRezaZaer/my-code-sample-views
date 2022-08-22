import {CSSTransition} from "react-transition-group";

type CollapseProps = {
    show: boolean;

};

const OpTransition: React.FC<CollapseProps> = ({
                                                   show,
                                                   children
                                               }) => {


    return (

        <CSSTransition
            in={show}
            timeout={{

                enter: 300,
                exit: 100,
            }}
            classNames="startSceneAnimate"

            unmountOnExit
        >

            {children && children}
        </CSSTransition>

    );
};


export default OpTransition;
