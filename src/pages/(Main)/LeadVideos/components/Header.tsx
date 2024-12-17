import { cardVariants } from "@/animations"
import { Button, Input } from "@/components"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export const Header = () => {
    return (
        <>
            <motion.header
                className="flex flex-col md:flex-row justify-between items-center my-4"
                initial="hidden"
                animate="visible"
                variants={cardVariants}
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
                        <Button>
                            Selecionar Vídeo
                        </Button>
                        <Button>
                            Exportar
                        </Button>
                    </div>
                </motion.header>
            </motion.header>

            <div className="mb-6">
                <Input
                    type="text"
                    placeholder="Buscar por nome, email ou telefone..."
                    className="w-full border rounded"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </>
    )
}