import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Login from '../Auth/Auth';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalTitle from './ModalTitle';

const ImageSliderCSVUploader = ( { onCloseModal } ) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fileName, setFileName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      setFileName(file.name);
    } else {
      alert('Por favor, selecciona un archivo CSV válido.');
    }
  };

  const handleLogin = () => {
    console.log('Login exitoso');
    setIsLoggedIn(true);
  };
  

  return (
    <>
         <Modal show={true} onHide={onCloseModal} size="lg" centered>
        { isLoggedIn 
        ?
        <>
        <Modal.Header closeButton>
        <ModalTitle />
        </Modal.Header>
        <ModalBody currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} handleFileChange={handleFileChange} />
        </>
        : <Login aunthenticate={handleLogin} />

        }

      </Modal>

      <AnimatePresence>
        {fileName && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-3 p-3 bg-light rounded shadow-sm d-flex justify-content-between align-items-center"
          >
            <span>{fileName}</span>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => setFileName('')}
            >
              <X size={16} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};



export default ImageSliderCSVUploader;
