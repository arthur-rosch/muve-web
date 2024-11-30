import { type FC, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { useFolder, useVideo } from '@/hooks'
import { calculateDashboardMetrics } from '@/utils'
import { Header, CreateVideoCard, CreateFolderCard } from '@/components'

// Lazy loading dos componentes
const ListFoldersLazy = lazy(() => import('./components/ListFolders'))
const VideoPerformanceLazy = lazy(() => import('./components/VideoPerformance'))

export const Dashboard: FC = () => {
  const { getAllFolderByUserId } = useFolder()
  const { getManyVideosNotFolderId, getAllVideosByUserId } = useVideo()

  const { data: allVideos } = getAllVideosByUserId(true)
  const { data: videosNotFolderId } = getManyVideosNotFolderId(true)
  const { data: folders, isLoading, isSuccess } = getAllFolderByUserId

  if (isLoading) {
    return (
      <div
        className="w-8 h-8 border-4 border-solid rounded-full animate-spin"
        style={{ borderTopColor: '#217CE5' }}
      ></div>
    )
  }

  console.log(folders, allVideos, videosNotFolderId)

  if (isSuccess && videosNotFolderId && allVideos) {
    const { topVideos, totalHoursWatched, totalMinutesWatched, totalVideos } =
      calculateDashboardMetrics(folders, videosNotFolderId)

    return (
      <section className="w-full h-full mx-8">
        <Header />
        <motion.div
          className="w-full h-screen flex items-start justify-between mt-10 overflow-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <section className="h-full w-[75%] px-8">
            <div className="w-full flex items-start justify-start gap-4">
              <CreateFolderCard videosNotFolderId={videosNotFolderId} />
              <CreateVideoCard folders={folders} />
            </div>
            
            <Suspense fallback={<div>Loading...</div>}>
              <ListFoldersLazy
                folders={folders!}
                videosNotFolderId={videosNotFolderId}
              />
            </Suspense>
          </section>

          <Suspense fallback={<div>Loading performance...</div>}>
            <VideoPerformanceLazy
              videos={allVideos}
              topVideos={topVideos}
              totalVideos={totalVideos}
              totalHoursWatched={totalHoursWatched}
              totalMinutesWatched={totalMinutesWatched}
            />
          </Suspense>
        </motion.div>
      </section>
    )
  }

  return null
}
