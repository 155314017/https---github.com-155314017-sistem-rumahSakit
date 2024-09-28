import { TextField } from "@mui/material";

export default function NameValidation() {
  return (
      <TextField
          placeholder="Masukkan nama lengkap penanggung jawab"
          fullWidth
          value={values.fullname}
          onChange={(e) => setFieldValue('fullname', e.target.value)}
          error={touched.fullname && Boolean(errors.fullname)}
          helperText={touched.fullname && errors.fullname}
          sx={{
              mt: 2, mb: 2, border: '1px solid #8F85F3', borderRadius: '8px', width: '544px',
              '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                      borderColor: '#8F85F3',
                  },
                  '&:hover fieldset': {
                      borderColor: '#8F85F3',
                  },
                  '&.Mui-focused fieldset': {
                      borderColor: '#8F85F',
                  },
              },
          }}
      />

  )
}
