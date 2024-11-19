// Componente principal para el análisis What-If

import { useState, } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import PropTypes from 'prop-types'
import ScenarioModal from './ScenarioModal';

// const LazyScenarioModal = lazy(() => import('./ScenarioModal'));

const WhatIfAnalysis = () => {
    const [showScenarioModal, setShowScenarioModal] = useState(false);
    const [simulatedData, setSimulatedData] = useState(null);
  
    // Función para manejar el resultado de la simulación
    const handleSimulateScenario = (scenario, performance) => {
      const performanceText =
        performance >= 4 ? "Alto" : performance >= 3.3 ? "Medio" : "Bajo";
  
      const data = [
        { subject: "Asistencia", value: scenario.attendance},
        { subject: "Estudio", value: (scenario.studyHours / 10) * 100 },
        { subject: "Online", value: (scenario.studyHoursOnline / 10) * 100 },
        { subject: "Actividades enviadas", value: (scenario.submitted / 20) * 100 },
        { subject: "Promedio", value: ((performance / 5) * 100).toFixed(2) },

      ];
  
      setSimulatedData({ performance, performanceText, data });
    };
  
    return (
      <div>
        <center><Button style={{marginBottom: '10px', marginTop: '10px'}} variant="primary" onClick={() => setShowScenarioModal(true)}>
          Simular Escenario
        </Button></center>
        { showScenarioModal && (
        <ScenarioModal
          show={showScenarioModal}
          onHide={() => setShowScenarioModal(false)}
          onSimulate={handleSimulateScenario}
        />
          )}
        {simulatedData 
          ? <div className="mt-4">
            <h3>Ultima simulacion:</h3>
            <h5>Rendimiento: {simulatedData.performanceText} en {simulatedData.performance}%</h5>
  
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={simulatedData.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" 
                 label={{ value: 'Campos en %', position: 'insideBottom', offset: 10, fill: 'gray', textAnchor: 'middle' }}
                 
                 tick={false} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          : <center><Badge bg='danger'>No se han realizado simulaciones</Badge></center>
        }
      </div>
    );
  };

export default WhatIfAnalysis;

