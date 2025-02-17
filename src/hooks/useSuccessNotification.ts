import { useState } from "react";

export const useSuccessNotification = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const showTemporarySuccess = async (
    customMessage: string = "Operation Successful", 
    duration: number = 3000
  ) => {
    setMessage(customMessage);
    setIsSuccess(true);

    await new Promise((resolve) => setTimeout(resolve, duration));

    setIsSuccess(false);
    setMessage(""); 
  };

  return {
    isSuccess,
    message,
    showTemporarySuccess,
  };
};
