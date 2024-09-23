import type { FC } from 'react'
import { useFolder, useVideo } from '../../../hooks'
import { calculateDashboardMetrics } from '../../../utils'
import {
  ListFolders,
  CardCreateVideo,
  CardCreateFolder,
  VideoPerformance,
} from './components'
import { Header } from '../../../components'

export const Dashboard: FC = () => {
  const { getAllFolderByUserId } = useFolder()
  const { getManyVideosNotFolderId, getAllVideosByUserId } = useVideo()

  const { data: allVideos } = getAllVideosByUserId
  const { data: videosNotFolderId } = getManyVideosNotFolderId
  const { data: folders, isLoading, isSuccess } = getAllFolderByUserId

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (isSuccess && videosNotFolderId && allVideos) {
    const { topVideos, totalHoursWatched, totalMinutesWatched, totalVideos } =
      calculateDashboardMetrics(folders)

    return (
      <section className="w-full h-full mx-8">
        <Header />
        <div className="w-full h-screen flex items-start justify-between mt-10 overflow-auto">
          <section className="h-full w-[75%] px-8">
            <div className="w-full flex items-start justify-start gap-4">
              <CardCreateFolder videosNotFolderId={videosNotFolderId} />
              <CardCreateVideo />
            </div>
            <ListFolders
              folders={folders!}
              videosNotFolderId={videosNotFolderId}
            />
          </section>
          <VideoPerformance
            videos={allVideos}
            topVideos={topVideos}
            totalVideos={totalVideos}
            totalHoursWatched={totalHoursWatched}
            totalMinutesWatched={totalMinutesWatched}
          />
        </div>
      </section>
    )
  }
}
