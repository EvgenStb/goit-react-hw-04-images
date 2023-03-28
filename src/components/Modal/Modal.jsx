import {useEffect} from 'react';
import './Modal.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({img, tags, closeModal}) {
  useEffect (() => {
    const closeByKey = e => {
      if (e.code !== 'Escape') {
        return
      }
      closeModal()
    };
    window.addEventListener('keydown', closeByKey)
    return () => {
      window.removeEventListener('keydown', closeByKey)
    }
  },[closeModal])

 const closeByClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };
  return createPortal(
      <div className="Overlay" onClick={closeByClick}>
        <div className="Modal">
          <img src={img} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }


Modal.propTypes = {
  img: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
