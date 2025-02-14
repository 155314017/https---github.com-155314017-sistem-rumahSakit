export const getBorderStyle = (page: number, currentPage: number) => {
  if (page === currentPage) {
    return {
      display: 'flex',
      border: '1px solid #8F85F3',
      width: '38px',
      height: '38px',
      borderRadius: '8px',
      justifyContent: 'center',
      alignItems: 'center'
    }
  } else if (page < currentPage) {
    return {
      display: 'flex',
      border: '1px solid #8F85F3',
      width: '38px',
      height: '38px',
      borderRadius: '8px',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#8F85F3',
      color: 'white'
    }
  } else {
    return {
      display: 'flex',
      border: '1px solid #8F85F3',
      width: '38px',
      height: '38px',
      borderRadius: '8px',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#8F85F3'
    }
  }
}
