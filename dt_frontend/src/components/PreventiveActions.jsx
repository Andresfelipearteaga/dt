import { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PreventiveActions = ({ performances, mlModel, value, statePredict }) => {
  const [recommendations, setRecommendations] = useState({});
  const [message, setMessage] = useState('Sin acciones preventivas recomendadas');

  // Efecto para evitar renderizados infinitos
  useEffect(() => {
    if ( statePredict && performances <= 3) {
      const resultPredict = mlModel.predict(performances, value);
      console.log('resultPredict', resultPredict);
      const newRecommendations = resultPredict.fieldActions;
      console.log('newRecommendations', newRecommendations);
      setRecommendations(newRecommendations || []);
      setMessage('Acciones preventivas recomendadas basadas en el rendimiento');
    } else {
      setMessage('El promedio esperado indica que no se necesitan acciones preventivas');
      setRecommendations([]);
    }
  }, [performances, mlModel, value, statePredict]); // El efecto depende de subjects y performances

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

PreventiveActions.propTypes = {
  subjects: PropTypes.array,
  performances: PropTypes.object, 
  mlModel: PropTypes.object,
  value: PropTypes.object,
  statePredict: PropTypes.bool
};
PreventiveActions.displayName = 'PreventiveActions';

