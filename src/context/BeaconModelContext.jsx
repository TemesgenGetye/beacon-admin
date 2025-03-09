import { createContext, useState, useContext, useEffect } from 'react';

const BeaconModalContext = createContext(null);

export const BeaconProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBeacon, setCurrentBeacon] = useState(null);
  const [show, setShow] = useState(false);
  const [modalMode, setModalMode] = useState('create');

  const handleOpenModal = (beacon = null, mode) => {
    setIsModalOpen(true);
    setCurrentBeacon(beacon);
    setModalMode(mode);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentBeacon(null);
    setShow(false);
  };
  return (
    <BeaconModalContext.Provider
      value={{
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        currentBeacon,
        setShow,
        show,
        modalMode,
        setModalMode,
      }}
    >
      {children}
    </BeaconModalContext.Provider>
  );
};

export const useBeaconModel = () => useContext(BeaconModalContext);
