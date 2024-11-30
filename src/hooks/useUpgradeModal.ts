import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../redux/actions/modalActions';

export const useUpgradeModal = () => {
  const isOpen = useSelector((state: any) => state.modal.isOpen);
  const dispatch = useDispatch();

  const onOpen = () => dispatch(openModal());
  const onClose = () => dispatch(closeModal());

  return {
    isOpen,
    onOpen,
    onClose
  };
};
