import logo from '../../assets/logo.svg'
import type { FC } from 'react'
import type { Video } from '../../types'
import { motion, type Variants } from 'framer-motion'
import { DotsThreeOutlineVertical } from '@phosphor-icons/react'
import { AccordionMenuVideo } from './accordionMenuVideo'

interface CardVideoProps {
  video: Video
}

export const CardVideo: FC<CardVideoProps> = ({
  video,
}) => {
  return (
    <motion.div
          className="w-auto h-60 relative my-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
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
  )
}
