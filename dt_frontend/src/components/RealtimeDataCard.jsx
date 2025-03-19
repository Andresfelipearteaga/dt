
import { Badge, Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
;

// Componente para datos en tiempo real
const RealtimeDataCard = ({ data }) => (
    <Card className="mb-4 realtime-data-card">
      <Card.Header>
        <h2 className="h5 mb-0">Datos en Tiempo Real</h2>
      </Card.Header>
      <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Edad:</span>
            <Badge bg="primary" pill>{data.age}</Badge>
          </div>
        
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Género:</span>
            <Badge bg={data.gender === 0 ? 'danger' : 'success'} pill>{data.gender === 0 ? 'Femenino' : 'Masculino'}</Badge>
          </div>
        
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Asistencia:</span>
            <Badge bg="warning" pill>{data.attendance}%</Badge>
          </div>
        
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Actividades enviadas:</span>
            <Badge bg="info" pill>{data.submitted}</Badge>
          </div>
        
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Horas de estudio extracurricular:</span>
            <Badge bg="secondary" pill>{data.hours}hrs</Badge>
          </div>
        
        
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Horas de estudio con recursos online:</span>
            <Badge bg="dark" pill>{data.hours_online}hrs</Badge>
          </div>
        
        
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Promedio de calificación:</span>
            <Badge bg="light" pill style={{ color: 'black', border: '1px solid black' }}>{data.grades}/5</Badge>
          </div>
      </Card.Body>
    </Card>
  );

export default RealtimeDataCard;



RealtimeDataCard.propTypes = {
    data: PropTypes.shape({
      attendance: PropTypes.number.isRequired,
      hours: PropTypes.string.isRequired,
      grades: PropTypes.number.isRequired,
      submitted: PropTypes.string.isRequired,
      hours_online: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      gender: PropTypes.number.isRequired
    }),
  };
RealtimeDataCard.displayName = 'RealtimeDataCard';
  