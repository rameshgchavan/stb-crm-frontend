import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>404: Page Not Found</h1>

            <Button className="mt-5"
                onClick={() => navigate("/")}
            >
                Click here to Login
            </Button>
        </div>
    )
}

export default PageNotFound