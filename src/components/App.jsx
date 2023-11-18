import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchImages } from 'js/search-api';
import Notiflix from 'notiflix';

export const App = () => {
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function loadImages() {
      try {
        setIsLoading(true);
        const response = await fetchImages(query, page);
        if (response.data.hits.length === 0) {
          Notiflix.Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        if (page === 1) {
          Notiflix.Notify.success(
            `Hooray! We found ${response.data.totalHits} images.`
          );
        }

        if (response.data.totalHits <= page * 12) {
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
        }

        setImages(prevImages => prevImages.concat(response.data.hits));
        setTotalImages(response.data.totalHits);
      } catch (error) {
        Notiflix.Notify.failure(
          'Ooops... Something went wrong! Please, try again.'
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadImages();
  }, [query, page]);

  const handleSearch = myQuery => {
    setQuery(myQuery);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleClickImage = imageUrl => {
    setShowModal(true);
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  return (
    <>
      <Searchbar onSubmit={handleSearch} />

      <ImageGallery images={images} onImageClick={handleClickImage} />
      {totalImages > page * 12 && !isLoading && (
        <Button onLoadMore={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      {showModal && (
        <Modal imageUrl={selectedImage} onCloseModal={handleCloseModal} />
      )}
    </>
  );
};
