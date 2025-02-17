import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export default function useQueueDashboard() {
    const [successSkipPatient, setSuccessSkipPatient] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.state && location.state.successSkip) {
            showTemporarySuccessSkipPatient();
            navigate(location.pathname);
        }
    }, [location.state, navigate]);

    const showTemporarySuccessSkipPatient = async () => {
        setSuccessSkipPatient(true)
        await new Promise(resolve => setTimeout(resolve, 3000))
        setSuccessSkipPatient(false)
    }
    return {
        successSkipPatient
    }
}