import { ICrate } from '../types';

export interface IModalEditCrate {
  modalEditCrateIsOpen: boolean;
  setModalEditCrateIsOpen: (arg0: boolean) => void;
  crateInformations?: ICrate;
  getCratesInformationsFunction: () => void;
}
