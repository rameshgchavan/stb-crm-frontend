import { Button, ButtonGroup } from "react-bootstrap"

const CustomersPage = () => {
    return (
        <div>
            <ButtonGroup className="mb-3">
                <Button variant="success">INLINE</Button>
                <Button variant="warning">LEFTOUT</Button>
                <Button variant="secondary">OUTGONE</Button>
                <Button variant="primary">OTHER</Button>
            </ButtonGroup>
        </div>
    )
}

export default CustomersPage
