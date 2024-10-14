interface ContinueWatchingProps {
  handleResume: () => void
  handleRestart: () => void
}

export const ContinueWatching = ({
  handleRestart,
  handleResume,
}: ContinueWatchingProps) => {
  return (
    <>
      {/* Background overlay cobrindo toda a tela */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Modal centralizado e cobrindo toda a tela */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="bg-black bg-opacity-75 text-white p-6 rounded-md text-center">
          <p>Você pausou o vídeo</p>
          <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4">
            <button
              onClick={handleResume}
              className="px-4 py-2 bg-blue-500 text-white rounded-md my-4 sm:my-0"
            >
              Continuar assistindo
            </button>
            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-gray-500 text-white rounded-md my-4 sm:my-0"
            >
              Assistir do início
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
