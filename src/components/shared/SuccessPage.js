import { useParams } from 'react-router';

function SuccessPage(props) {
    const { id } = useParams();
    return (
        <div>
            <div>
                <h1>Created Successfully</h1>
                <div>Record Id: {id}</div>
            </div>
        </div>
    )
}

export default SuccessPage;