import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { User, Lock, LogIn } from 'lucide-react';

const LoginForm = ( { aunthenticate } ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de autenticación
    if (username === 'admin' && password === 'password123') {
      setIsLoggedIn(true);
      setErrorMessage('');
      aunthenticate();
    } else {
      setErrorMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <div className="text-center mb-4">
            <h1>Iniciar Sesión</h1>
            <p className="text-muted">Por favor, ingrese sus credenciales</p>
          </div>

          {/* Si hay error, mostrar el Alert */}
          {errorMessage && (
            <Alert variant="danger" className="text-center">
              {errorMessage}
            </Alert>
          )}

          {isLoggedIn ? (
            <Alert variant="success" className="text-center">
              ¡Inicio de sesión exitoso!
            </Alert>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>
                  <User className="mr-2" size={20} /> Usuario
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>
                  <Lock className="mr-2" size={20} /> Contraseña
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  className="d-flex align-items-center justify-content-center"
                >
                  <LogIn className="mr-2" size={20} /> Iniciar Sesión
                </Button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
