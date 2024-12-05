import { OPEN_MODAL, CLOSE_MODAL } from '../constants/modalConstants';

export const openModal = (email: string) => ({
  type: OPEN_MODAL,
  payload: { email }, // Inclui o email no payload
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
