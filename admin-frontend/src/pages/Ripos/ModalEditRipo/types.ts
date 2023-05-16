import { IRipo } from '../types';

export interface IModalEditRipo {
  modalEditRipoIsOpen: boolean;
  setModalEditRipoIsOpen: (arg0: boolean) => void;
  ripoInformations?: IRipo;
}
