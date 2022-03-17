import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  FormControlLabel,
  Link,
  CircularProgress,
  MenuItem,
  Alert
} from '@mui/material';
import useAuth from 'src/hooks/useAuth';
import useRefMounted from 'src/hooks/useRefMounted';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

function RegisterJWT() {
  const { register } = useAuth();
  const isMountedRef = useRefMounted();
  const { t } = useTranslation();
  const [alertState, setAlertState] = useState(false)
 
  
  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        terms: false,
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email(t('Esto no parece un email'))
          .max(255)
          .required(t('Tu correo electronico es obligatorio')),
        name: Yup.string().max(255).required(t('Tu nombre es obligatorio')),
        password: Yup.string()
          .min(6)
          .max(255)
          .required(t('Necesitamos una contraseña para tu cuenta')),
        terms: Yup.boolean().oneOf(
          [true],
          t('Hay que aceptar los terminos y condiciones para generar tu cuenta')
        ),
        empresa: Yup.string()
          .required(t('Necesitamos que elijas una empresa')),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
      
        try {
          console.log(register)
          await register(values.email, values.name, values.password, values.empresa);
      
          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
           }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
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
            error={Boolean(touched.name && errors.name)}
            fullWidth
            margin="normal"
            helperText={touched.name && errors.name}
            label={t('Nombre')}
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            margin="normal"
            helperText={touched.email && errors.email}
            label={t('Correo Electrónico')}
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

          <TextField
          select
          error={Boolean(touched.empresa && errors.empresa)}
          fullWidth
          margin="normal"
          helperText={touched.empresa && errors.empresa}
          name="empresa"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.empresa}
          variant="outlined"
         
         
        >
            <MenuItem key={1} value='Grupo Ayuda Médica'>
            Grupo Ayuda Médica
            </MenuItem>
            <MenuItem key={2} value='Vittal'>
            Vittal
            </MenuItem>
        
        </TextField>

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
                  {t('Aceptá los')}{' '}
                  <Link component="a" href="#">
                    {t('términos y condiciones')}
                  </Link>
                  .
                </Typography>
              </>
            }
          />
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
            {t('Solicitá tu cuenta')}
          </Button>
          {alertState &&
          <Alert severity="warning" onClose={() => {setAlertState(false)}}>Cuenta pendiente de aprobación.</Alert>
            }
        </form>
      )}
      
    </Formik>
  );
}

export default RegisterJWT;