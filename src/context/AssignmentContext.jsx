import { createContext, useState, useContext, useEffect } from 'react';

const AssignmentContext = createContext(null);

export const AssignmentProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [show, setShow] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [showModalForAssignment, setShowModalForAssignment] = useState(false);

  const handleOpenModal = (mode, data) => {
    setIsModalOpen(true);
    setCurrentAssignment(data);
    setModalMode(mode);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentAssignment(null);
    setShow(false);
  };

  const handleShowModel = data => {
    setShowModalForAssignment(true);
    setCurrentAssignment(data);
  };
  const handleCloseModel = () => {
    setShowModalForAssignment(false);
    setCurrentAssignment(null);
  };
  return (
    <AssignmentContext.Provider
      value={{
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        currentAssignment,
        setShow,
        show,
        modalMode,
        setModalMode,
        handleShowModel,
        handleCloseModel,
        showModalForAssignment,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
};

export const useAssignmentModel = () => useContext(AssignmentContext);
export default AssignmentContext;
