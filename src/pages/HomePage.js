import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                Following IDs are to test this application<br />

                <b>Admin ID:</b><br />
                demoadmin@gmail.com<br />
                <b>Admin's User IDs:</b> <br />
                demouser1@gmail.com<br />
                demouser2@gmail.com<br />
                <br />
                <b> All IDs password:</b> Demo@123
            </div>
            <hr />
            <Button
                onClick={() => navigate("/login")}
            >Go to Login</Button>
        </div>
    )
}

export default HomePage