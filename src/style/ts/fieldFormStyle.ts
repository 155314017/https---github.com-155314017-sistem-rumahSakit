/* eslint-disable @typescript-eslint/no-explicit-any */

export const fieldFormStyle = (touched: any, errors: any, fieldName: string) => ({
  height: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: touched[fieldName] && errors[fieldName] ? '#ffcccc' : 'inherit',
    '&:focus-within .MuiOutlinedInput-notchedOutline': {
      borderColor: '#8F85F3'
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #ccc'
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px',
    fontSize: '16px'
  }
})
