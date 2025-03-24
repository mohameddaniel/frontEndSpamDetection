import { Link, useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiInboxArchiveLine } from "react-icons/ri";
import { RiSpam2Fill } from "react-icons/ri";
import { LuCircleChevronDown } from "react-icons/lu";
import { MdOutlineMailLock } from "react-icons/md";
import { ToastContainer,toast,Bounce } from 'react-toastify';
import { TbClick } from "react-icons/tb";

export default function Header() {
  const location = useLocation();
/*   const [error, setError] = useState<string | null>(null);
 */  const [loading, setLoading] = useState<boolean>(false); 
  const navigate = useNavigate();
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleClick = async () => {
    setLoading(true);  
/*     setError(null);  
 */    try {
      console.log('Getting and predicting emails...');
      const response = await axios.get("https://spamdetectionbackend-production.up.railway.app/predict");  
      toast.success(`Data Predicted Successfully`, {
        position: "top-center",
        theme: "light",
        transition: Bounce,
        });
      console.log('Response:', response.data);
      navigate('/all');
    } catch (error) {
      console.error('Error getting or predicting emails:', error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.message;
/*         setError(`Error: ${errorMessage}`);
 */        toast.error(`Error: ${errorMessage}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      } else {
        toast.error('An unexpected error occurred', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
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

  return (
  <>
       
    <header className="app-header">
      <div className="header-content responsive-header">
        <div className="header-logo">
          <MdOutlineMailLock size={28} color='gray' />
          <span className="logo-text">Spam Detection</span>
          <button  className="gray-text" onClick={handleClick} disabled={loading}> 
          <TbClick size={20} className={loading ? 'spinning' : ''} /> 
             {loading ? ' Predicting...' : ' Predict'}     
        </button>
        </div>
       
       {/*  {error && <div className="error-message">{error}</div>}  */}

        <nav className="navigation responsive-navigation">
          <ul className="responsive-nav-list">
            <li>
              <Link to="/all" className={isActive('/all') ? 'active' : ''}>
                <RiInboxArchiveLine  size={22} color='gray'/>
                Your Inbox
              </Link>
            </li>
            <li>
              <Link to="/spam" className={isActive('/spam') ? 'active' : ''}>
                <RiSpam2Fill size={22} color='gray' />

                Spam Emails
              </Link>
            </li>
            <li>
              <Link to="/no-spam" className={isActive('/no-spam') ? 'active' : ''}>
              <LuCircleChevronDown size={22} color='gray' />
              Clean Emails
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </>
  );
}
