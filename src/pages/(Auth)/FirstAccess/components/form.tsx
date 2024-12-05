import { toast } from 'sonner';
import { useAuth } from '@hooks/index';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { formVariants } from '@/animations';
import { useNavigate } from 'react-router-dom';
import { Button, InputSelect } from '@/components';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateInfoFirstAccess } from '@redux/actions/user';
import { FirstAccessFormSchema, type FirstAccessFormInputs } from '@/validation';
import { useState } from 'react';


export const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addInfoFirstAccess } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FirstAccessFormInputs>({
    resolver: zodResolver(FirstAccessFormSchema),
  });

  const handleAccess = async (data: FirstAccessFormInputs) => {
      setIsLoading(true)
      await addInfoFirstAccess.mutateAsync(data);
      setIsLoading(false)
  };

  const optionsAccountType = [
    { label: 'Escola / Infoprodutor', value: 'escola_infoprodutor' },
    { label: 'Plataforma / Área de membros', value: 'plataforma' },
    { label: 'Co-produtos / Estrategista', value: 'coprodutos' },
    { label: 'Gestor de tráfego', value: 'gestor_trafego' },
    { label: 'Outros', value: 'outros' },
  ];

  const optionsMemberArea = [
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
  ];

  const optionsVideoHosting = [
    { label: 'Vimeo', value: 'vimeo' },
    { label: 'YouTube', value: 'youtube' },
    { label: 'Hosting de Área de Membros', value: 'hosting_area_membros' },
    { label: 'Não se aplica', value: 'nao_se_aplica' },
  ];

  return (
    <motion.form variants={formVariants} onSubmit={handleSubmit(handleAccess)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Tipo de Conta</label>
        <Controller
          name="accountType"
          control={control}
          render={({ field }) => (
            <InputSelect
              {...field}
              error={errors.accountType?.message}
              options={optionsAccountType}
              variant="default"
              size="lg"
            />
          )}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Sua Área de Membros</label>
        <Controller
          name="memberArea"
          control={control}
          render={({ field }) => (
            <InputSelect
              {...field}
              error={errors.memberArea?.message}
              options={optionsMemberArea}
              variant="default"
              size="lg"
            />
          )}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Seu Hosting de Vídeos</label>
        <Controller
          name="videoHosting"
          control={control}
          render={({ field }) => (
            <InputSelect
              {...field}
              error={errors.videoHosting?.message}
              options={optionsVideoHosting}
              variant="default"
              size="lg"
            />
          )}
        />
      </div>

      <Button type="submit" className="w-full h-12" disabled={isLoading} isLoading={isLoading}>
        Acessar
      </Button>
    </motion.form>
  );
};
