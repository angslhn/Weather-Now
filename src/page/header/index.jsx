import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      {window.location.pathname === "/check" && (
        <div className="button__back__to__home">
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            size="small"
            color="error"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
          </Button>
        </div>
      )}
      <h1 className="weathernow__title__text">Weather Now</h1>
    </header>
  );
};

export default Header;
