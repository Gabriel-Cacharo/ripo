import { ICrate } from '../types';

export interface IModalEditCrateDrops {
  modalEditCrateDropsIsOpen: boolean;
  setModalEditCrateDropsIsOpen: (arg0: boolean) => void;
  crateInformations?: ICrate;
  getCratesInformationsFunction: () => void;
  setModalEditCrateIsOpen: (arg0: boolean) => void;
}
