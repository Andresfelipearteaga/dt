
import { Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
;

// Componente para datos en tiempo real
const RealtimeDataCard = () => (
    <Card className="mb-4 realtime-data-card">
      <Card.Header>
        <h2 className="h5 mb-0">¿Que es un gemelo digital?</h2>
      </Card.Header>
      <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
          Un gemelo digital es una representación virtual de un objeto, proceso o sistema físico que se crea utilizando datos en tiempo real y modelos avanzados de simulación. Esta tecnología permite monitorear, analizar y predecir el comportamiento del activo físico, optimizando su rendimiento, reduciendo costos de mantenimiento y mejorando la toma de decisiones.
          </div>
        

      </Card.Body>
    </Card>
  );

export default RealtimeDataCard;



RealtimeDataCard.propTypes = {
    data: PropTypes.shape({
      attendance: PropTypes.number.isRequired,
      hours: PropTypes.number.isRequired,
      grades: PropTypes.number.isRequired,
      submitted: PropTypes.number.isRequired,
      hours_online: PropTypes.number.isRequired,
      age: PropTypes.number.isRequired,
      gender: PropTypes.number.isRequired
    }).isRequired,
    selectedKPIs: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
RealtimeDataCard.displayName = 'RealtimeDataCard';
  