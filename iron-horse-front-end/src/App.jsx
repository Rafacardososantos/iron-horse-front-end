import { useState } from 'react';
import LoginPopup from './LoginPopup/LoginPopup';

const App = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setShowLoginPopup(true)}>Login</button>

      {showLoginPopup && (
        <LoginPopup 
          onClose={() => setShowLoginPopup(false)} 
          openForgotPassword={() => {
            setShowLoginPopup(false);
          }}
          openSignUp={() => {
            setShowLoginPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
