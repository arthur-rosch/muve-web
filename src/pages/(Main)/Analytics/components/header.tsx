import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { cardVariants } from "../../../../animations"

export const Header = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate('/dashboard')
    }
    
    return (
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
    )
}