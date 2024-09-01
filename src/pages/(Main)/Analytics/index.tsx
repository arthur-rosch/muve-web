import { useState, useEffect, type FC } from 'react'
import { calculateVideoMetrics } from '../../../utils'
import { useAnalytics, useVideo } from '../../../hooks'
import type { Video, VideoMetrics } from '../../../types'
import {
  CardMetrics,
  ChartDevice,
  ChartRegion,
  ChartRetention,
  CustomModalSelectVideo,
} from './components'

export const Analytics: FC = () => {
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [metrics, setMetrics] = useState<VideoMetrics | null>(null)
  const [selectedVideo, setSelectVideo] = useState<Video | null>(null)
  const [selectedTypeDataChart, setSelectedTypeDataChart] = useState('retencao')

  const { getAllVideosByUserId } = useVideo('')
  const { data: videos } = getAllVideosByUserId

  const { getAnalyticsByVideoId } = useAnalytics(selectedVideo!.id)
  const { data: analytics } = getAnalyticsByVideoId
  console.log('Analytics', analytics)
  useEffect(() => {
    if (analytics) {
      setMetrics(calculateVideoMetrics(analytics))
      setTimeout(() => setLoading(false), 1000)
    }
  }, [analytics, selectedVideo])

  useEffect(() => {
    if (!analytics) {
      setLoading(true)
    }
  }, [analytics])

  return (
    <>
      <div className="w-full h-screen flex items-start justify-center p-8">
        <div className="w-full h-full border-[1px] border-gray-600 p-8 overflow-y-auto">
          <div className="w-full flex items-center justify-start mb-6">
            <input
              type="text"
              disabled
              value={selectedVideo?.url || ''}
              placeholder="https://www.youtube.com/watch?v=YkVhsv5rkU"
              className="w-[40%] h-10 bg-[#1d1f21] text-white border border-gray-600 rounded-md p-2 focus:border-[#217CE5] focus:outline-none"
            />
            <select
              onChange={(e) => setSelectedTypeDataChart(e.target.value)}
              className="ml-2 w-40 h-10 bg-[#1d1f21] text-white border border-gray-600 rounded-md p-2 focus:border-[#217CE5] focus:outline-none"
            >
              <option value="retencao">Retenção</option>
              <option value="pais">Por País</option>
              <option value="dispositivo">Por Dispositivo</option>
            </select>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="ml-2 h-10 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Selecionar Video
            </button>
          </div>

          {loading ? (
            <div className="bg-[#121316] w-full h-[100vh] flex items-center justify-center flex-col">
              <div
                className="w-8 h-8 border-4 border-solid rounded-full animate-spin"
                style={{ borderTopColor: '#217CE5' }}
              ></div>
            </div>
          ) : (
            <>
              <div className="w-full grid grid-cols-6 gap-2 my-4">
                <>
                  {selectedVideo && metrics && (
                    <>
                      <CardMetrics information={metrics.views} text="Views" />
                      <CardMetrics information={metrics.plays} text="Plays" />
                      <CardMetrics
                        information={metrics.uniqueViews}
                        text="Views Únicas"
                      />
                      <CardMetrics
                        information={metrics.uniquePlays}
                        text="Plays Únicos"
                      />
                      <CardMetrics
                        information={`${metrics.playRate} %`}
                        text="Play Rate"
                      />
                      <CardMetrics
                        information={`${metrics.engagement} %`}
                        text="Engajamento"
                      />
                    </>
                  )}
                </>
              </div>
              {selectedVideo && analytics ? (
                analytics.viewTimestamps.length > 0 ? (
                  selectedTypeDataChart === 'retencao' ? (
                    <ChartRetention
                      analytics={analytics}
                      selectedVideo={selectedVideo!}
                    />
                  ) : selectedTypeDataChart === 'pais' ? (
                    <ChartRegion
                      analytics={analytics}
                      selectedVideo={selectedVideo!}
                    />
                  ) : (
                    <ChartDevice
                      analytics={analytics}
                      selectedVideo={selectedVideo!}
                    />
                  )
                ) : (
                  <div className="text-center text-gray-500">
                    Não temos dados para analisar ainda
                  </div>
                )
              ) : (
                <div className="text-center text-gray-500">
                  Nenhuma análise disponível
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {videos && (
        <CustomModalSelectVideo
          listVideos={videos}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onSelectVideo={setSelectVideo}
        />
      )}
    </>
  )
}
