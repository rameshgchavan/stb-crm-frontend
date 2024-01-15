import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FAQs from "../components/FAQs";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Button variant="danger" size="sm"
                onClick={() => navigate("/login")}
            >Go to Login</Button>
            <hr />
            <div>
                You can use following IDs to test this application. <br />
                खालील IDs चा वापर करुन या अॅप्लीकेशन ला टेस्ट करु शकता. <br />

                <div className="border shadow p-2 my-2 mx-sm-5">
                    <u> Admin | LCO ID</u><br />
                    <b>demoadmin@gmail.com</b>
                    <br /><br />

                    <u>User | Area manager IDs</u><br />
                    <b>
                        demouser1@gmail.com<br />
                        demouser2@gmail.com
                    </b>
                    <br /><br />

                    Password<br />
                    <b>Demo@123</b>
                    <hr />
                    To help or feedback please contact me.<br />
                    <b>Mob: 7020554505</b>
                </div>
            </div>
            <hr />

            <FAQs />
        </div>
    )
}

export default HomePage