import { motion } from 'framer-motion'
import { useVideo } from '../../../hooks'
import { cardVariants } from '../../../animations'
import { ListCharts } from './components/listCharts'
import { useState, useEffect, type FC } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { Video, VideoMetrics } from '../../../types'
import { ArrowLeft, FolderDashed } from '@phosphor-icons/react'
import {
  Button,
  Card,
  HeaderFolder,
  Input,
  InputSelect,
} from '../../../components'
import { calculateVideoMetrics, convertDurationToSeconds } from '../../../utils'
import type { State } from '../../../redux/store/configureStore'
import { useSelector } from 'react-redux'

export const Analytics: FC = () => {
  const { user } = useSelector((state: State) => state.user)

  const navigate = useNavigate()
  const location = useLocation()

  const { getAllVideosByUserId } = useVideo()
  const { data: videos } = getAllVideosByUserId

  const [metrics, setMetrics] = useState<VideoMetrics | null>(null)
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string>(
    location.state?.videoUrl || '',
  )
  const [loading, setLoading] = useState(true)
  const [userPlan, setUserPlan] = useState<string>('')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [selectedTypeDataChart, setSelectedTypeDataChart] = useState('retencao')

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
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [selectedVideoUrl, videos])

  useEffect(() => {
    if (selectedVideo) {
      const metrics = calculateVideoMetrics(
        convertDurationToSeconds(selectedVideo.duration),
        selectedVideo.analytics,
      )
      console.log(metrics)
      setMetrics(metrics)
    }
  }, [selectedVideo])

  useEffect(() => {
    const storedPlan = localStorage.getItem('@storage:plan')
    if (storedPlan) {
      try {
        const plan = JSON.parse(storedPlan)
        setUserPlan(plan.plan)
      } catch (error) {
        console.error('Error parsing user plan from localStorage:', error)
      }
    }
  }, [])

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

  const availableCharts = (plan: string) => {
    switch (plan) {
      case 'ESSENTIAL':
      case 'UNLIMITED':
      case 'PROFESSIONAL':
        return ['retencao', 'pais', 'dispositivos']
      default:
        return []
    }
  }

  const isPlanVisible = (label: string) => {
    switch (userPlan) {
      case 'ESSENTIAL':
        return (
          label === 'Plays' ||
          label === 'Views' ||
          label === 'Unique Plays' ||
          label === 'Unique Views'
        )
      case 'UNLIMITED':
      case 'PROFESSIONAL':
        return true
      default:
        return false
    }
  }

  const handleRedirectToPayment = () => {
    const baseUrl =
      'https://pay.kirvano.com/7c915a99-e9c3-4520-aa51-1721d914071b'

    const params = new URLSearchParams({
      'customer.name': user.name,
      'customer.email': user.email,
      'customer.document': user.document,
      'customer.phone': user.phone,
    }).toString()

    const fullUrl = `${baseUrl}?${params}`

    // Redireciona para a URL com os parâmetros
    window.location.href = fullUrl
  }

  return (
    <section className="w-full max-h-screen mx-8 overflow-auto pr-4  pb-28">
      <HeaderFolder name={'Análise'} />

      <div className="w-full h-full flex flex-col mt-10">
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
                  {metricsData.map(({ label, value }) => {
                    const isVisible = isPlanVisible(label)
                    const cardClassName = !isVisible
                      ? 'w-44 h-32 flex flex-col justify-between px-5 py-6 rounded-lg bg-transparent blur-sm'
                      : 'w-44 h-32 flex flex-col justify-between px-5 py-6 rounded-lg bg-transparent'

                    return (
                      <div className="relative" key={label}>
                        <Card
                          key={label}
                          variant="secondary"
                          className={cardClassName}
                        >
                          <span className="text-[#909090] text-sm">
                            {label}
                          </span>
                          <span
                            className={`text-white text-3xl ${!isVisible ? 'filter blur-sm' : ''}`}
                          >
                            {!isVisible ? '********' : value}
                          </span>
                        </Card>

                        {!isVisible && (
                          <Button
                            type="button"
                            variant="primary"
                            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm"
                            onClick={handleRedirectToPayment}
                          >
                            Upgrade
                          </Button>
                        )}
                      </div>
                    )
                  })}
                </div>
                <InputSelect
                  options={availableCharts(userPlan).map((chart) => ({
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
