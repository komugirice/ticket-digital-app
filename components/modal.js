import Modal from "react-modal";
import { useState } from "react";
import QRCode from "qrcode.react";

// スタイリング
const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "500px",
    height: "300px",
    transform: "translate(-50%, -50%)",
  },
};

// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement("#__next");

const QRCodeModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  // モーダルを開く処理
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // モーダルが開いた後の処理
  };

  // モーダルを閉じる処理
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      // isOpenがtrueならモダールが起動する
      isOpen={modalIsOpen}
      // モーダルが開いた後の処理を定義
      onAfterOpen={afterOpenModal}
      // モーダルを閉じる処理を定義
      onRequestClose={closeModal}
      // スタイリングを定義
      style={customStyles}
    >
      <QRCode value="https://google.com" />
      <button onClick={closeModal}>close</button>
    </Modal>
  );
};

export default QRCodeModal;
