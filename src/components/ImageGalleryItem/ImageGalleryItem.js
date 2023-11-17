import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = props => {
  const { imageUrl, imageTags, onImageClick, forwardRef } = props;

  return (
    <li className={css.ImageGalleryItem} ref={forwardRef}>
      <img
        className={css.ImageGalleryItemImage}
        src={imageUrl}
        alt={imageTags}
        onClick={onImageClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageTags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  forwardRef: PropTypes.object,
};
