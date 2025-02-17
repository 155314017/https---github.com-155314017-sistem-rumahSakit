import { useState } from 'react'

export const useSuccessNotification = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState('')

  const showTemporarySuccess = async (
    customMessage: string = 'Operation Successful',
    duration: number = 3000
  ) => {
    setMessage(customMessage)
    setIsSuccess(true)

    await new Promise((resolve) => setTimeout(resolve, duration))

    setIsSuccess(false)
    setMessage('')
  }

  return {
    isSuccess,
    message,
    showTemporarySuccess
  }
}
