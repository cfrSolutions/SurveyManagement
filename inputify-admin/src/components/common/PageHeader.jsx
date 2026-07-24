import { useNavigate } from "react-router-dom";

function PageHeader({
  title,
  buttonText,
  buttonLink
}) {

  const navigate = useNavigate();

  return (
    <div className="module-header">

      <h1 className="module-title">
        {title}
      </h1>

      {buttonText && (
        <button
          className="primary-btn"
          onClick={() => navigate(buttonLink)}
        >
          {buttonText}
        </button>
      )}

    </div>
  );
}

export default PageHeader;