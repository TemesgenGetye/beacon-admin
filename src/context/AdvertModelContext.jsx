import { createContext, useState, useContext, useEffect } from 'react';

const AdvertModelContext = createContext(null);

export const AdvertProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAdvert, setCurrentAdvert] = useState(null);
  const [show, setShow] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const handleOpenModal = (advert = null, mode) => {
    setIsModalOpen(true);
    setCurrentAdvert(advert);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentAdvert(null);
    setShow(false);
  };
  return (
    <AdvertModelContext.Provider
      value={{
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        currentAdvert,
        setShow,
        show,
        modalMode,
        setModalMode,
      }}
    >
      {children}
    </AdvertModelContext.Provider>
  );
};

export const useAdvertModel = () => useContext(AdvertModelContext);
