import { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

// 🔹 Definir acciones preventivas fuera del componente para evitar recreación innecesaria
const ACTIONS = {
  "attendance": [
    "Implementar un sistema de recordatorios para las clases",
    "Ofrecer incentivos por asistencia perfecta",
    "Proporcionar opciones de asistencia remota",
    "Realizar seguimiento personalizado con estudiantes con baja asistencia",
    "Organizar sesiones de estudio en grupo para fomentar la asistencia",
  ],
  "submitted": [
    "Establecer un sistema de entregas parciales para proyectos grandes",
    "Implementar un sistema de recordatorios para fechas límite",
    "Ofrecer sesiones de tutoría para ayudar con las actividades",
    "Proporcionar retroalimentación rápida para motivar entregas tempranas",
    "Crear un sistema de recompensas por entregas consistentes",
  ],
  "studyHours": [
    "Proporcionar recursos de estudio adicionales",
    "Organizar grupos de estudio extracurriculares",
    "Ofrecer sesiones de orientación sobre técnicas de estudio efectivas",
    "Implementar un sistema de seguimiento de horas de estudio",
    "Crear desafíos de estudio con recompensas",
  ],
  "studyHoursOnline": [
    "Recomendar plataformas de aprendizaje online específicas",
    "Crear una lista curada de recursos online relevantes",
    "Organizar webinars sobre el uso efectivo de recursos online",
    "Implementar un sistema de badges por completar cursos online",
    "Proporcionar acceso a suscripciones premium de plataformas educativas",
  ],
  "grades": [
    "Ofrecer sesiones de tutoría personalizada",
    "Implementar un sistema de mentoría entre pares",
    "Proporcionar exámenes de práctica y recursos de repaso",
    "Organizar talleres sobre técnicas de estudio y manejo del tiempo",
    "Crear un plan de mejora personalizado basado en las áreas débiles",
  ],
};

// 🔹 Función para predecir acciones preventivas
const predictActions = (performance, value) => {
  if (performance >= 3 || !value || !value.field) {
    return { message: "El promedio esperado indica que no se necesitan acciones preventivas", actions: [] };
  }

  const fieldActions = ACTIONS[value.field] || [];
  return {
    message: "Acciones preventivas recomendadas basadas en el rendimiento",
    actions: fieldActions,
  };
};

// 🔹 Componente principal
const PreventiveActions = ({ performances, value, statePredict }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState("Sin acciones preventivas recomendadas");

  useEffect(() => {
    if (statePredict) {
      const { message, actions } = predictActions(performances, value);
      setRecommendations(actions);
      setMessage(message);
    }
  }, [statePredict, performances, value]);

  return (
    <Card>
      <Card.Header>Acciones Preventivas Recomendadas por IA</Card.Header>
      <Card.Body>
        <p>{message}</p>

        {/* Mostrar recomendaciones si las hay */}
        {recommendations.length > 0 ? (
          <Card className="mb-3">
            <ListGroup variant="flush">
              {recommendations.map((action, index) => (
                <ListGroup.Item key={index}>{action}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        ) : (
          <p>No hay acciones preventivas recomendadas.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default PreventiveActions;

// 🔹 Definir PropTypes
PreventiveActions.propTypes = {
  performances: PropTypes.number, // Se ajusta el tipo a number porque es un promedio
  value: PropTypes.object.isRequired, 
  statePredict: PropTypes.bool.isRequired,
};

PreventiveActions.displayName = 'PreventiveActions';
