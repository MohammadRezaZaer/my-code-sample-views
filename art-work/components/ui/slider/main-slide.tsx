import cn from 'classnames'
import {SwiperSlide, Pagination, Swiper} from "./slider";
import { Image } from '../elements/image'


interface Props {
    className?: string;
}


const slideItems = [

    {
        name: "Gillian Flannagan",
        sub: "Spring in winter",
        pic: "/slides/s1.jpg",
        thumb: "/slides/t1.png"
    },

]


const MainSlide: React.FC<Props> = ({className}) => {
    return (<>


            <div className={cn('relative', className)}>
                <div className='overflow-hidden -z-1 rounded-xl w-full'>
                    <div className='relative'>
                        <Swiper
                            id='aboutus'
                            loop={true}
                            modules={[Pagination]}
                            resizeObserver={true}
                            allowTouchMove={true}
                            slidesPerView={1}
                            // spaceBetween={30}
                            // pagination={true}
                            pagination={{

                                bulletClass:
                                    'swiper-pagination-bullet !w-2.5 !h-2.5 !p-1 !rounded-full !border !border-primary !opacity-70',
                                bulletActiveClass: '!w-3 !h-3 !bg-primary',
                                clickableClass: 'cursor-pointer',
                                clickable: true
                            }}
                        >
                            {slideItems?.map((item, idx) => (
                                <SwiperSlide key={idx}>
                                    {/*<Link href={`${slug}${ROUTES.SEARCH}`}>*/}

                                    <div
                                        className={cn(
                                            'relative about-us-pic flex-grow flex flex-col overflow-y-hidden shadow-sm transition-all transform duration-200 ease-in-out hover:shadow  ',
                                            className
                                        )}
                                    >
                                        <div
                                            className='relative  cursor-pointer w-full min-h-[60vh]   overflow-hidden'
                                            // onClick={handleQuickView}
                                        >
                                            {/*<span className='sr-only'>{title}</span>*/}
                                            <Image
                                                src={item.pic}
                                                alt={"about_us_pic"}
                                                layout='fill'

                                                objectFit='cover'
                                            />
                                            <div
                                                className='absolute  cursor-pointer w-full min-h-[60vh]  flex translate-y-full opacity-30 transition-all transform duration-700 about-us-cover'
                                                // onClick={handleProductQuickView}
                                            >
                                                <div className='z-10 text-shiri'>
                                                    <h3 className="font-bold text-center text-2xl p-2 pt-8 ">{item.title}</h3>
                                                    <p className="font-normal text-justify text-xl px-4 ">{item.desc}</p>
                                                </div>


                                            </div>
                                        </div>


                                    </div>


                                    {/*</Link>*/}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainSlide
