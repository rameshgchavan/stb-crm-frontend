import { Formik } from "formik";
import * as Yup from "yup";
import Login from "../components/login/Login";

const Users = () => {
    return (
        <Formik
            initialValues={{
                emailID: "",
                password: ""
            }}

            validationSchema={Yup.object({
                emailID: Yup.string().email().required(),
                password: Yup.string().required()
            })}

            onSubmit={values => {
                alert(values);
            }}
        >
            <Login credentials={{
                emailID: "emailID",
                password: "password"
            }} />

        </Formik>
    )
}

export default Users