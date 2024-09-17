import { motion } from 'framer-motion'
import { useVideo } from '../../../hooks'
import { cardVariants } from '../../../animations'
import { ListCharts } from './components/listCharts'
import { useState, useEffect, type FC } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { Video, VideoMetrics } from '../../../types'
import { ArrowLeft, FolderDashed } from '@phosphor-icons/react'
import { Card, HeaderFolder, Input, InputSelect } from '../../../components'
import { calculateVideoMetrics, convertDurationToSeconds } from '../../../utils'

export const Analytics: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { getAllVideosByUserId } = useVideo()
  const { data: videos } = getAllVideosByUserId

  const [metrics, setMetrics] = useState<VideoMetrics | null>(null)
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string>(
    location.state?.videoUrl || '',
  )
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [selectedTypeDataChart, setSelectedTypeDataChart] = useState('retencao')

  const options = [
    { value: 'retencao', label: 'Retenção' },
    { value: 'dispositivo', label: 'Dispositivo' },
    { value: 'pais', label: 'País' },
  ]

  const goBack = () => {
    navigate('/dashboard')
  }

  useEffect(() => {
    setLoading(true) // Inicia o loading quando a URL do vídeo muda
    if (selectedVideoUrl && videos) {
      const foundVideo = videos.find(
        (video: Video) => video.url === selectedVideoUrl,
      )
      setSelectedVideo(foundVideo || null)
      setLoading(false) // Para o loading após a busca
    } else {
      setLoading(false) // Para o loading se não houver URL
    }
  }, [selectedVideoUrl, videos])

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
        { label: 'Engagement', value: `${metrics.engagement}%` },
        { label: 'Unique Plays', value: metrics.uniquePlays },
        { label: 'Unique Views', value: metrics.uniqueViews },
      ]
    : []

  return (
    <section className="w-full h-full mx-8">
      <HeaderFolder name={'Análise'} />

      <div className="w-full h-full flex flex-col items-start justify-between mt-10">
        <motion.header
          className="flex flex-col"
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

        <Input
          type="text"
          animation={true}
          className="w-full mt-8"
          variants={cardVariants}
          placeholder="Insira o link do vídeo"
          value={selectedVideoUrl || ''}
          onChange={(e) => setSelectedVideoUrl(e.target.value)}
        />

        <motion.div
          className="w-full overflow-auto p-6 bg-[#141414] border-[1px] border-solid border-[#333333] mt-8"
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
                      <span className="text-[#909090] text-sm">{label}</span>
                      <span className="text-white text-3xl">{value}</span>
                    </Card>
                  ))}
                </div>
                <InputSelect
                  options={options}
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
          ) : selectedVideoUrl && !selectedVideo ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="w-full h-full flex flex-col items-center justify-center mt-12 gap-4"
            >
              <FolderDashed size={64} color="white" />
              <span className="text-white text-sm">
                Não foi possível encontrar o vídeo
              </span>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="w-full h-full flex flex-col items-center justify-center mt-12 gap-4"
            >
              <FolderDashed size={64} color="white" />
              <span className="text-white text-sm">
                Por favor, adicione a URL do vídeo
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
