import { ICrate } from '../types';

export interface IModalEditCrate {
  modalEditCrateIsOpen: boolean;
  setModalEditCrateIsOpen: (arg0: boolean) => void;
  setModalEditCrateDropsOpen: () => void;
  crateInformations?: ICrate;
  getCratesInformationsFunction: () => void;
}
