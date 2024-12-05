import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../redux/actions/modalActions';

export const useUpgradeModal = () => {
  const isOpen = useSelector((state: any) => state.modal.isOpen);
  const email = useSelector((state: any) => state.modal.email);
  const dispatch = useDispatch();

  const onOpen = (email: string) => dispatch(openModal(email));
  const onClose = () => dispatch(closeModal());

  return {
    isOpen,
    email,
    onOpen,
    onClose,
  };
};
