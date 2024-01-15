import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const [viewFAQs, setViewFAQs] = useState(false);


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

            {
                !viewFAQs &&
                <Button variant="success" size="sm"
                    onClick={() => setViewFAQs(true)}
                > FAQs</Button>
            }
            {
                viewFAQs &&
                <div className="border shadow text-start mx-sm-5 ps-sm-5 pt-3">
                    <div className="d-flex justify-content-between">
                        <b>FAQs</b><br />

                        <Button variant="danger" size="sm me-3"
                            onClick={() => setViewFAQs(false)}
                        >X</Button>
                    </div>

                    <ul className="mt-2">
                        <li className="mb-3">
                            How to install application in mobile? <br />
                            मोबाईल मध्ये अॅप्लीकेशन कसे इंस्टॉल करायचे? <br />
                            <Link target="_blank" rel="noreferrer"
                                to="https://drive.google.com/file/d/1i4ekspY7yZu2LkIqLUeLKJu0XepLim_N/view?usp=sharing"
                            >
                                <Button variant="success" size="sm">Watch video</Button>
                            </Link>
                        </li>
                        <li className="mb-3">
                            How to do Admin/LCO registration? <br />
                            अडमिन/LCO साठी रेजिस्ट्रेशन कसे करायचे? <br />
                            <Link target="_blank"
                                to="https://drive.google.com/file/d/1ANr7uSR9WJpAqQIMdDyIQrY7o-WdVAHF/view?usp=sharing"
                            >
                                <Button variant="success" size="sm">Watch video</Button>
                            </Link>
                        </li>
                        <li className="mb-3">
                            How to do User/Aea Manager registration? <br />
                            यूजर/एरिया मॅनेजर साठी रेजिस्ट्रेशन कसे करायचे? <br />
                            <Link target="_blank"
                                to="https://drive.google.com/file/d/1yrPvF9U-o-tbldQDoS9e89As_R7-LQF1/view?usp=sharing"
                            >
                                <Button variant="success" size="sm">Watch video</Button>
                            </Link>
                        </li>
                        <li className="mb-3">
                            How to bulk add Customers in application? <br />
                            अॅप्लीकेशन मध्ये बल्क कस्टमर कसे अपलोड करायचे? <br />
                            <Link target="_blank"
                                to="https://drive.google.com/file/d/1OmSTMnHvIo4GpGy9xlStBbcez05dMyzU/view?usp=sharing"
                            >
                                <Button variant="success" size="sm">Watch video</Button>
                            </Link>
                        </li>
                        <li className="mb-3">
                            How to bulk add Plans in application? <br />
                            अॅप्लीकेशन मध्ये बल्क प्लान कसे अपलोड करायचे? <br />
                            <Link target="_blank"
                                to="https://drive.google.com/file/d/1r_TA9Imq9B0EJ8oaVnr_sADIECpxo8-3/view?usp=sharing"
                            >
                                <Button variant="success" size="sm">Watch video</Button>
                            </Link>
                        </li>
                        <li className="mb-3">
                            How to bulk add Transactions in application? <br />
                            अॅप्लीकेशन मध्ये बल्क ट्रान्सझॅक्षन कसे अपलोड करायचे? <br />
                            <Link target="_blank"
                                to="https://drive.google.com/file/d/1ZHFzDCvcDwfk1eglrD0SJZOWp41r3FfZ/view?usp=sharing"
                            >
                                <Button variant="success" size="sm">Watch video</Button>
                            </Link>
                        </li>
                        <li className="mb-3">
                            How to search customer and see his details? <br />
                            कस्टमर कसा शोधायचा आणि त्याची डिटेल्स कशी पाहायची? <br />
                            <Link target="_blank"
                                to="https://drive.google.com/file/d/1i6Dm0yg-Z5GZsv-iDxFAOw1D0XcjKxVf/view?usp=sharing"
                            >
                                <Button variant="success" size="sm">Watch video</Button>
                            </Link>
                        </li>
                        <li className="mb-3">
                            How to find expiry boxes by date? <br />
                            How to find which one package box have? <br />
                            How to send details of customer as well box? <br />
                            How to copy paste box ID? <br />
                            एक्सपायरीचे बॉक्स तारखे नुसार कसे पाहायचे? <br />
                            बॉक्सचे पॅकेज कोणते आहे कसे पाहायचे? <br />
                            कस्टमर व बॉक्स ची माहिती व्हॉटस्अप वर कशी पाठवायची? <br />
                            बॉक्सची ID कशी कॉपी पेस्ट करायची? <br />
                            <Link target="_blank"
                                to="https://drive.google.com/file/d/1iCALtNGd2SyZlV1pXDHJR2S_LgZDwUlm/view?usp=sharing"
                            >
                                <Button variant="success" size="sm">Watch video</Button>
                            </Link>
                        </li>
                        <li className="mb-3">
                            How to print recharged/expiry boxes details? <br />
                            How to save PDF recharged/expiry boxes details? <br />
                            रिचार्ज झालेले/एक्सपायरीचे बॉक्सची प्रिंट कशी करायची? <br />
                            रिचार्ज झालेले/एक्सपायरीचे बॉक्सची PDF कशी सेव्ह करायची? <br />
                            <Link target="_blank"
                                to="https://drive.google.com/file/d/1iCGLsYHy4aS9MKBdSfBZTGVWz80RxMfJ/view?usp=sharing"
                            >
                                <Button variant="success" size="sm">Watch video</Button>
                            </Link>
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default HomePage