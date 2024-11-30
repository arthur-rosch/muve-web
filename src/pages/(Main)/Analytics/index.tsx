import { motion } from 'framer-motion'
import { useVideo } from '../../../hooks'
import { useSelector } from 'react-redux'
import { SelectVideoModal } from './components'
import { useLocation, useNavigate } from 'react-router-dom'
import { cardVariants } from '../../../animations'
import { ListCharts } from './components/listCharts'
import { useState, useEffect, type FC } from 'react'
import type { Video, VideoMetrics } from '../../../types'
import { ArrowLeft, FolderDashed } from '@phosphor-icons/react'
import type { State } from '../../../redux/store/configureStore'
import { calculateVideoMetrics, convertDurationToSeconds } from '../../../utils'
import {
  Button,
  Card,
  HeaderFolder,
  Input,
  InputSelect,
} from '../../../components'

export const Analytics: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useSelector((state: State) => state.user)

  const { getAllVideosByUserId } = useVideo()
  const { data: videos, isLoading } = getAllVideosByUserId(true)

  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [metrics, setMetrics] = useState<VideoMetrics | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>(
    location.state?.video ? location.state.video : undefined,
  )

  const [selectedTypeDataChart, setSelectedTypeDataChart] = useState('retenção')

  const goBack = () => {
    navigate('/dashboard')
  }

  useEffect(() => {
    setLoading(true)
    if (selectedVideo && videos) {
      const foundVideo = videos.find(
        (video: Video) => video.url === selectedVideo.url,
      )
      setSelectedVideo(foundVideo || undefined)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [selectedVideo, videos])

  useEffect(() => {
    if (selectedVideo) {
      const metrics = calculateVideoMetrics(
        convertDurationToSeconds(selectedVideo.duration),
        selectedVideo.analytics,
      )
      setMetrics(metrics)
    }
  }, [selectedVideo])

  const metricsData = metrics
    ? [
        { label: 'Plays', value: metrics.plays },
        { label: 'Views', value: metrics.views },
        { label: 'Play Rate', value: `${metrics.playRate}%` },
        { label: 'Engajamento', value: `${metrics.engagement}%` },
        { label: 'Plays únicos', value: metrics.uniquePlays },
        { label: 'Views únicos', value: metrics.uniqueViews },
      ]
    : []

  const availableCharts = ['retenção', 'pais', 'dispositivos']

  if (isLoading || !videos) {
    return null
  }

  return (
    <section className="w-full max-h-screen mx-8 overflow-auto overflow-x-hidden pr-4 pb-28">
      <HeaderFolder name={'Análise'} />

      <div className="w-full h-full flex flex-col mt-10">
        <motion.header
          className="flex flex-col w-full"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <span className="text-white text-lg flex items-start justify-start">
            <ArrowLeft
              size={24}
              className="mr-8 cursor-pointer"
              onClick={goBack}
            />
            Análise
          </span>
          <span className="text-[#909090] text-sm mt-4">
            Veja detalhes analíticos do vídeo
          </span>
        </motion.header>

        <motion.div
          className="w-full flex mt-8 gap-2"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Button
            type="button"
            variant="primary"
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="min-w-48 flex items-center justify-center py-3 px-4 h-10"
          >
            Selecionar Video
          </Button>
          <Input
            type="text"
            className="w-full mr-8 brightness-75"
            placeholder="Informações do seu vídeo"
            disabled={true}
            value={
              selectedVideo
                ? `${selectedVideo.name} | ${selectedVideo.url}`
                : ''
            }
            readOnly
          />
        </motion.div>

        <motion.div
          className="w-full h-auto p-6 bg-[#141414] border-[1px] border-solid border-[#333333] mt-8"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          {loading ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="w-full h-full flex flex-col items-center justify-center mt-12 gap-4"
            >
              <FolderDashed size={64} color="white" />
              <span className="text-white text-sm">Carregando...</span>
            </motion.div>
          ) : selectedVideo && metrics ? (
            <div className="w-full h-full flex flex-col">
              <div className="flex items-start justify-between">
                <div className="flex items-start justify-start gap-4 flex-wrap">
                  {metricsData.map(({ label, value }) => (
                    <Card
                      key={label}
                      variant="secondary"
                      className="w-44 h-32 flex flex-col justify-between px-5 py-6 rounded-lg bg-transparent"
                    >
                      <span className="text-[#909090] text-sm">
                        {label}
                      </span>
                      <span className="text-white text-3xl">
                        {value}
                      </span>
                    </Card>
                  ))}
                </div>
                <InputSelect
                  options={availableCharts.map((chart) => ({
                    value: chart,
                    label: chart.charAt(0).toUpperCase() + chart.slice(1),
                  }))}
                  onChange={(e) => setSelectedTypeDataChart(e.target.value)}
                />
              </div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <ListCharts
                  typeChart={selectedTypeDataChart}
                  video={selectedVideo!}
                />
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="w-full h-full flex flex-col items-center justify-center mt-12 gap-4 pb-8"
            >
              <FolderDashed size={64} color="white" />
              <span className="text-white text-sm">
                Nenhum vídeo selecionado
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
      <SelectVideoModal
        videos={videos!}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setSelectedVideo={setSelectedVideo}
      />
    </section>
  )
}
