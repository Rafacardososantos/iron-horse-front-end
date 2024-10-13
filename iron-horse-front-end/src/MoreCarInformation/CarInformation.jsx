import { useState } from 'react';

const PopupCadastroVeiculo = ({ isOpen, onClose }) => {
  const [cor, setCor] = useState('');
  const [transmissao, setTransmissao] = useState('');
  const [numeroPortas, setNumeroPortas] = useState('');
  const [numeroAssentos, setNumeroAssentos] = useState('');
  const [tipoDirecao, setTipoDirecao] = useState('');
  const [chassi, setChassi] = useState('');
  const [numeroMotor, setNumeroMotor] = useState('');
  const [cilindrada, setCilindrada] = useState('');
  const [quilometragem, setQuilometragem] = useState('');
  const [combustivel, setCombustivel] = useState('');
  const [renavam, setRenavam] = useState('');
  const [seguro, setSeguro] = useState(false);
  const [seguradora, setSeguradora] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui vai a lógica para enviar ou salvar os dados
    onClose(); // Fecha o popup após o envio dos dados
  };

  return (
    isOpen && (
      <div className="popup-overlay">
        <div className="popup-content">
          <h1>Cadastre seu Veículo</h1>
          <form onSubmit={handleSubmit}>
            {/* Cor */}
            <div className="form-group">
              <label htmlFor="cor">Cor</label>
              <input
                type="text"
                id="cor"
                value={cor}
                onChange={(e) => setCor(e.target.value)}
                required
              />
            </div>

            {/* Transmissão */}
            <div className="form-group">
              <label htmlFor="transmissao">Transmissão</label>
              <input
                type="text"
                id="transmissao"
                value={transmissao}
                onChange={(e) => setTransmissao(e.target.value)}
                required
              />
            </div>

            {/* Número de Portas */}
            <div className="form-group">
              <label htmlFor="numeroPortas">Número de Portas</label>
              <input
                type="number"
                id="numeroPortas"
                value={numeroPortas}
                onChange={(e) => setNumeroPortas(e.target.value)}
                required
              />
            </div>

            {/* Número de Assentos */}
            <div className="form-group">
              <label htmlFor="numeroAssentos">Número de Assentos</label>
              <input
                type="number"
                id="numeroAssentos"
                value={numeroAssentos}
                onChange={(e) => setNumeroAssentos(e.target.value)}
                required
              />
            </div>

            {/* Tipo de Direção */}
            <div className="form-group">
              <label htmlFor="tipoDirecao">Tipo de Direção</label>
              <input
                type="text"
                id="tipoDirecao"
                value={tipoDirecao}
                onChange={(e) => setTipoDirecao(e.target.value)}
                required
              />
            </div>

            {/* Chassi */}
            <div className="form-group">
              <label htmlFor="chassi">Chassi</label>
              <input
                type="text"
                id="chassi"
                value={chassi}
                onChange={(e) => setChassi(e.target.value)}
                required
              />
            </div>

            {/* Número do Motor */}
            <div className="form-group">
              <label htmlFor="numeroMotor">Número do Motor</label>
              <input
                type="text"
                id="numeroMotor"
                value={numeroMotor}
                onChange={(e) => setNumeroMotor(e.target.value)}
                required
              />
            </div>

            {/* Cilindrada */}
            <div className="form-group">
              <label htmlFor="cilindrada">Cilindrada</label>
              <input
                type="text"
                id="cilindrada"
                value={cilindrada}
                onChange={(e) => setCilindrada(e.target.value)}
                required
              />
            </div>

            {/* Quilometragem */}
            <div className="form-group">
              <label htmlFor="quilometragem">Quilometragem</label>
              <input
                type="number"
                id="quilometragem"
                value={quilometragem}
                onChange={(e) => setQuilometragem(e.target.value)}
                required
              />
            </div>

            {/* Combustível */}
            <div className="form-group">
              <label htmlFor="combustivel">Combustível</label>
              <input
                type="text"
                id="combustivel"
                value={combustivel}
                onChange={(e) => setCombustivel(e.target.value)}
                required
              />
            </div>

            {/* RENAVAM */}
            <div className="form-group">
              <label htmlFor="renavam">RENAVAM</label>
              <input
                type="text"
                id="renavam"
                value={renavam}
                onChange={(e) => setRenavam(e.target.value)}
                required
              />
            </div>

            {/* Seguro */}
            <div className="form-group">
              <label htmlFor="seguro">Seguro</label>
              <input
                type="checkbox"
                id="seguro"
                checked={seguro}
                onChange={() => setSeguro(!seguro)}
              />
            </div>

            {/* Seguradora */}
            <div className="form-group">
              <label htmlFor="seguradora">Informe a seguradora</label>
              <input
                type="text"
                id="seguradora"
                value={seguradora}
                onChange={(e) => setSeguradora(e.target.value)}
              />
            </div>

            {/* Botão para fechar */}
            <button type="submit">Prosseguir</button>
          </form>
          <button className="close-btn" onClick={onClose}>Fechar</button>
        </div>
      </div>
    )
  );
};

export default PopupCadastroVeiculo;
