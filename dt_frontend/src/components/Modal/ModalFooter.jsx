// src/components/ModalFooter.js
import { Button } from 'react-bootstrap';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const ModalFooter = ({ currentSlide, totalSlides, handleFileChange }) => {
  return (
        <div className="justify-content-between">
      {currentSlide === totalSlides - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="csvUpload"
          />
          <label htmlFor="csvUpload">
            <Button
              variant="outline-primary"
              as="span"
              className="d-flex align-items-center"
            >
              <Upload className="mr-2" size={20} />
              Cargar CSV
            </Button>
          </label>
        </motion.div>
      )}
        </div>
  );
};

export default ModalFooter;
