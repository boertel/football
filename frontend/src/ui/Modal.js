import React, { useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

function Modal({ children, back, ...props }) {
  const navigate = useNavigate();

  const goBack = useCallback(
    (evt) => {
      evt && evt.stopPropagation();
      if (back) {
        navigate(back);
      } else {
        navigate(-1);
      }
    },
    [navigate, back]
  );

  const onKeydown = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        goBack();
      }
    },
    [goBack]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [onKeydown]);

  return (
    <DialogOverlay onDismiss={goBack}>
      <DialogContent className="modal">
        <div>
          <div className="modal-header">
            <a onClick={goBack}>&times;</a>
          </div>
          <div
            className="modal-content"
            onClick={(evt) => evt.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
}

export const withModal = (back) => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    return (
      <Modal back={back}>
        <WrappedComponent {...props} params={params} />
      </Modal>
    );
  };
};

export default Modal;
