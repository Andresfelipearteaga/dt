import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const ScenarioModal = ({ show, onHide, onSimulate }) => {
  const [scenario, setScenario] = useState({});
  const [inputData, setInputData] = useState({});

  // Cargar datos desde localStorage
  useEffect(() => {
    if (show) {
      const storedData = JSON.parse(localStorage.getItem("dataToWhatIf"));
      if (storedData) {
        setScenario(storedData.predictionData || {});
        setInputData(storedData.inputData || {});
      }
    }
  }, [show]);

  // Obtener valores con fallback a 0
  const getValue = (key, isInput = false) => {
    return isInput ? inputData[key] || 0 : scenario[key] || 0;
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setScenario((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  // Preparar y enviar el escenario modificado
  const handleSubmitScenario = () => {
    const updatedScenario = {
      ...scenario,
      studyHours: `${scenario.studyHours}/${getValue("totalStudyHours", true)}`,
      studyHoursOnline: `${scenario.studyHoursOnline}/${getValue("totalOnlineStudyHours", true)}`,
      submitted: `${scenario.submitted}/${getValue("totalSubmitted", true)}`,
    };

    console.log("Datos enviados al padre:", updatedScenario);
    onSimulate(updatedScenario);
    onHide();
  };

  // Campos del formulario
  const fields = [
    { label: "Asistencia", name: "attendance", max: 100 },
    { label: "Estudio extracurricular", name: "studyHours", max: getValue("totalStudyHours", true) },
    { label: "Estudio con recursos online", name: "studyHoursOnline", max: getValue("totalOnlineStudyHours", true) },
    { label: "Actividades enviadas", name: "submitted", max: getValue("totalSubmitted", true) },
  ];

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Simular Escenario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields.map(({ label, name, max }) => (
            <Form.Group className="mb-3" key={name}>
              <Form.Label>
                ¿Qué pasaría si {label.toLowerCase()} {getValue(name)} de {max}?
              </Form.Label>
              <Form.Control
                type="number"
                name={name}
                value={getValue(name)}
                onChange={handleChange}
                min="0"
                max={max}
                className="form-control-modern"
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmitScenario}>
          Simular
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ScenarioModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSimulate: PropTypes.func.isRequired,
};

ScenarioModal.displayName = "ScenarioModal";

export default ScenarioModal;
