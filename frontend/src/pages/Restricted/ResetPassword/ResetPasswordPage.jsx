import { BsCheck } from 'react-icons/bs';

const ResetPasswordPage = () => {
  return (
    <div className="resetPasswordPageContainer">
      <div className="resetPasswordFormContainer">
        <h2>Resetar senha</h2>

        <input type="password" placeholder="Digite sua nova senha" />
        <input type="password" placeholder="Confirme sua nova senha" />
        <button>
          Resetar <BsCheck className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
