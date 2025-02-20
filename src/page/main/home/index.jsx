import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Main = () => {
    const navigate = useNavigate()
 
    return (
        <main>
            <div className="weathernow__home__wrapper">
                <div className="weathernow__home__information__to__check">
                    <p className="weathernow__home__information__to__check__description">Weather Now requires location permission from the user to check the weather based on the current location.</p>
                </div>
                <div className="button__home__weathernow__to__check">
                    <Button onClick={() => navigate('/check')} variant="contained" size="small" color="primary">
                        <span className="button__to__check__text">
                            Check Weather Now
                        </span>
                    </Button>
                </div>
            </div>
        </main>
    )
}

export default Main