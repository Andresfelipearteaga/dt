import { Card } from 'react-bootstrap';

// Componente para datos en tiempo real
const ConceptCard = () => (
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

export default ConceptCard;





  