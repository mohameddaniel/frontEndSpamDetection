import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-logo">
          <span className="logo-icon">📧</span>
          <span className="logo-text">Spam Detection</span>
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <Link 
                to="/all" 
                className={isActive('/all') ? 'active' : ''}
              >
                <span className="nav-icon">📥</span>
                Your Inbox 
              </Link>
            </li>
            <li>
              <Link 
                to="/spam" 
                className={isActive('/spam') ? 'active' : ''}
              >
                <span className="nav-icon">⚠️</span>
                Spam Emails 
              </Link>
            </li>
            <li>
              <Link 
                to="/no-spam" 
                className={isActive('/no-spam') ? 'active' : ''}
              >
                <span className="nav-icon">✅</span>
                Clean Emails 
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
