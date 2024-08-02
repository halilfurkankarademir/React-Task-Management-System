import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../styles/Modal.css";
import { useTranslation } from "react-i18next";

const CustomModal = ({ isVisible, handleClose }) => {
    const { t } = useTranslation();

    const diff = Math.round(
        parseFloat(localStorage.getItem("diff")) / 1000 / 60
    );

    let msg = "";

    diff < 60
        ? (msg = diff + t("modal.minutes"))
        : (msg =
              Math.round(diff / 60) +
              t("modal.hours") +
              diff%60 +
              t("modal.minutes"));

    return (
        <Modal
            show={isVisible}
            onHide={handleClose}
            centered
            className="error-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {t("modal.complete")}
                    <i class="bi bi-check2-circle"></i>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {t("modal.msg2")} {msg}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    className="modal-button"
                >
                    {t("modal.close")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
