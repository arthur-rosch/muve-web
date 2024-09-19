import logo from '../../assets/logo.svg'
import type { FC } from 'react'
import type { Video } from '../../types'
import { motion, type Variants } from 'framer-motion'
import { DotsThreeOutlineVertical } from '@phosphor-icons/react'
import { AccordionMenuVideo } from './accordionMenuVideo'

interface CardVideoProps {
  animation: boolean
  variant?: Variants
  video: Video
}

export const CardVideo: FC<CardVideoProps> = ({
  animation,
  variant,
  video,
}) => {
  const cardVideoComponent = (
    <div className="w-auto h-60 relative mt-5">
      <img
        alt=""
        className="rounded w-full mb-4"
        src={video.thumbnail ? video.thumbnail : logo}
      />
      <DotsThreeOutlineVertical
        weight="fill"
        size={24}
        className="absolute top-2 right-2 cursor-pointer text-white"
      />
      <div className="absolute bottom-7 left-0 cursor-pointer text-white bg-[#000000] bg-opacity-60 py-1 px-3">
        <span className="text-white text-sm">10:22</span>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-3">
          <span className="text-white text-sm">Teste</span>
          <span className="text-[#909090] text-sm">Formato | 16/9</span>
        </div>
        <span className="text-[#909090] text-sm"> 01 / 05</span>
      </div>
    </div>
  )

  return (
    <>
      {animation ? (
        <motion.div
          className="w-auto h-60 relative mb-12"
          initial="hidden"
          animate="visible"
          variants={variant}
        >
          <img
            alt=""
            className="rounded w-full h-full object-cover mb-4"
            src={
              video.thumbnail
                ? video.thumbnail
                : 'https://s2-techtudo.glbimg.com/SSAPhiaAy_zLTOu3Tr3ZKu2H5vg=/0x0:1024x609/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/c/u/15eppqSmeTdHkoAKM0Uw/dall-e-2.jpg'
            }
          />
          <div className="absolute top-2 right-2 text-white cursor-pointer">
            <AccordionMenuVideo video={video} />
          </div>

          <div className="absolute bottom-0 left-0  text-white bg-[#000000] bg-opacity-60 py-1 px-3">
            <span className="text-white text-sm">{video.duration}</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col items-start justify-start gap-3">
              <span className="text-white text-sm">{video.name}</span>
              <span className="text-[#909090] text-sm">
                Formato | {video.type}
              </span>
            </div>
          </div>
        </motion.div>
      ) : (
        cardVideoComponent
      )}
    </>
  )
}
