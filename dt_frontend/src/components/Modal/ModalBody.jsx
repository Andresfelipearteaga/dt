// src/components/ModalBody.js
import Slider from 'react-slick';
import bg from '../../assets/img1.jpg';
import { Button } from 'react-bootstrap';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const ModalBody = ({ currentSlide, setCurrentSlide, handleFileChange }) => {
  const images = [bg, bg, bg, bg];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setCurrentSlide(current),
  };

  return (
    <>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="p-3">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-100 rounded shadow-sm"
            />
            {index === images.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-3 text-center"
              >
                <input className=''
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="Upload"
                />
                <label htmlFor="Upload">
                  <button className='bt'>
                    <Upload className="mr-2" size={20} />
                    Cargar CSV
                  </button>
                </label>
              </motion.div>
            )}
          </div>
        ))}
      </Slider>
    </>
  );
};

export default ModalBody;
