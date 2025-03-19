import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types'


// Componente de alertas y notificaciones
const AlertsNotifications = ({ show, onClose }) => (
    <Alert variant="warning" show={show} onClose={onClose} dismissible className="mb-4 custom-alert">
      <Alert.Heading>
        <i className="fas fa-exclamation-triangle mr-2"></i> Alerta de Rendimiento
      </Alert.Heading>
      <p>
        El rendimiento predicho está por debajo del umbral aceptable. Se recomiendan acciones inmediatas.
      </p>
    </Alert>
  );

export default AlertsNotifications;

AlertsNotifications.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
AlertsNotifications.displayName = 'AlertsNotifications';