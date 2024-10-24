import { z } from 'zod'
import { type FC } from 'react'
import { useAuth } from '../../../hooks'
import logo from '../../../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import loginImg from '../../../assets/bg-login.png'
import { useDispatch } from 'react-redux'
import { Button, InputSelect, toastError } from '../../../components'
import { updateInfoFirstAccess } from '../../../redux/actions/user'

const FirstAccessFormSchema = z.object({
  accountType: z.string().refine((value) => value !== '', {
    message: 'Selecione um tipo de conta.',
  }),
  memberArea: z.string().refine((value) => value !== '', {
    message: 'Selecione uma área de membros.',
  }),
  videoHosting: z.string().refine((value) => value !== '', {
    message: 'Selecione um hosting de vídeos.',
  }),
})

type FirstAccessFormInputs = z.infer<typeof FirstAccessFormSchema>

export const FirstAccess: FC = () => {
  const { addInfoFirstAccess } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FirstAccessFormInputs>({
    resolver: zodResolver(FirstAccessFormSchema),
  })

  const handleAccess = async ({
    accountType,
    memberArea,
    videoHosting,
  }: FirstAccessFormInputs) => {
    console.log(accountType, memberArea, videoHosting)
    const { success } = await addInfoFirstAccess({
      accountType,
      memberArea,
      videoHosting,
    })
    if (success) {
      dispatch(
        updateInfoFirstAccess({
          accountType,
          memberArea,
          videoHosting,
        }),
      )
      navigate('/dashboard')
    } else {
      toastError({ text: 'Erro ao acessar. Verifique os dados inseridos.' })
    }
  }

  return (
    <>
      <div className="w-full h-screen flex bg-[#121212]">
        <div className="max-w-[50%] w-full h-screen flex items-center justify-center flex-col">
          <div className="max-w-[40%] flex items-start justify-center flex-col">
            <img src={logo} alt="" className="mb-8 w-36 h-w-36 text-start" />
            <h1 className="text-white text-2xl font-bold mb-4">Vamos pedir isso apenas uma vez, juro! 😄</h1>
            <p className="text-white text-sm font-semibold mb-4">
              Escolha suas preferências para acessar sua conta
            </p>
            <form
              className="w-[150%] flex flex-col"
              onSubmit={handleSubmit(handleAccess)}
            >
              {/* Input Tipo de Conta */}
              <label
                className="text-white my-2 font-semibold"
                htmlFor="accountType"
              >
                Tipo de Conta
              </label>
              <Controller
                name="accountType"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    {...field}
                    className="w-full h-12 p-2 mb-2 border-white"
                    options={[
                      { label: 'Selecione o tipo de conta', value: '' }, // Placeholder option
                      {
                        label: 'Escola / Infoprodutor',
                        value: 'escola_infoprodutor',
                      },
                      {
                        label: 'Plataforma / Área de membros',
                        value: 'plataforma',
                      },
                      {
                        label: 'Co-produtos / Estrategista',
                        value: 'coprodutos',
                      },
                      { label: 'Gestor de tráfego', value: 'gestor_trafego' },
                      { label: 'Outros', value: 'outros' },
                    ]}
                    placeholder="Selecione o tipo de conta"
                  />
                )}
              />
              {errors.accountType && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.accountType.message}
                </p>
              )}

              {/* Select Área de Membros */}
              <label
                className="text-white my-2 font-semibold"
                htmlFor="memberArea"
              >
                Sua Área de Membros
              </label>
              <Controller
                name="memberArea"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    {...field}
                    className="w-full h-12 p-2 mb-2 border-white"
                    options={[
                      { label: 'Selecione sua área de membros', value: '' }, // Placeholder option
                      { label: 'Curseduca', value: 'curseduca' },
                      { label: 'Astron Members', value: 'astron_members' },
                      { label: 'Blitz Pay', value: 'blitz_pay' },
                      { label: 'Buildreall', value: 'buildreall' },
                      { label: 'Cademí', value: 'cademi' },
                      { label: 'Cativa Digital', value: 'cativa_digital' },
                      { label: 'Cursology', value: 'cursology' },
                      { label: 'Dopputs', value: 'dopputs' },
                      { label: 'Ead plataforma', value: 'ead_plataforma' },
                      { label: 'Eduzz', value: 'eduzz' },
                      { label: 'Freen', value: 'freen' },
                      { label: 'HeroSpark', value: 'herospark' },
                      { label: 'Hotmart', value: 'hotmart' },
                      { label: 'Kiwify', value: 'kiwify' },
                      { label: 'MemberKit', value: 'memberkit' },
                      { label: 'Mentory', value: 'mentory' },
                      { label: 'Não se aplica', value: 'nao_se_aplica' },
                      { label: 'Netror', value: 'netror' },
                    ]}
                    placeholder="Selecione sua área de membros"
                  />
                )}
              />
              {errors.memberArea && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.memberArea.message}
                </p>
              )}

              {/* Select Hosting de Vídeos */}
              <label
                className="text-white my-2 font-semibold"
                htmlFor="videoHosting"
              >
                Seu Hosting de Vídeos
              </label>
              <Controller
                name="videoHosting"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    {...field}
                    className="w-full h-12 p-2 mb-2 border-white"
                    options={[
                      { label: 'Selecione seu hosting de vídeos', value: '' }, // Placeholder option
                      { label: 'Vimeo', value: 'vimeo' },
                      { label: 'YouTube', value: 'youtube' },
                      {
                        label: 'Hosting de Área de Membros',
                        value: 'hosting_area_membros',
                      },
                      { label: 'Não se aplica', value: 'nao_se_aplica' },
                    ]}
                    placeholder="Selecione seu hosting de vídeos"
                  />
                )}
              />
              {errors.videoHosting && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.videoHosting.message}
                </p>
              )}

              <Button
                className="w-full h-12 mt-4"
                type="submit"
                variant="primary"
                text="Acessar"
              />
            </form>
          </div>
        </div>
        <div className="max-w-[50%] w-full h-screen p-8">
          <img
            src={loginImg}
            alt=""
            className="rounded-xl h-full w-full object-contain"
          />
        </div>
      </div>
    </>
  )
}
