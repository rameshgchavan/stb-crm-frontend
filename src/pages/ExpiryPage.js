import { Button, ButtonGroup } from "react-bootstrap"

const ExpiryPage = () => {
    return (
        <div>
            <ButtonGroup className="mb-3">
                <Button variant="warning">Expiry</Button>
                <Button variant="danger">Expired</Button>
            </ButtonGroup>
        </div>
    )
}

export default ExpiryPage