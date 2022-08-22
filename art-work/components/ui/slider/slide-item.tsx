import { Image } from '@components/ui/elements/image'
import cn from 'classnames'

interface Props {
  className?: string;
  item?: {};

}

const SlideItem: React.FC<Props> = ({
                                        className,
                                        item,

                                      }) => {
  return (
      <div className="rounded-2xl bg-white min-h-[37vh] flex flex-col mx-4">
        <Image
            src={item.pic}
            alt={"slide"}
            layout='responsive'
            objectFit='cover'
            height={"100%"}
            width={"100%"}
            className="rounded-t-2xl"
        />
        <div className="bg-shiri px-2  xl:max-h-24 flex items-center rounded-b-2xl">
<div className="xl:flex-[0.25]">
          <Image
              src={item.thumb}
              alt={"thumb"}
              layout='intrinsic'
              height={70}
              width={70}
              objectFit='cover'
          />
</div>
          <div className="">
            <p className="text-black2 text-sm md:text-lg font-medium">{item.title}</p>
            <p className="text-grey1 text-xs text-base font-medium">{item.desc}</p>
          </div>
        </div>

      </div>

  )
}

export default SlideItem
