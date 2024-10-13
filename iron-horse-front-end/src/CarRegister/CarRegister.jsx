import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Se estiver usando React Router para navegação

const CadastroVeiculo = () => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anoFabricacao, setAnoFabricacao] = useState('');
  const navigate = useNavigate(); // Para navegação para outra tela

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode realizar validações ou manipulações de dados
    // Encaminha para a próxima tela
    navigate('/detalhes-veiculo');
  };

  return (
    <div className="cadastro-veiculo">
      <h1>Cadastre seu Veículo</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo Marca */}
        <div className="form-group">
          <label htmlFor="marca">Marca</label>
          <input
            type="text"
            id="marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
          />
        </div>

        {/* Campo Modelo */}
        <div className="form-group">
          <label htmlFor="modelo">Modelo</label>
          <input
            type="text"
            id="modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
          />
        </div>

        {/* Campo Ano de Fabricação */}
        <div className="form-group">
          <label htmlFor="anoFabricacao">Ano de Fabricação</label>
          <input
            type="number"
            id="anoFabricacao"
            value={anoFabricacao}
            onChange={(e) => setAnoFabricacao(e.target.value)}
            required
          />
        </div>

        {/* Botão Prosseguir */}
        <button type="submit">Prosseguir</button>
      </form>
    </div>
  );
};

export default CadastroVeiculo;
