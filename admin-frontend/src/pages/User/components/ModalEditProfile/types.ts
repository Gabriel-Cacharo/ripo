import { IUser } from '../../types';

export interface IModalEditUser {
  modalEditUserIsOpen: boolean;
  setModalEditUserIsOpen: (arg0: boolean) => void;
  userInformations: IUser;
}
