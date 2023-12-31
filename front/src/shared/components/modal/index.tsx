import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { OpenModalActions } from "../../../redux/features/openModal";

import { ModalType } from "./types";

import { ModalContent } from "./styled";

const ModalCreate = ({ children }: ModalType) => {
  const open = useAppSelector((state) => state.openModal.open);
  const dispatch = useAppDispatch();
  const { setOpenModal } = OpenModalActions;

  const handleCancel = () => {
    dispatch(setOpenModal(false));
  };

  return (
    <Modal
      open={open}
      centered={true}
      width="30rem"
      footer={false}
      onCancel={handleCancel}
    >
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};

export default ModalCreate;
