import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = props => {
  const { imageUrl, onCloseModal } = props;

  const handleModalBackgroundClick = event => {
    if (event.target.classList.contains('Overlay')) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const handleEscapeClick = event => {
      if (event.key === 'Escape') {
        onCloseModal();
      }
    };
    document.addEventListener('keydown', handleEscapeClick);

    return () => {
      document.removeEventListener('keydown', handleEscapeClick);
    };
  }, [onCloseModal]);

  return (
    <div className="Overlay" onClick={handleModalBackgroundClick}>
      <div className={css.Modal}>
        <img src={imageUrl} alt="Bigger size" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
