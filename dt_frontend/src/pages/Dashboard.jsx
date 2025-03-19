import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  Alert,
  Badge,
  Card,
  Col,
  Container,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import axios from "axios";
import fetchPrediction from "../services/fetchPredict";
import AlertsNotifications from "../components/AlertsNotifications";
import PredictionForm from "../components//PredictionForm";
import PreventiveActions from "../components/PreventiveActions";
import RealtimeDataCard from "../components/RealtimeDataCard";
import WhatIfAnalysis from "../components/WhatIfAnalysis";
import Concept from "../components/concept_dt";
// import ScenarioModal from '../components/ScenarioModal';
import title from "../assets/logo.png";
import person1 from "../assets/person1.png";
import person2 from "../assets/person2.png";
import "../index.css";
import bg from "../assets/bg.jpg";

// Importación perezosa
const LazyTrendsChart = lazy(() => import("../components/TrendsChart"));
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
  const [activeTab, setActiveTab] = useState("prediction");
  const [value, setValue] = useState({ field: "", minValue: null });
  const [statePredict, setStatePredict] = useState(false);
  const [wasDisabled, setWasDisabled] = useState(true);
  const [animate, setAnimate] = useState(false);
  const tabRef = useRef(null);

  useEffect(() => {
    // Hacer scroll hacia arriba
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (wasDisabled && statePredict) {
      setTimeout(() => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 1000); // Duración del bloom
      }, 1000); // Esperar 2 segundos antes de iniciar la animación
    }
    setWasDisabled(!statePredict);
  }, [statePredict]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://edutlasdeveloper.pythonanywhere.com/DatasetDt",
      );
      const data = response.data.csv_data;

      if (data.length > 0) {
        setRealtimeData(data);
        console.log("data", data);
      } else {
        setError("No se encontraron datos.");
      }
    } catch (error) {
      console.error("Error fetching real-time data:", error);
      setError("Error al obtener los datos.");
    } finally {
      setLoading(false);
    }
  };
  // Simulación de actualización en tiempo real
  useEffect(() => {
    console.log("Datos cargados inicialmente");
    getData();
  }, []);

  useEffect(() => {
    console.log("Mostrando nuevo índice");
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

  const handlePredict = async (predictionData, inputData) => {
    const formData = {
      age: predictionData.age,
      gender: predictionData.gender,
      attendance: predictionData.attendance,
    };

    // Combinar los datos predichos y los de entrada cuando existen en inputData
    if (inputData.totalStudyHours) {
      formData.studyHours =
        `${predictionData.studyHours}/${inputData.totalStudyHours}`;
    }

    if (inputData.totalOnlineStudyHours) {
      formData.studyHoursOnline =
        `${predictionData.studyHoursOnline}/${inputData.totalOnlineStudyHours}`;
    }

    if (inputData.totalSubmitted) {
      formData.submitted =
        `${predictionData.submitted}/${inputData.totalSubmitted}`;
    }

    console.log(formData);
    console.log(inputData);

    // Llamar a la función que maneja la solicitud
    const result = await fetchPrediction(formData);

    if (result && result.result) {
      const { model, pred } = result.result;

      console.log(`Mejor modelo: ${model}`);
      console.log(`Predicción: ${pred}`);
      setStatePredict(true);

      // Guardar la predicción
      setPredictedGrade(pred);
      setPredictedModel(model);

      // Validar si se deben mostrar alertas
      setShowAlerts(pred < 3);

      const formDataAcademics = {
        predictionData,
        inputData,
      };

      localStorage.setItem("dataToWhatIf", JSON.stringify(formDataAcademics));

      // Buscar el campo con el valor más bajo
      const findLowestValue = (data) => {
        console.log("data", data);

        const entries = Object.entries(data)
          .filter(([key]) => key !== "gender" && key !== "age")
          .map(([key, val]) => [key, Number(val)]);

        // Encontrar el campo con el valor más bajo
        const [field, minValue] = entries.reduce(
          (acc, curr) => (curr[1] < acc[1] ? curr : acc),
          entries[0],
        );

        console.log("field", field);
        console.log("minValue", minValue);
        setValue({ field, minValue });
      };

      findLowestValue(formDataAcademics.predictionData);
    } else {
      console.error("La respuesta no contiene el formato esperado.");
    }
  };

  const HandleNewPrediction = (newPrediction) => {
    console.log("newPrediction", newPrediction);
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
        <h1
          className="text-center mb-5"
          style={{ color: "gray", fontWeight: "400" }}
        >
          <img src={title} alt="title" className="title-image-dashboard" />{" "}
          Gemelo Digital Avanzado
        </h1>
        <Row>
          <Col md={3}>
            <div>
              {loading
                ? <p>Cargando datos...</p>
                : error
                ? <p>{error}</p>
                : currentData
                ? <RealtimeDataCard data={currentData} />
                : <p>No hay datos disponibles.</p>}
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
                  {
                    /* {!statePredict && (
  <div className="lock-overlay">
    <div className="lines"></div>
    <div className="lock-icon">🔒</div>
    <div className="lines"></div>
  </div>
)} */
                  }
                  <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    id="dashboard-tabs"
                    className="mb-3"
                  >
                    <Tab eventKey="prediction" title="Predicción">
                      <PredictionForm
                        onPredict={handlePredict}
                        newPrediction={HandleNewPrediction}
                      />
                    </Tab>
                    <Tab eventKey="trends" title="Tendencias">
                      {activeTab === "trends" && (
                        <Suspense fallback={<p>Cargando...</p>}>
                          <LazyTrendsChart data={currentData} />
                        </Suspense>
                      )}
                    </Tab>
                    <Tab
                      eventKey="whatIf"
                      className={!statePredict ? "disabled" : "enabled"}
                      title={
                        <span
                          ref={tabRef}
                          className={animate ? "bloom-effect" : "tab-whatif"}
                        >
                          Análisis What-If
                        </span>
                      }
                      disabled={!statePredict}
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
                <Alert.Heading>
                  <strong>Resultado de la predicción</strong>
                </Alert.Heading>
                <h5 className="mb-2">
                  Calificación predicha:{" "}
                  <Badge bg={predictedGrade >= 3 ? "success" : "danger"} pill>
                    {predictedGrade}
                  </Badge>
                </h5>
                <h5 className="mb-0">
                  Mejor modelo: <Badge>{predictedModel}</Badge>
                </h5>
              </Alert>
            )}
            <AlertsNotifications
              show={showAlerts}
              onClose={() => setShowAlerts(false)}
            />

            <PreventiveActions
              performances={predictedGrade}
              value={value}
              statePredict={statePredict}
            />
            <img src={person2} alt="person1" className="title-image" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
