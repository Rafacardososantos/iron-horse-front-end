import { useState } from 'react'
import './ForgotPassword.css'

const ForgotPassword = ({ onClose, openForgotPassword, openSignUp }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Esqueceu a senha?</h2>
        <span>Informe o e-mail do qual deseja redefinir sua senha.</span>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="forgot-btn">Enviar</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
