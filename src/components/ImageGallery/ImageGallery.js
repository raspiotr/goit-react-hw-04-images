import { useEffect, useRef } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = props => {
  const { images, onImageClick } = props;
  const lastNewImageRef = useRef();
  const prevImages = useRef(images);

  useEffect(() => {
    const scrollToLastNewImage = () => {
      if (lastNewImageRef.current) {
        lastNewImageRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    };

    if (prevImages.current !== images) {
      scrollToLastNewImage();
    }

    prevImages.current = images;
  }, [images]);

  return (
    <ul className={css.ImageGallery}>
      {images.map((image, index) => (
        <ImageGalleryItem
          key={image.id}
          imageUrl={image.webformatURL}
          imageTags={image.tags}
          onImageClick={() => onImageClick(image.largeImageURL)}
          forwardRef={index === images.length - 1 ? lastNewImageRef : null}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
