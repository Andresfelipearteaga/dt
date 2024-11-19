import { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Componente modal para simulación de escenarios
const ScenarioModal = ({ show, onHide, onSimulate }) => {
  const [scenario, setScenario] = useState({
    attendance: 0,
    studyHours: 0,
    studyHoursOnline: 0,
    submitted: 0,
  });

  // Carga inicial del estado desde localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('dataToWhatIf'));
    if (storedData) {
      setScenario(storedData);
    }
  }, [show]); // Se ejecuta cuando `show` cambia

  const handleChange = (e) => {
    setScenario({ ...scenario, [e.target.name]: parseFloat(e.target.value) });
  };

  const simulateScenario = () => {
    const randomPerformance = (Math.random() * (4.8 - 4) + 4).toFixed(2);
    onSimulate(scenario, randomPerformance);
    console.log("Simulando escenario:", scenario);
    console.log("Performance:", randomPerformance);

    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Simular Escenario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Asistencia */}
          <Form.Group className="mb-3">
            <Form.Label>
              ¿Qué pasaría si asistieras el {scenario.attendance}% del tiempo?
            </Form.Label>
            <Form.Control
              type="number"
              name="attendance"
              value={scenario.attendance}
              onChange={handleChange}
              min="0"
              max="100"
              className="form-control-modern"
            />
          </Form.Group>

          {/* Horas de estudio extracurriculares */}
          <Form.Group className="mb-3">
            <Form.Label>
              ¿Qué pasaría si estudiaras {scenario.studyHours} de 10 horas semanales?
            </Form.Label>
            <Form.Control
              type="number"
              name="studyHours"
              value={scenario.studyHours}
              onChange={handleChange}
              min="0"
              max="10"
              className="form-control-modern"
            />
          </Form.Group>

          {/* Horas de estudio con recursos online */}
          <Form.Group className="mb-3">
            <Form.Label>
              ¿Qué pasaría si estudiaras {scenario.studyHoursOnline} de 10 horas usando recursos online?
            </Form.Label>
            <Form.Control
              type="number"
              name="studyHoursOnline"
              value={scenario.studyHoursOnline}
              onChange={handleChange}
              min="0"
              max="10"
              className="form-control-modern"
            />
          </Form.Group>

          {/* Actividades enviadas */}
          <Form.Group className="mb-3">
            <Form.Label>
              ¿Qué pasaría si enviaras {scenario.submitted} de 20 actividades?
            </Form.Label>
            <Form.Control
              type="number"
              name="submitted"
              value={scenario.submitted}
              onChange={handleChange}
              min="0"
              max="20"
              className="form-control-modern"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={simulateScenario}>
          Simular
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ScenarioModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSimulate: PropTypes.func,
};

ScenarioModal.displayName = 'ScenarioModal';

export default ScenarioModal;
