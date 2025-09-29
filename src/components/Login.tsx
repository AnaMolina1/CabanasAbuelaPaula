import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import auth from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👁️ estado para el ojito
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Ingresá tu email para poder recuperar la contraseña.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Te enviamos un correo para restablecer tu contraseña.");
    } catch (err) {
      console.error(err);
      setError("Error al enviar el correo de recuperación.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Box sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center'
        }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
            Login del Administrador
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleLogin}>
            <TextField 
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField 
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              sx={{ mt: 2, py: 1.5, fontSize: '1rem' }}
            >
              Iniciar Sesión
            </Button>
          </form>

          {/* 🔑 Nueva opción para recuperar contraseña */}
          <Button 
            variant="text"
            color="secondary"
            fullWidth
            sx={{ mt: 1, fontSize: '0.9rem', textTransform: 'none' }}
            onClick={handlePasswordReset}
          >
            ¿Olvidaste tu contraseña?
          </Button>

          {/* Botón Cancelar para volver al inicio */}
          <Button 
            variant="outlined" 
            color="secondary" 
            fullWidth
            sx={{ mt: 2, py: 1, fontSize: '1rem' }}
            onClick={() => navigate('/')}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
