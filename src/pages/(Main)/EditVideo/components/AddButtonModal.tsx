import { useEffect, useState, type FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { cardVariants } from '../../../../animations'
import { Input, Button, CustomModal, CheckBox } from '../../../../components'
import type { VideoButton } from '../../../../types'

const buttonPositions = [
  'top-left',
  'left-center',
  'bottom-left',
  'top-center',
  'center',
  'bottom-center',
  'top-right',
  'right-center',
  'bottom-right',
] as const

export const addButtonSchema = z.object({
  buttonType: z.enum(['below', 'inside'], {
    required_error: 'A posição do botão é obrigatória',
  }), // nova propriedade
  buttonText: z
    .string({ required_error: 'Texto do botão é obrigatório' })
    .min(1, 'Texto do botão é obrigatório'),
  buttonSize: z
    .string({ required_error: 'Tamanho do botão é obrigatório' })
    .min(1, 'Tamanho do botão é obrigatório'),
  buttonLink: z
    .string({ required_error: 'Link do botão é obrigatório' })
    .url('Insira um link válido'),
  startTime: z
    .string({ required_error: 'Tempo de início é obrigatório' })
    .min(1, 'Tempo de início é obrigatório'),
  endTime: z
    .string({ required_error: 'Tempo de fim é obrigatório' })
    .min(1, 'Tempo de fim é obrigatório'),
  buttonAfterTheVideoEnds: z
    .boolean({
      required_error: 'É obrigatório definir se o botão continua após o vídeo',
    })
    .optional(),
  backgroundColor: z.string({
    required_error: 'Cor do background é obrigatória',
  }),
  textColor: z.string({ required_error: 'Cor do texto é obrigatória' }),
  hoverBackgroundColor: z.string({
    required_error: 'Cor do background ao passar o mouse é obrigatória',
  }),
  hoverTextColor: z.string({
    required_error: 'Cor do texto ao passar o mouse é obrigatória',
  }),
})

interface AddButtonModalProps {
  isModalOpen: boolean
  isEditButton?: {
    button: VideoButton
    index: number
  }
  handleAddButton: (data: VideoButton) => string
  handleEditButton: (data: VideoButton, index: number) => string

  setIsModalOpen: (value: boolean) => void
}

type AddButtonFormData = z.infer<typeof addButtonSchema>

export const AddButtonModal: FC<AddButtonModalProps> = ({
  isModalOpen,
  isEditButton,
  setIsModalOpen,
  handleAddButton,
  handleEditButton,
}) => {
  const [createdSuccess, setCreatedSuccess] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<'below' | 'inside'>(
    'inside',
  )
  const [gridPosition, setGridPosition] = useState<string>('center')

  const {
    reset,
    control,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<AddButtonFormData>({
    resolver: zodResolver(addButtonSchema),
  })

  const onSubmit = (data: AddButtonFormData) => {
    console.log('Form Data:', {
      ...data,
      buttonPositions: gridPosition,
    })
    console.log(buttonPositions)
    if (isEditButton) {
      handleEditButton(
        {
          ...data,
          buttonPosition: gridPosition,
        },
        isEditButton.index,
      )
    } else {
      handleAddButton({
        ...data,
        buttonPosition: gridPosition,
      })
    }

    setCreatedSuccess(!createdSuccess)
    reset()
  }

  useEffect(() => {
    if (isEditButton) {
      console.log('Teste')
      const { button } = isEditButton

      // Definindo os valores no formulário usando os campos da interface VideoButton
      setValue('buttonType', button.buttonType)
      setValue('buttonText', button.buttonText)
      setValue('buttonSize', button.buttonSize)
      setValue('buttonLink', button.buttonLink)
      setValue('startTime', button.startTime)
      setValue('endTime', button.endTime)
      setValue(
        'buttonAfterTheVideoEnds',
        button.buttonAfterTheVideoEnds ?? false,
      ) // Default para false se não definido
      setValue('backgroundColor', button.backgroundColor)
      setValue('textColor', button.textColor)
      setValue('hoverBackgroundColor', button.hoverBackgroundColor)
      setValue('hoverTextColor', button.hoverTextColor)
    } else {
      reset() // Reseta o formulário caso não seja edição
    }
  }, [isEditButton, reset, setValue])

  return (
    <CustomModal.Root
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      styles={'h-auto w-[50rem] flex flex-col m-auto'}
    >
      <CustomModal.Title
        title={'+ Adicionar botão'}
        setIsOpen={setIsModalOpen}
        subTitle={'Selecione onde você quer adicionar o botão'}
      />
      {createdSuccess ? (
        <>
          <CustomModal.Success text="Botão criado com sucesso" />
          <div className="w-full mt-6 gap-12 flex items-center justify-between py-6 px-8 border-t-[1px] border-solid border-[#333333] ">
            <Button
              type="button"
              variant="primary"
              animation={true}
              variants={cardVariants}
              className="w-full flex items-center justify-center py-3 px-4 h-10"
              onClick={() => {
                setIsModalOpen(false)
                setCreatedSuccess(false)
              }}
            >
              Confirmar
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="min-w-full max-w-full max-h-[35rem] p-6 overflow-auto">
            <div className="w-full">
              <button
                className={` w-[50%] border-b-[1px] border-b-solid  pb-6 ${
                  selectedPosition === 'below'
                    ? 'text-[#187BF0] border-[#187BF0]'
                    : 'text-[#909090] border-[#909090]'
                }`}
                onClick={() => {
                  setSelectedPosition('below')
                  setValue('buttonType', 'below')
                }}
              >
                Abaixo do vídeo
              </button>
              <button
                className={`w-[50%] border-b-[1px] border-b-solid pb-6 ${
                  selectedPosition === 'inside'
                    ? 'text-[#187BF0] border-[#187BF0]'
                    : 'text-[#909090] border-[#909090]'
                }`}
                onClick={() => {
                  setSelectedPosition('inside')
                  setValue('buttonType', 'inside')
                }}
              >
                Dentro do vídeo
              </button>
            </div>
            {selectedPosition === 'inside' && (
              <div className="mt-4">
                <h3 className="text-white mb-2">Posição do botão:</h3>
                <ButtonPositionSelector
                  selectedPosition={gridPosition}
                  onSelect={setGridPosition}
                />
              </div>
            )}
            <div className="mr-4">
              <div className="flex mt-6 gap-4">
                <div className="w-full flex flex-col">
                  <label htmlFor="chapterTitle" className="text-white text-sm">
                    Texto
                  </label>
                  <Controller
                    name="buttonText"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="buttonText"
                        type="text"
                        placeholder="Texto do botão"
                        className="w-full h-10 mt-2 mb-2"
                      />
                    )}
                  />
                  {errors.buttonText && (
                    <span className="text-red-500 text-sm">
                      {errors.buttonText.message}
                    </span>
                  )}
                </div>
                <div className="w-full flex flex-col">
                  <label htmlFor="chapterTitle" className="text-white text-sm">
                    Tamanho
                  </label>
                  <Controller
                    name="buttonSize"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="buttonSize"
                        type="text"
                        placeholder="Texto do botão"
                        className="w-full h-10 mt-2 mb-2"
                      />
                    )}
                  />
                  {errors.buttonSize && (
                    <span className="text-red-500 text-sm">
                      {errors.buttonSize.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="chapterTitle" className="text-white text-sm">
                  Link
                </label>
                <Controller
                  name="buttonLink"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="buttonLink"
                      type="text"
                      placeholder="Texto do botão"
                      className="w-full h-10 mt-2 mb-2"
                    />
                  )}
                />
                {errors.buttonLink && (
                  <span className="text-red-500 text-sm">
                    {errors.buttonLink.message}
                  </span>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <div className="flex flex-col w-full">
                  <label htmlFor="startTime" className="text-white text-sm">
                    Início
                  </label>
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="startTime"
                        type="text"
                        isMask={true}
                        mask="99:99:99"
                        placeholder="hh:mm:ss"
                        className="w-full h-10 mt-2 mb-2"
                      />
                    )}
                  />
                  {errors.startTime && (
                    <span className="text-red-500 text-sm">
                      {errors.startTime.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="endTime" className="text-white text-sm">
                    Fim
                  </label>
                  <Controller
                    name="endTime"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="endTime"
                        type="text"
                        isMask={true}
                        mask="99:99:99"
                        placeholder="hh:mm:ss"
                        className="w-full h-10 mt-2 mb-2"
                      />
                    )}
                  />
                  {errors.endTime && (
                    <span className="text-red-500 text-sm">
                      {errors.endTime.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center mt-2">
                <Controller
                  control={control}
                  name="buttonAfterTheVideoEnds"
                  render={({ field }) => (
                    <CheckBox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <span className="text-[#909090] text-sm ml-2">
                  Continuar exibindo após o fim do vídeo.
                </span>
              </div>
              {errors.buttonAfterTheVideoEnds && (
                <span className="text-red-500 text-sm">
                  {errors.buttonAfterTheVideoEnds.message}
                </span>
              )}

              <div className="w-full flex gap-4 mt-6">
                <div className="w-full">
                  <label
                    htmlFor="colorSmartPlayers"
                    className="text-white text-sm mt-4"
                  >
                    Cor do background:
                  </label>
                  <div className="flex items-start justify-start gap-2 my-2">
                    <Controller
                      control={control}
                      name="backgroundColor"
                      render={({ field }) => (
                        <Input
                          type="color"
                          className="h-10 outline-none border-none"
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="backgroundColor"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          className="w-full h-10 ml-2"
                        />
                      )}
                    />
                  </div>
                  {errors.backgroundColor && (
                    <span className="text-red-500 text-sm">
                      {errors.backgroundColor.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="colorSmartPlayers"
                    className="text-white text-sm mt-4"
                  >
                    Cor do texto:
                  </label>
                  <div className="flex items-start justify-start gap-2 my-2">
                    <Controller
                      control={control}
                      name="textColor"
                      render={({ field }) => (
                        <Input
                          type="color"
                          className="h-10 outline-none border-none"
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="textColor"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          className="w-full h-10 ml-2"
                        />
                      )}
                    />
                  </div>
                  {errors.textColor && (
                    <span className="text-red-500 text-sm">
                      {errors.textColor.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full flex gap-4 mt-6">
                <div className="w-full">
                  <label
                    htmlFor="hoverBackgroundColor"
                    className="text-white text-sm mt-4"
                  >
                    Cor do background ao passar por cima:
                  </label>
                  <div className="flex items-start justify-start gap-2 my-2">
                    <Controller
                      control={control}
                      name="hoverBackgroundColor"
                      render={({ field }) => (
                        <Input
                          type="color"
                          className="h-10 outline-none border-none"
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="hoverBackgroundColor"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          className="w-full h-10 ml-2"
                        />
                      )}
                    />
                  </div>
                  {errors.hoverBackgroundColor && (
                    <span className="text-red-500 text-sm">
                      {errors.hoverBackgroundColor.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="colorSmartPlayers"
                    className="text-white text-sm mt-4"
                  >
                    Cor do texto ao passar por cima:
                  </label>
                  <div className="flex items-start justify-start gap-2 my-2">
                    <Controller
                      control={control}
                      name="hoverTextColor"
                      render={({ field }) => (
                        <Input
                          type="color"
                          className="h-10 outline-none border-none"
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="hoverTextColor"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          className="w-full h-10 ml-2"
                        />
                      )}
                    />
                  </div>
                  {errors.hoverTextColor && (
                    <span className="text-red-500 text-sm">
                      {errors.hoverTextColor.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full gap-12 flex items-center justify-between py-6 px-8 border-t-[1px] border-solid border-[#333333]">
            <Button
              type="button"
              variant="danger"
              animation={true}
              variants={cardVariants}
              onClick={() => setIsModalOpen(false)}
              className="w-full flex items-center justify-center py-3 px-4 h-10"
            >
              Fechar
            </Button>
            <Button
              type="button"
              variant="primary"
              animation={true}
              variants={cardVariants}
              onClick={handleSubmit(onSubmit)}
              className="w-full flex items-center justify-center py-3 px-4 h-10"
            >
              Adicionar
            </Button>
          </div>
        </>
      )}
    </CustomModal.Root>
  )
}

interface ButtonPositionSelectorProps {
  selectedPosition: string | null // pode ser 'top-left', 'top', etc.
  onSelect: (position: string) => void // Função chamada ao selecionar uma posição
}

export const ButtonPositionSelector: FC<ButtonPositionSelectorProps> = ({
  selectedPosition,
  onSelect,
}) => {
  // Define as posições com seus respectivos rótulos
  const positions = [
    ['top-left', 'left-center', 'bottom-left'],
    ['top-center', 'center', 'bottom-center'],
    ['top-right', 'right-center', 'bottom-right'],
  ]
  console.log(selectedPosition)
  return (
    <div className="flex gap-2">
      {positions.map((row, rowIndex) => (
        <div key={rowIndex} className="gap-4">
          {row.map((position) => (
            <div
              key={position}
              onClick={() => onSelect(position)}
              className={`w-6 h-6 border-2 cursor-pointer my-2 ${
                selectedPosition === position
                  ? 'bg-[#187BF0] border-[#187BF0]'
                  : 'border-gray-300'
              } flex items-center justify-center`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  )
}
