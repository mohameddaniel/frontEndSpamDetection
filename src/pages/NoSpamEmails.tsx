import axios, { AxiosError, AxiosResponse } from 'axios';
import  { useEffect, useState } from 'react';
import EmailList from '../components/EmailList';
import { Email } from '../types/email';
import { ToastContainer,toast,Bounce } from 'react-toastify';
import { PiEmptyThin } from "react-icons/pi";

interface ApiResponse {
    data: Email[];
}

const NoSpamEmail = () => {
    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error,setError] = useState<any>('')
    useEffect(() => {
        const fetchEmails = async () => {
            try {
                console.log('Fetching non-spam emails...');
                const response: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>("https://spamdetectionbackend-production.up.railway.app/hamEmails");
                console.log('Response:', response.data);
                setEmails(response.data.data);
            }
            catch (error) {
                console.error('Error fetching emails:', error);
                if (error instanceof AxiosError) {
                    const errorMessage = error.response?.data?.message || error.message;
                    setError(`Error: ${errorMessage}`); 
                    toast.error(`Error: ${errorMessage}`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        });
                } else {
                    setError('An unexpected error occurred'); 
                    toast.error('An unexpected error occurred', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        });
                }
            } finally {
                setLoading(false);
            }
        };
        fetchEmails();
    }, []);

    if (loading) return <p className="loading">Loading Emails...</p>;
    if (error) return (
        <div className="error-container">
            <p className="error-message">{error}</p>
            <p className="error-help">Please make sure the backend server is running on port 5000</p>
        </div>
    );

    return (
       <>
             <ToastContainer/>
        <div className="email-container">
            <h1>Clean Emails</h1>
            {emails.length === 0 ? (
                <p className="no-emails">No clean emails found <PiEmptyThin size={48} color='gray'/></p>
            ) : (
                <EmailList emails={emails} />
            )}
        </div>
       </>
    );
};

export default NoSpamEmail;
