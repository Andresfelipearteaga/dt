// Componente de formulario de predicción

import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import PropTypes from 'prop-types'


const PredictionForm = ({ onPredict, newPrediction }) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [attendance, setAttendance] = useState('');
  const [submitted, setSubmitted ] = useState('');
  const [studyHours, setStudyHours] = useState('');
  const [studyHoursOnline, setStudyHoursOnline] = useState('');
  const [disabled, setDisabled] = useState(false)
 
  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(age, gender, attendance, submitted, studyHours, studyHoursOnline);
    setDisabled(true)


  };

  const handleNewPrediction = () => {
    newPrediction(true);
    setDisabled(false)
    setAttendance('');
    setSubmitted('');
    setStudyHours('');
    setStudyHoursOnline('');
    setAge('');
    setGender('');
  }
  

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Edad</Form.Label>
        <Form.Control
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min="0"
          max="100"
          required
          className="form-control-modern"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Género</Form.Label>
        <Form.Select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
        className="form-control-modern"
      >
        <option value="" disabled>
          Selecciona el género
        </option>
        <option value="0">Femenino</option>
        <option value="1">Masculino</option>
      </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Asistencia (%)</Form.Label>
        <Form.Control
          type="number"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
          min="0"
          max="100"
          required
          className="form-control-modern"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Actividades enviadas de 20</Form.Label>
        <Form.Control
          type="number"
          value={submitted}
          onChange={(e) => setSubmitted(e.target.value)}
          min="0"
          max="20"
          required
          className="form-control-modern"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Horas de estudio extracurricular de 10</Form.Label>
        <Form.Control
          type="number"
          value={studyHours}
          onChange={(e) => setStudyHours(e.target.value)}
          min="0"
          max="10"
          required
          className="form-control-modern"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Horas de estudio con recursos online de 10</Form.Label>
        <Form.Control
          type="number"
          value={studyHoursOnline}
          onChange={(e) => setStudyHoursOnline(e.target.value)}
          min="0"
          max="10"
          step="0.1"
          required
          className="form-control-modern"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100" disabled={disabled} >
      {disabled ? 'Predicción realizada' : 'Predecir Rendimiento'}  
      </Button>
      <br />
      <br />
      { disabled && (<Button variant="success" type="submit" className="w-100" onClick={handleNewPrediction} >
       Nueva Predicción  
      </Button>
      )}
    </Form>
  );
};

export default PredictionForm;

PredictionForm.propTypes = {
    onPredict: PropTypes.func.isRequired,
    newPrediction: PropTypes.func,
  };
PredictionForm.displayName = 'PredictionForm';