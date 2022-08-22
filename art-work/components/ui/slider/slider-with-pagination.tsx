import cn from 'classnames'
import Slider from "react-slick";
import SlideItem from "@components/ui/slider/slide-item";


const Items = [


    {
        id: '1',
        title: 'Gillian Flannagan',
        desc: 'Spring in winter',
        pic: '/slides/s1.jpg',
        thumb: '/slides/s1.png'
    },
    {
        id: '2',
        title: 'Jane Cooper',
        desc: 'Sound color of sea ',
        pic: '/slides/s2.jpg',
        thumb: '/slides/s2.png'
    },
    {
        id: '3',
        title: 'Elaine Cramer',
        desc: 'The colorful world',
        pic: '/slides/s3.jpg',
        thumb: '/slides/s3.png'
    },
    {
        id: '4',
        title: 'Ann Barrington',
        desc: 'my dream',
        pic: '/slides/s4.jpg',
        thumb: '/slides/s4.png'
    },
    {
        id: '5',
        title: 'Miriam Martinez',
        desc: 'Sound color of sea',
        pic: '/slides/s5.jpg',
        thumb: '/slides/s5.png'
    }
]

interface Props {
    className?: string;
}

function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            // style={{ ...style, right:15 }}
            onClick={onClick}
        />
    );
}

const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    touchMove: true,
    pauseOnDotsHover: true,
    speed: 2000,

    // autoplaySpeed: 2000,

    nextArrow: <SampleNextArrow className="w-16"/>,
    appendDots: dots => <ul>{dots}</ul>,

};

const SliderWithPagination: React.FC<Props> = ({className}) => {
    return (
        <div className={cn('relative', className)}>
            <Slider className="  drop-shadow-xl rounded-2xl " {...settings}>
                {Items.map((item,idx) =>

                    <SlideItem key={idx} item={item}/>
                )
                }
            </Slider>
        </div>
    )
}

export default SliderWithPagination
