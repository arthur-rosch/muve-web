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
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>

      {/* Modal centralizado e cobrindo toda a tela */}
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="bg-black bg-opacity-75 text-white p-6 rounded-md text-center">
          <p>Você pausou o vídeo</p>
          <div className="mt-4">
            <button
              onClick={handleResume}
              className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Continuar assistindo
            </button>
            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Assistir do início
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
