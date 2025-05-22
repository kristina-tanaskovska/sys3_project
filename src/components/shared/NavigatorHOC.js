import { useNavigate } from 'react-router';

function NavigatorHOC(Component){
    return function WrappedComponent(props) {
        const navigate = useNavigate();
        return(
            <Component navigate={navigate} {...props} />
        )
    }
}

export default NavigatorHOC;