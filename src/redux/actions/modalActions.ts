import { OPEN_MODAL, CLOSE_MODAL } from '../constants/modalConstants';

export const openModal = () => ({
  type: OPEN_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
