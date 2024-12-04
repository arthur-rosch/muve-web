import { OPEN_MODAL, CLOSE_MODAL } from '../constants/modalConstants';

export interface ModalState {
  isOpen: boolean;
  email: string | null;
}

const initialState: ModalState = {
  isOpen: false,
  email: null,
};

export const modalReducer = (state = initialState, action: any): ModalState => {
  switch (action.type) {
    case OPEN_MODAL:
      return { 
        ...state, 
        isOpen: true, 
        email: action.payload.email
      };
    case CLOSE_MODAL:
      return { 
        ...state, 
        isOpen: false, 
        email: null
      };
    default:
      return state;
  }
};

