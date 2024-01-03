export interface IConfirmRecreateRipoModal {
  modalConfirmRecreateIsOpen: boolean;
  setModalConfirmRecreateIsOpen: (value: boolean) => void;
  oldRipoImage: string;
  newRipoImage: string;
  loading: boolean;
  handleRecreateRipo: () => void;
}
