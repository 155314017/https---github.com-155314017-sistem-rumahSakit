export const gridContainerStyle = () => {
  return {
    flex: 1,
    mb: 3,
    gap: 1,
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '50%',
    justifyContent: 'space-between',
    '@media (min-width: 1010px) and (max-width: 1194px)': {
      maxWidth: '55%'
    },
    '@media (min-width: 900px) and (max-width: 1010px)': {
      maxWidth: '60%'
    },
    '@media (min-width: 750px) and (max-width: 900px)': {
      maxWidth: '70%'
    },
    '@media  (max-width: 750px)': {
      maxWidth: '100%'
    }
  }
}
