import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import PropTypes from "prop-types";

const PredictionForm = ({ onPredict, newPrediction }) => {
  const [predictionData, setPredictionData] = useState({
    age: "",
    gender: "",
    attendance: "",
    submitted: "",
    studyHours: "",
    studyHoursOnline: "",
  });

  const [inputData, setInputData] = useState({
    totalSubmitted: "",
    totalStudyHours: "",
    totalOnlineStudyHours: "",
  });

  const [disabled, setDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPredictionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(predictionData, inputData);
    setDisabled(true);
  };

  const handleNewPrediction = () => {
    newPrediction(true);
    setDisabled(false);
    setPredictionData({
      age: "",
      gender: "",
      attendance: "",
      submitted: "",
      studyHours: "",
      studyHoursOnline: "",
    });
    setInputData({
      totalSubmitted: "",
      totalStudyHours: "",
      totalOnlineStudyHours: "",
    });
  };

  const inputStyle = {
    borderRadius: "8px",
    border: "1px solid #ccc",
    padding: "8px 12px",
    fontSize: "14px",
    transition: "0.3s",
    width: "100%",
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Edad</Form.Label>
        <Form.Control
          type="number"
          name="age"
          value={predictionData.age}
          onChange={handleChange}
          min={0}
          max="100"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Género</Form.Label>
        <Form.Select
          name="gender"
          value={predictionData.gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Selecciona el género</option>
          <option value="0">Femenino</option>
          <option value="1">Masculino</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Asistencia (%)</Form.Label>
        <Form.Control
          type="number"
          name="attendance"
          value={predictionData.attendance}
          onChange={handleChange}
          min={0}
          max="100"
          required
        />
      </Form.Group>

      {/* Campo de actividades enviadas */}
      <Form.Group className="mb-3">
        <Form.Label>
          Actividades enviadas de
          <input
            className="ms-2"
            type="number"
            name="totalSubmitted"
            value={inputData.totalSubmitted}
            onChange={handleInputChange}
            max="50"
            min={0}
            style={{ ...inputStyle, width: "80px", marginLeft: "8px" }}
            onKeyDown={(e) => e.preventDefault()}
            onWheel={(e) => e.preventDefault()}
          />
          {!inputData.totalSubmitted && (
            <span className="text-muted ms-2">
              Escribe una cantidad para continuar
            </span>
          )}
        </Form.Label>
        <Form.Control
          type="number"
          name="submitted"
          value={predictionData.submitted}
          onChange={handleChange}
          min={0}
          max={inputData.totalSubmitted}
          disabled={!inputData.totalSubmitted}
          required
          onKeyDown={(e) => e.preventDefault()}
          onWheel={(e) => e.preventDefault()}
        />
      </Form.Group>

      {/* Campo de horas de estudio */}
      <Form.Group className="mb-3">
        <Form.Label>
          Horas de estudio extracurricular de
          <input
            className="ms-2"
            type="number"
            name="totalStudyHours"
            value={inputData.totalStudyHours}
            onChange={handleInputChange}
            max="50"
            min={0}
            style={{ ...inputStyle, width: "80px", marginLeft: "8px" }}
            onKeyDown={(e) => e.preventDefault()}
            onWheel={(e) => e.preventDefault()}
          />
          {!inputData.totalStudyHours && (
            <span className="text-muted ms-2">
              Escribe una cantidad para continuar
            </span>
          )}
        </Form.Label>
        <Form.Control
          type="number"
          name="studyHours"
          value={predictionData.studyHours}
          onChange={handleChange}
          min={0}
          max={inputData.totalStudyHours}
          disabled={!inputData.totalStudyHours}
          required
          onKeyDown={(e) => e.preventDefault()}
          onWheel={(e) => e.preventDefault()}
        />
      </Form.Group>

      {/* Campo de horas de estudio online */}
      <Form.Group className="mb-3">
        <Form.Label>
          Horas de estudio con recursos online de
          <input
            className="ms-2"
            type="number"
            name="totalOnlineStudyHours"
            value={inputData.totalOnlineStudyHours}
            onChange={handleInputChange}
            max="20"
            min={0}
            style={{ ...inputStyle, width: "80px", marginLeft: "8px" }}
            onKeyDown={(e) => e.preventDefault()}
            onWheel={(e) => e.preventDefault()}
          />
          {!inputData.totalOnlineStudyHours && (
            <span className="text-muted ms-2">
              Escribe una cantidad para continuar
            </span>
          )}
        </Form.Label>
        <Form.Control
          type="number"
          name="studyHoursOnline"
          value={predictionData.studyHoursOnline}
          onChange={handleChange}
          min="0"
          max={inputData.totalOnlineStudyHours}
          disabled={!inputData.totalOnlineStudyHours}
          required
          onKeyDown={(e) => e.preventDefault()}
          onWheel={(e) => e.preventDefault()}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        {disabled ? "Predicción realizada" : "Predecir Rendimiento"}
      </Button>

      {disabled && (
        <>
          <br />
          <br />
          <Button
            variant="success"
            className="w-100"
            onClick={handleNewPrediction}
          >
            Nueva Predicción
          </Button>
        </>
      )}
    </Form>
  );
};

PredictionForm.propTypes = {
  onPredict: PropTypes.func.isRequired,
  newPrediction: PropTypes.func,
};

export default PredictionForm;
