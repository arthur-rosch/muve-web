
import { toast } from 'sonner';
import { Local } from '../services/Local';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/actions/user';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../services/AuthService';
import type { SignInVariables, SignUpVariables } from '../types';
import { useUpgradeModal } from './useUpgradeModal';
import { handleError } from './handle-error';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { onOpen } = useUpgradeModal();


const signIn = useMutation({
    mutationFn: (variables: SignInVariables) => AuthService.signIn(variables),
    onSuccess: async (response, variables) => {
      if (response.success && response.data) {
        dispatch(setUser(response.data.user));
        Local.setJWT(response.data.token);
        Local.setPlan(
          response.data.signature.plan,
          response.data.signature.next_charge_date!,
          response.data.signature.ChargeFrequency
        );

        toast.success('Login feito com sucesso');
        navigate(response.data.user.accountType === null ? '/access' : '/dashboard');
      } else {
        if (response.error?.message === 'Email verification not found or not verified.') {
          await sendVerificationCode.mutateAsync({
            email: variables.email,
          });
          toast.success("Um novo código foi enviado para o e-mail cadastrado. Verifique sua conta.");
          navigate('/verify-email', { state: { email: variables.email } });
        } else {
          const upgradeErrors = [
            'Late subscription.',
            'Subscription paused.',
            'Subscription cancelled.',
          ];

          if (upgradeErrors.includes(response.error?.message!)) {
            handleError(response.error?.message!);
            onOpen();
          } else {
            handleError(response.error?.message!);
          }
        }
      }
    },
    onError: (error) => {
      const upgradeErrors = [
        'Late subscription.',
        'Subscription paused.',
        'Subscription cancelled.',
      ];

      if (upgradeErrors.includes(error.message!)) {
        handleError(error.message!);
        onOpen();
      } else {
        handleError(error.message!);
      }
    },
  });


  const signUp = useMutation({
    mutationFn: (variables: SignUpVariables) => AuthService.signUp(variables),
    onSuccess: (response) => {
      if (response.success && response.data) {
        toast.success('Conta criada com sucesso!');
        navigate('/verify-email', { state: { email:response.data.user.email } });
      } else {
        handleError(response.error?.message!)
      }

    },
    onError: (error) => handleError(error.message),
  });

  const validateVerificationCode = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) => AuthService.validateVerificationCode({
      email, code,
    }),
    onSuccess: (response) => {
      if (response.success && response.data) {
        toast.success('Conta verificada com sucesso!');
        navigate('/login');
      } else {
        handleError(response.error?.message!)
      }
    },
    onError: (error) => handleError(error.message),
  });

  const sendVerificationCode = useMutation({
    mutationFn: ({ email,  }: { email: string }) => AuthService.sendVerificationCode({
      email,
    }),
    onSuccess: (response) => {
      if (response.success && response.data) {
        toast.success('Código re-enviado com sucesso!');
      } else {
        handleError(response.error?.message!)
      }
    },
    onError: (error) => handleError(error.message),
  });

  const generatePasswordResetToken = useMutation({
    mutationFn: (email: string) => AuthService.generatePasswordResetToken(email),
    onSuccess: (response) => {
      if (response.success && response.data) {
        toast.success('Token de redefinição de senha gerado, verifique seu e-mail.');
      } else {
        handleError(response.error?.message!)
      }

    },
    onError: (error) => handleError(error.message),
  });

  const checkEmailExistence = useMutation({
    mutationFn: (email: string) => AuthService.checkEmailExistence(email),
    onSuccess: () => {
      toast.success('Email disponível!');
    },
    onError: (error) => handleError(error.message ),
  });

  const forgotPassword = useMutation({
    mutationFn: ({ newPassword, confirmNewPassword, token }: { newPassword: string, confirmNewPassword: string, token: string }) => 
      AuthService.forgotPassword(token, newPassword, confirmNewPassword),
    onSuccess: (response) => {
      if (response.data && response.success) {
        toast.success('Senha redefinida com sucesso!');
        navigate('/login');
      } else {
        handleError(response.error?.message!)
      }

    },
    onError: (error) => handleError(error.message ),
  });

  const checkJWT = useMutation({
    mutationFn: () => AuthService.checkJWT(),
    onSuccess: (response) => {
      if(response.success && response.data) {
        dispatch(setUser(response.data.user));
        navigate('/dashboard');
      } else {
        console.log(response.error?.message!)
        handleError(response.error?.message!)
        navigate('/login');
      }
      
    },
    onError: (error) => handleError(error.message ),
  });

  const addInfoFirstAccess = useMutation({
    mutationFn: ({ accountType, memberArea, videoHosting }: { accountType: string, memberArea: string, videoHosting: string }) =>
      AuthService.addInfoFirstAccess(accountType, memberArea, videoHosting),
    onSuccess: (response) => {
      if (response.data && response.success) {
        toast.success('Informações de primeiro acesso adicionadas!');
        navigate('/dashboard');
      }
      else {
        handleError(response.error?.message!)
      }
    },
    onError: (error) => handleError(error.message ),
  });

  return {
    signIn,
    signUp,
    checkJWT,
    forgotPassword,
    checkEmailExistence,
    addInfoFirstAccess,
    sendVerificationCode,
    validateVerificationCode,
    generatePasswordResetToken,
  };
};
