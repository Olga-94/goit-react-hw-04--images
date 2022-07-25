import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalBox, Image } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClose, selectedImg, tags}) =>{
 
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

    return createPortal(
      <ModalOverlay onClick={handleBackdropClick}>
        <ModalBox>
          <Image src={selectedImg} alt={tags} />
        </ModalBox>
      </ModalOverlay>,
      modalRoot
    );
  
}

Modal.propTypes = {
  selectedImg: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClose: PropTypes.func,
};