import { useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Play, BarChart2, Brain, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import backgroundImage from '../assets/bg.jpg';
// import title from '../assets/title.png';
import logo from '../assets/logo.png';
import '../index.css';

import ImageSliderCSVUploader from '../components/Modal/UpdatedDataset';

const DigitalTwinLanding = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    console.log('El modal se cerró desde el componente hijo');
    setShowModal(false);
  };

  const Nav = () => {
    navigate('/dashboard');
  };


  return (
    <div className="background-container">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <Container fluid className="relative d-flex justify-content-center">
        <Row className="justify-content-center align-items-center">

          <Col md={5}>

          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 backdrop-filter backdrop-blur-lg mb-4 overflow-hidden p-4">
      <Card.Body className="p-auto">
        <div className="flex items-center mb-4">
          <img src={logo} alt="title" className="title-image" />
        </div>
        <Card.Text className="mb-6 text-lg leading-relaxed" style={{ color: 'gray'}}>
          Gemelo digital de modelado de rendimiento estudiantil con inteligencia artificial
        </Card.Text>
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex items-center mb-3">
            <BarChart2 className="text-blue-500 mr-3" size={20}  style={{ color: 'gray'}}/>
            <strong className="text-white" >....</strong>
            <Badge bg='primary' pill className="text-white">
            Análisis predictivo avanzado
            </Badge>
          </div>
          <div className="flex items-center mb-3">
            <Brain className="text-green-500 mr-3" size={20} style={{ color: 'gray'}} />
            <strong className="text-white" >....</strong>
            <Badge bg='primary' pill className="ml-2 text-white">
            IA integrada para simulación de escenarios
            </Badge>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button className='bt'
          onClick={Nav}
          > <Play className="icon hidden"/>
          Comenzar
          </button>

          <button className='bt' onClick={() => setShowModal(true)}>
          <RefreshCw className="icon hidden"/>
          Actualizar Dataset
          </button>
          {showModal
          ? <ImageSliderCSVUploader onCloseModal={handleCloseModal} />
          : null}

      </div>
      </Card.Body>
    </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DigitalTwinLanding;