import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

import { cardVariants } from "@/animations"
import { Button, Input, SelectVideoModal } from "@/components"
import { useState } from "react"
import type { Video } from "@/types"
import { useLocation } from "react-router-dom"

interface HeaderProps {
    listVideos: Video[]
    searchTerm: string;
    onSearchTermChange: (searchTerm: string) => void;
    onVideoSelected: (video: Video | undefined) => void;
}

export const Header = ({ listVideos, onVideoSelected, onSearchTermChange, searchTerm }: HeaderProps) => {
    const location = useLocation()
    const [isModalOpen, setIsModalOpen] = useState(location.state?.videoId ? false : true)

    return (
        <>
            <motion.header
                className="flex flex-col md:flex-row justify-between items-center my-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <div>
                    <span className="text-white text-lg flex items-start justify-start">
                        <ArrowLeft
                            size={24}
                            className="mr-4 cursor-pointer"
                        />
                        {"Leads"}
                    </span>
                </div>
                <motion.header
                    className="flex flex-col md:flex-row justify-end items-center my-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >

                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Button onClick={() => setIsModalOpen(!isModalOpen)}>
                            Selecionar Vídeo
                        </Button>
                        {/* <Button>
                            Exportar
                        </Button> */}
                    </div>
                </motion.header>
            </motion.header>

            <div className="mb-6">
                <Input
                    type="text"
                    placeholder="Buscar por nome, email ou telefone..."
                    className="w-full border rounded"
                    value={searchTerm}
                    onChange={(e) => onSearchTermChange(e.target.value)}
                />
            </div>
            <SelectVideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)} onVideoSelect={onVideoSelected} videos={listVideos} />
        </>
    )
}