import { useState, useEffect } from 'react';
import { Api } from 'Services/Api-service';
import { AppStyled } from './App.styled';
import { onErrorNotification } from 'Services/Notification';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';
import { Spinner } from 'components/Spinner/Spinner';
import { Modal } from 'components/Modal/Modal';

export const App  = () => {

    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [images, setImages] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);
    const [alt, setAlt] = useState(null);
    const [status, setStatus] = useState('idle');
    const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    async function getFetchImages() {
      setStatus('pending');
      const per_page = 12;

      try {
        const { hits, totalHits } = await Api.getImages(searchQuery, page);

        setImages(prevImages => [...prevImages, ...hits]);
        setStatus('resolved');
        setIsVisible(page < Math.ceil(totalHits / per_page));

        if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        onErrorNotification();
        setStatus('rejected');
      }
    }
    getFetchImages();
  }, [searchQuery, page]);

  const handleFormSubmit = query => {
    if (searchQuery === query) {
      return
    }

    resetState();
    setSearchQuery(query);
  };

  const loadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
    
  }

 const handleSelectedImage = (largeImageUrl, id) => {
  setSelectedImg(largeImageUrl);
  setAlt(id);
  }

 const closeModal = () => {
    setSelectedImg(null)
  }

  const resetState = () => {
    setSearchQuery('');
    setPage(1);
    setImages([]);
    setSelectedImg(null);
    setAlt(null);
    setStatus('idle');
  }

    if (status === 'idle') {
      return <SearchBar onSubmit={handleFormSubmit} />;
    }

    if (status === 'pending') {
      return (
        <AppStyled>
          <SearchBar onSubmit={handleFormSubmit} />
          <ImageGallery
            images={images}
            selectedImage={handleSelectedImage}
          />
          <Spinner />
          {isVisible && <LoadMoreButton onClick={loadMoreBtnClick} />} 
        </AppStyled>
      );
    }

    if (status === 'resolved') {
      return (
        <AppStyled>
           <SearchBar onSubmit={handleFormSubmit} />
             <ImageGallery
            images={images}
            selectedImage={handleSelectedImage}
             />
          {selectedImg && (
            <Modal
              selectedImg={selectedImg}
              tags={alt}
              onClose={closeModal}
            />
          )}
          {isVisible && <LoadMoreButton onClick={loadMoreBtnClick} />} 
        </AppStyled>
      );
    }

    if (status === 'rejected') {
      return (
        <AppStyled>
          <SearchBar onSubmit={handleFormSubmit} />
        </AppStyled>
      );
    }
  }

