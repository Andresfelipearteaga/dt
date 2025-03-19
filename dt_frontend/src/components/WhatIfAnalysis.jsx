import { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ScenarioModal from "./ScenarioModal";
import fetchPrediction from "../services/fetchPredict";

const WhatIfAnalysis = () => {
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [simulatedData, setSimulatedData] = useState(null);

  const calculatePercentage = (fraction) => {
    if (!fraction || typeof fraction !== "string" || !fraction.includes("/")) {
      return 0;
    }

    const [num, denom] = fraction.split("/").map(Number);
    return denom > 0 ? ((num / denom) * 100).toFixed(2) : 0;
  };

  // Función para manejar el resultado de la simulación
  const handleSimulateScenario = async (scenario) => {
    console.log("Datos enviados al servidor:", scenario);

    // Crear el formData con los valores correctos
    const formData = {
      age: scenario.age,
      gender: scenario.gender,
      attendance: scenario.attendance,
      studyHours: scenario.studyHours,
      studyHoursOnline: scenario.studyHoursOnline,
      submitted: scenario.submitted,
    };

    // Llamar a la API para obtener la predicción
    const result = await fetchPrediction(formData);
    console.log("Resultado de la predicción:", result);

    if (result && result.result) {
      const { pred } = result.result;

      console.log(`Predicción obtenida: ${pred}`);

      // Determinar el nivel de rendimiento basado en la predicción
      const performanceText = pred >= 4
        ? "Alto"
        : pred >= 3.3
        ? "Medio"
        : "Bajo";

      // Construcción de los datos para la gráfica
      const data = [
        { subject: "Asistencia", value: scenario.attendance }, // Se mantiene igual
        { subject: "Estudio", value: calculatePercentage(scenario.studyHours) },
        {
          subject: "Online",
          value: calculatePercentage(scenario.studyHoursOnline),
        },
        {
          subject: "Actividades enviadas",
          value: calculatePercentage(scenario.submitted),
        },
        { subject: "Promedio", value: ((pred / 5) * 100).toFixed(2) },
      ];

      console.log("Datos simulados:", data);
      // Actualizar el estado con los datos simulados
      setSimulatedData({ performance: pred, performanceText, data });
    } else {
      console.error(
        "Error: La respuesta de la predicción no contiene el formato esperado.",
      );
    }
  };

  return (
    <div>
      <center>
        <Button
          style={{ marginBottom: "10px", marginTop: "10px" }}
          variant="primary"
          onClick={() => setShowScenarioModal(true)}
        >
          Simular Escenario
        </Button>
      </center>

      {showScenarioModal && (
        <ScenarioModal
          show={showScenarioModal}
          onHide={() => setShowScenarioModal(false)}
          onSimulate={handleSimulateScenario}
        />
      )}

      {simulatedData
        ? (
          <div className="mt-4">
            <h3>Última simulación:</h3>
            <h5>
              Rendimiento: {simulatedData.performanceText} en{" "}
              {simulatedData.performance}%
            </h5>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={simulatedData.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
        : (
          <center>
            <Badge bg="danger">No se han realizado simulaciones</Badge>
          </center>
        )}
    </div>
  );
};

export default WhatIfAnalysis;
