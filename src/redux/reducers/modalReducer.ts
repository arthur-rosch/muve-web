import { OPEN_MODAL, CLOSE_MODAL } from '../constants/modalConstants';

export interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

export const modalReducer = (state = initialState, action: any): ModalState => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isOpen: true };
    case CLOSE_MODAL:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};
