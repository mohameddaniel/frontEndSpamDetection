import { Link, useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiInboxArchiveLine } from "react-icons/ri";
import { RiSpam2Fill } from "react-icons/ri";
import { LuCircleChevronDown } from "react-icons/lu";
import { MdOutlineMailLock } from "react-icons/md";

export default function Header() {
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); 
  const navigate = useNavigate();
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleClick = async () => {
    setLoading(true);  
    setError(null);  
    try {
      console.log('Getting and predicting emails...');
      const response = await axios.get("https://spamdetectionbackend-production.up.railway.app/predict");  
      console.log('Response:', response.data);
      navigate(0);
    } catch (error) {
      console.error('Error getting or predicting emails:', error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.message;
        setError(`Error: ${errorMessage}`);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="app-header">
      <div className="header-content responsive-header">
        <div className="header-logo">
          <MdOutlineMailLock size={28} color='gray' />
          <span className="logo-text">Spam Detection</span>
          <button  onClick={handleClick} disabled={loading}> 
          {loading ? 'Predicting...' : 'Predict'}
        </button>
        </div>
       
        {error && <div className="error-message">{error}</div>} 

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
  );
}