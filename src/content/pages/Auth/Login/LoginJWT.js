import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Checkbox,
  Typography,
  Link,
  FormControlLabel,
  CircularProgress,
  Alert
} from '@mui/material';
import useAuth from 'src/hooks/useAuth';
import useRefMounted from 'src/hooks/useRefMounted';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const LoginJWT = () => {
  const { login } = useAuth();
  const isMountedRef = useRefMounted();
  const { t } = useTranslation();
  const [alertState, setalertState] = useState(false)

  return (
    <Formik
      initialValues={{
        email: 'leandrocordero@gmail.com',
        password: '123456',
        terms: true,
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email(t('No parece una dirección de correo electronico'))
          .max(255)
          .required(t('El correo electronico es requerido')),
        password: Yup.string()
          .min(6,t('La Contraseña debe tener por lo menos 6'))
          .required(t('La contraseña es requerida')),
        terms: Yup.boolean().oneOf(
          [true],
          t('Tienes que aceptar los terminos y condiciones para ingresar')
        )
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const res = await login(values.email, values.password);
   
          if (isMountedRef.current && res.ok) {
            setStatus({ success: true });
            setSubmitting(false);
          }
       
          if(res.msg === 'Password no valida'){
              setErrors({password:t('Constraseña incorrecta')})
            }

          if(res.msg === 'El usuario no existe con ese email'){
              setErrors({email:t('El usuario no existe con este email')})
            }

          if(res.msg ==='Cuenta Pendiente de Autorización'){
            setalertState(true)
          }
                    
        } catch (err) {
          console.error(err);
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            margin="normal"
            autoFocus
            helperText={touched.email && errors.email}
            label={t('Correo Electronico')}
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            margin="normal"
            helperText={touched.password && errors.password}
            label={t('Contraseña')}
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-between"
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.terms}
                  name="terms"
                  color="primary"
                  onChange={handleChange}
                />
              }
              label={
                <>
                  <Typography variant="body2">
                    {t('Acepto los')}{' '}
                    <Link component="a" href="#">
                      {t('Terminos y Condiciones')}
                    </Link>
                    .
                  </Typography>
                </>
              }
            />
            <Link component={RouterLink} to="/account/recover-password">
              <b>{t('Recuperar Contraseña')}</b>
            </Link>
          </Box>

          {Boolean(touched.terms && errors.terms) && (
            <FormHelperText error>{errors.terms}</FormHelperText>
          )}

          <Button
            sx={{
              mt: 3
            }}
            color="primary"
            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
            disabled={isSubmitting}
            type="submit"
            fullWidth
            size="large"
            variant="contained"
          >
            {t('Ingresar')}
          </Button>
          {alertState &&
          <Alert severity="warning" onClose={() => {setalertState(false)}}>Cuenta pendiente de aprobación.</Alert>
            }
        </form>
      )}
    </Formik>
  );
};

export default LoginJWT;
