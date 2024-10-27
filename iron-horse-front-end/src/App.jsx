import { useState } from 'react';
import ForgotPassword from './ForgotPassword/ForgotPassword';

const App = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setShowForgotPassword(true)}>Esqueci a Senha</button>

      {showForgotPassword && (
        <ForgotPassword 
          onClose={() => setShowForgotPassword(false)} 
          openForgotPassword={() => setShowForgotPassword(false)}
          openSignUp={() => setShowForgotPassword(false)}
        />
      )}
    </div>
  );
};

export default App;
