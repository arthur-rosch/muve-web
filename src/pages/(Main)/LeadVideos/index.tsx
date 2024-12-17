import { useVideo } from '@/hooks'
import { Header, Tables } from './components'
import { type FC, useMemo, useState } from 'react'
import type { LeadFormVideo, Video } from '@/types'
import { HeaderFolder, LoadingState, } from '@/components'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'


export const LeadVideos: FC = () => {
  const location = useLocation()
  const { getUserVideosContainingForm } = useVideo()
  const { data, isLoading, error } = getUserVideosContainingForm(true)

  const [searchTerm, setSearchTerm] = useState('')
  const [videoSelected, setIsVideoSelected] = useState<Video | undefined>()


  const videos = data

  if (location.state?.videoId) {
    const videoSelected = videos?.find(video => video.id === location.state.videoId)
    setIsVideoSelected(videoSelected)
  }

  const [contacts] = useState<LeadFormVideo[] | undefined>(videoSelected?.VideoForm?.LeadFormVideo || [])

  const filteredData = useMemo(
    () =>
      contacts?.filter(
        (contact) =>
          contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.phone?.includes(searchTerm),
      ),
    [searchTerm, contacts],
  )

  return (
    <>
      {isLoading ? <LoadingState /> : (
        <motion.section className="w-full max-h-screen mx-8 overflow-auto pr-4 pb-28"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}>
          <HeaderFolder name={'Teste'} />

          <Header listVideos={videos!} onVideoSelected={setIsVideoSelected} onSearchTermChange={setSearchTerm} searchTerm={searchTerm} />

          <Tables filteredData={filteredData} />
        </motion.section>
      )}
    </>
  )
}
