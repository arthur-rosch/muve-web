import type { FC } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../../../../components'
import type { Video } from '../../../../types'
import { ChartLine } from '@phosphor-icons/react'
import { cardVariants, listItensDelay } from '../../../../animations'

interface VideoPerformanceProps {
  topVideos: Video[]
  totalVideos: number
  totalHoursWatched: number
  totalMinutesWatched: number
}

export const VideoPerformance: FC<VideoPerformanceProps> = ({
  topVideos,
  totalVideos,
  totalHoursWatched,
  totalMinutesWatched,
}) => {
  return (
    <section className="w-[25%] h-screen border-l-[1px] border-[#333333] border-solid px-4">
      <span className="text-white text-base font-semibold">Videos</span>

      <Card
        animation={true}
        variant="secondary"
        variants={cardVariants}
        className="w-full h-44 px-4 py-5 rounded-lg mt-6"
      >
        <span className="text-[#909090] text-base font-semibold flex items-center justify-start gap-4">
          <ChartLine size={22} />
          Minutos assistidos
        </span>
        <span className="text-white text-2xl font-semibold">
          {totalMinutesWatched.toFixed(0)}
        </span>
      </Card>

      <motion.div
        className="flex mt-2 gap-2 mb-10"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card
          animation={true}
          variant="secondary"
          variants={cardVariants}
          className="w-full h-32 px-4 py-5 rounded-lg"
        >
          <span className="text-[#909090] text-base font-semibold flex items-center justify-start gap-4">
            Qtd. de videos
          </span>
          <span className="text-white text-2xl font-semibold">
            {totalVideos}
          </span>
        </Card>
        <Card
          animation={true}
          variant="secondary"
          variants={cardVariants}
          className="w-full h-32 px-4 py-5 rounded-lg"
        >
          <span className="text-[#909090] text-base font-semibold flex items-center justify-start gap-4">
            Horas
          </span>
          <span className="text-white text-2xl font-semibold">
            {totalHoursWatched.toFixed(2)}H
          </span>
        </Card>
      </motion.div>

      <span className="text-white text-base font-semibold">
        Videos mais assistidos
      </span>

      <div className="flex flex-col gap-2">
        {topVideos.map((video, index) => (
          <motion.div
            key={index}
            className="mt-6 flex border-b-[1px] border-[#333333] pb-4 gap-4"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={listItensDelay}
          >
            <img
              className="w-28 h-14 rounded"
              alt="thumbnail video"
              src="https://s2-techtudo.glbimg.com/SSAPhiaAy_zLTOu3Tr3ZKu2H5vg=/0x0:1024x609/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/c/u/15eppqSmeTdHkoAKM0Uw/dall-e-2.jpg"
            />
            <div className="flex flex-col items-start justify-center gap-2">
              <span className="text-white text-sm font-semibold">
                {'TESTE'}
              </span>
              <span className="text-[#909090] text-sm font-semibold">
                {video.analytics.totalViews} views
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
