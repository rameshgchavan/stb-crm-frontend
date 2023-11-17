import { useRef } from "react";
import { Button, ButtonGroup, Container, Form } from "react-bootstrap"

const UserCard = ({ userInfo }) => {
    const { user, userStatus, updateStatus } = userInfo;
    const userName = useRef(user.Name);

    return (
        <Container >
            <Form >
                <Form.Group className="d-sm-flex justify-content-between align-items-end border rounded shadow px-3 py-2 ">
                    <Form.Group className="d-sm-flex justify-content-between align-items-end col-lg-6 mb-sm-0 mb-2">
                        <Form.Floating className="me-2 col-md-10">
                            <Form.Control placeholder="User Name" type="text"
                                defaultValue={userName.current}
                                onChange={(e) => { userName.current = e.target.value }}
                            />
                            <Form.Label className="text-primary fw-bold">User Name</Form.Label>
                            {user.LastLogin &&
                                <Form.Text className="fw-bold">Last Login: {user.LastLogin}</Form.Text>
                            }
                        </Form.Floating>


                        {userStatus == "approved" &&
                            <Button variant="primary" className="mt-2"
                                onClick={() => { updateStatus(user._id, { Name: userName.current }) }}
                            >Rename</Button>}
                    </Form.Group>

                    <ButtonGroup >
                        {userStatus != "approved" && <Button variant="success"
                            onClick={() => { updateStatus(user._id, { Status: "approved" }) }}
                        >Approve</Button>}

                        {userStatus != "blocked" && <Button variant="danger"
                            onClick={() => { updateStatus(user._id, { Status: "blocked" }) }}
                        >Block</Button>}
                    </ButtonGroup>

                </Form.Group>
            </Form>
        </Container >
    )
}

export default UserCard