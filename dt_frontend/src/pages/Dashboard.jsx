import { useState, useEffect, lazy, Suspense } from 'react';
import { Container, Row, Col, Card, Alert, Tabs, Tab, Badge } from 'react-bootstrap';
// import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Camera } from 'lucide-react';
import axios from 'axios';

import AlertsNotifications from '../components/AlertsNotifications';
import PredictionForm from '../components//PredictionForm';
import PreventiveActions from '../components/PreventiveActions';
import RealtimeDataCard from '../components/RealtimeDataCard';
import WhatIfAnalysis  from '../components/WhatIfAnalysis'
import Concept from '../components/concept_dt'
// import ScenarioModal from '../components/ScenarioModal';
import title from '../assets/logo.png';
import person1 from '../assets/person1.png'
import person2 from '../assets/person2.png'
import '../index.css';
import bg from '../assets/bg.jpg';

// Importación perezosa
const LazyTrendsChart = lazy(() => import('../components/TrendsChart'));
// const LazyWhatIf = lazy(() => import ('../components/WhatIfAnalysis') )


// Estilos personalizados
const styles = `
  body {
    background: url(${bg});
    font-family: 'Poppins', sans-serif;
  }
  
  .dashboard-container {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin-top: 50px;
  }
  
  .card {
    border: none;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  .card-header {
    background-color: #f8f9fa;
    border-bottom: none;
    font-weight: 600;
  }
  
  .btn-primary {
    background-color: #4c6ef5;
    border-color: #4c6ef5;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    transition: all 0.15s ease;
  }
  
  .btn-primary:hover {
    background-color: #3b5bdb;
    border-color: #3b5bdb;
    transform: translateY(-1px);
  }
  
  .form-control {
    border-radius: 8px;
  }
  
  .nav-tabs .nav-link {
    border: none;
    color: #495057;
    font-weight: 500;
    padding: 12px 20px;
  }

  nav-tabs .nav-link:hover {
    background-color: #black;
  }
  
  .nav-tabs .nav-link.active {
    color: #4c6ef5;
    background-color: transparent;
    border-bottom: 2px solid #4c6ef5;
  }

  
  .alert {
    border-radius: 10px;
  }
  
  .modal-content {
    border-radius: 15px;
    border: none;
  }

.lock-overlay {
  position: relative; /* Cambiado a relative para trabajar con las líneas */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10; /* Mantiene el candado encima */
}

.lines {
  width: 140px; /* Ancho de la línea */
  height: 2px; /* Grosor de la línea */
  background: linear-gradient(to right, #ccc, transparent, #ccc);
  margin: 0 auto; /* Centra la línea */
  position: relative;
  left: 6%; /* Ajusta la línea a la derecha */
}

.lock-icon {
  position: absolute; /* Coloca el candado en el centro */
  top: -20px; /* Ajusta el candado respecto a las líneas */
  left: 314px; /* Centra el candado en el centro */
  font-size: 2rem; /* Tamaño del candado */
  color: #555; /* Color del candado */
}




`;



// Componente principal del Dashboard
const Dashboard = () => {
  const [realtimeData, setRealtimeData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [predictedGrade, setPredictedGrade] = useState(null);
  const [predictedModel, setPredictedModel] = useState(null);
  const [showAlerts, setShowAlerts] = useState(false);
  // const [selectedKPIs, setSelectedKPIs] = useState(['age', 'gender', 'attendance', 'submitted', 'studyHours', 'studyHoursOnline', 'grades']);
  // const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [activeTab, setActiveTab] = useState('prediction');
  const [value, setValue] = useState({ field: '', minValue: null });
  const [statePredict, setStatePredict] = useState(false);

  const getData = async () => { 
    try {
      const response = await axios.get('https://edutlasdeveloper.pythonanywhere.com/DatasetDt');
      const data = response.data.csv_data;
      
      if (data.length > 0) {
        setRealtimeData(data);
        console.log('data', data);
      } else {
        setError('No se encontraron datos.');
      }
    } catch (error) {
      console.error('Error fetching real-time data:', error);
      setError('Error al obtener los datos.');
    } finally {
      setLoading(false);
    }
  };
  // Simulación de actualización en tiempo real
  useEffect(() => {
    console.log('Datos cargados inicialmente');
        getData(); 
  }, []);

  useEffect(() => {

    console.log('Mostrando nuevo índice');
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (realtimeData.length > 0) {
          return (prevIndex + 1) % realtimeData.length;
        }
        return prevIndex; 
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [realtimeData.length]);


  const currentData = realtimeData[currentIndex];



  // Simulación de predicción
  const handlePredict = async (age, gender, attendance, submitted, studyHours, studyHoursOnline) => {
    const formData = {
      age,
      gender,
      attendance,
      submitted,
      studyHours,
      studyHoursOnline
    };

  try {
    // Hacer la solicitud POST al backend enviando formData
    const response = await axios.post('https://edutlasdeveloper.pythonanywhere.com/predictDt', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response)

    
    if (response.data && response.data.result) {
      const { model, pred } = response.data.result;
      
      console.log(`Mejor modelo: ${model}`);
      console.log(`Predicción: ${pred}`);
      setStatePredict(true);
    } else {
      console.error('La respuesta no contiene el formato esperado.');
    }

    // // Suponiendo que la respuesta tiene el valor de la predicción
    // const prediction = response.data.result.pred;
    const prediction = response.data.result.pred;

    const model = response.data.result.model;
    // // Guardar el valor de la predicción
    setPredictedGrade(prediction);
    setPredictedModel(model);

    // // Realizar validaciones con la predicción
    if (prediction < 3) {
      setShowAlerts(true);
    } else {
      setShowAlerts(false); // Si no es necesario mostrar alertas
    }

    const formDataAcademics = {
      attendance,
      submitted,
      studyHours,
      studyHoursOnline 
    }

    localStorage.setItem('dataToWhatIf', JSON.stringify(formDataAcademics));

    const findLowestValue = (data) => {
      console.log('data', data);


    // Filtrar solo los campos numéricos
    const entries = Object.entries(data).map(([key, val]) => [key, Number(val)]);

    // Encontrar el campo con el valor más bajo
    const [field, minValue] = entries.reduce(
      (acc, curr) => (curr[1] < acc[1] ? curr : acc),
      entries[0]
    );
    console.log('field', field);
    console.log('minValue', minValue);
    // Actualizar el estado con el campo y valor más bajo
    setValue({ field, minValue });
    }
 
    findLowestValue(formDataAcademics);

    
  } catch (error) {
    console.error('Error al obtener la predicción:', error);
  }
  };

  const mlModel = {
    predict: (performance, value ) => {
      // En un escenario real, este modelo sería entrenado con datos históricos
      const actions = {
        'attendance': [
          'Implementar un sistema de recordatorios para las clases',
          'Ofrecer incentivos por asistencia perfecta',
          'Proporcionar opciones de asistencia remota',
          'Realizar seguimiento personalizado con estudiantes con baja asistencia',
          'Organizar sesiones de estudio en grupo para fomentar la asistencia'
        ],
        'submitted': [
          'Establecer un sistema de entregas parciales para proyectos grandes',
          'Implementar un sistema de recordatorios para fechas límite',
          'Ofrecer sesiones de tutoría para ayudar con las actividades',
          'Proporcionar retroalimentación rápida para motivar entregas tempranas',
          'Crear un sistema de recompensas por entregas consistentes'
        ],
        'studyHours': [
          'Proporcionar recursos de estudio adicionales',
          'Organizar grupos de estudio extracurriculares',
          'Ofrecer sesiones de orientación sobre técnicas de estudio efectivas',
          'Implementar un sistema de seguimiento de horas de estudio',
          'Crear desafíos de estudio con recompensas'
        ],
        'studyHoursOnline': [
          'Recomendar plataformas de aprendizaje online específicas',
          'Crear una lista curada de recursos online relevantes',
          'Organizar webinars sobre el uso efectivo de recursos online',
          'Implementar un sistema de badges por completar cursos online',
          'Proporcionar acceso a subscripciones premium de plataformas educativas'
        ],
        'grades': [
          'Ofrecer sesiones de tutoría personalizada',
          'Implementar un sistema de mentoría entre pares',
          'Proporcionar exámenes de práctica y recursos de repaso',
          'Organizar talleres sobre técnicas de estudio y manejo del tiempo',
          'Crear un plan de mejora personalizado basado en las áreas débiles'
        ]
      };
  
      // Simulamos la selección de acciones basada en el rendimiento y el valor
      const fieldActions = actions[value.field];
      const threshold = value.minValue;
      console.log('fieldActions', fieldActions);
      console.log('threshold', threshold);
      if (performance < 3 && fieldActions) {
        return {fieldActions, threshold};
    } else {
      return ['No hay acciones preventivas recomendadas.'], performance;
  }
}
};


const HandleNewPrediction = (newPrediction) => {
  console.log('newPrediction', newPrediction);
  if (newPrediction) {
    setPredictedGrade(null);
    setStatePredict(false);
    setPredictedModel(null);
    localStorage.clear();
  }
};

  return (
    <>
      <style>{styles}</style>
      <Container fluid className="dashboard-container">
        <h1 className="text-center mb-5" style={{ color: 'gray', fontWeight: '400' }}><img src={title} alt="title" className="title-image-dashboard" />      Gemelo Digital Avanzado</h1>
        <Row>
          <Col md={3}>
          <div>
      {loading ? (
        <p>Cargando datos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : currentData ? (
        <RealtimeDataCard data={currentData} />
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </div>
            <Concept />
            {/* <KPISelector selectedKPIs={selectedKPIs} setSelectedKPIs={setSelectedKPIs} /> */}
            <img src={person1} alt="person1" className="title-image" />
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>
                <h2 className="h5 mb-0">Dashboard Principal</h2>
              </Card.Header>
              <Card.Body>
              <div style={{ position: "relative" }}>
      {/* Icono de candado y líneas */}
      {/* {!statePredict && (
  <div className="lock-overlay">
    <div className="lines"></div>
    <div className="lock-icon">🔒</div>
    <div className="lines"></div>
  </div>
)} */}
              <Tabs 
                    activeKey={activeTab} 
                    onSelect={(k) => setActiveTab(k)} 
                    id="dashboard-tabs" 
                    className="mb-3"
                  >                  
                  <Tab eventKey="prediction" title="Predicción">
                    <PredictionForm onPredict={handlePredict} newPrediction={HandleNewPrediction} />
                  </Tab>
                  <Tab eventKey="trends" title="Tendencias">
                  {activeTab === 'trends' && (
                    <Suspense fallback={<p>Cargando...</p>}>
                    <LazyTrendsChart data={currentData} />
                    </Suspense>
                  )}
                  </Tab>
                  
                  <Tab eventKey="whatIf" title="Análisis What-If" disabled={!statePredict}
                  >
                      <WhatIfAnalysis />
                        </Tab>
             </Tabs>
             </div>

              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
          {predictedGrade && (
                      <Alert variant="info" className="mt-3">
                        <Alert.Heading> <strong>Resultado de la predicción</strong></Alert.Heading>
                        <h5 className="mb-2">Calificación predicha: <Badge bg={predictedGrade >= 3 ? 'success' : 'danger'} pill>{predictedGrade}</Badge></h5>
                        <h5 className="mb-0">Mejor modelo: <Badge>{predictedModel}</Badge></h5>

                      </Alert>
                    )}
            <AlertsNotifications show={showAlerts} onClose={() => setShowAlerts(false)} />
          
            <PreventiveActions performances={predictedGrade} mlModel={mlModel} value={value} statePredict={statePredict} />
            <img src={person2} alt="person1" className="title-image" />

          </Col>

        </Row>
        {/* <ScenarioModal show={showScenarioModal} onHide={() => setShowScenarioModal(false)} /> */}
      </Container>
    </>
  );
};

export default Dashboard;