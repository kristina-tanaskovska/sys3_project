import TabItem from './TabItem';
import { Outlet } from 'react-router';

function TabContainer({ children }) {
    return (
        <div className='tab-navigator'>
            <div className='tab-container'>
                {
                    getTabs().map(tab => <TabItem
                        title={tab.title}
                        url={tab.url}
                        key={tab.title} />)
                }
            </div>
            {children}
        </div>
    )
}

const getTabs = () => {
    return [
        {
            title: 'Home',
            url: '/',
        },
        {
            title: 'Create News',
            url: '/news-create',
        },
        {
            title: 'Login',
            url: '/login'
        },
        {
            title: 'Counter',
            url: '/counter'
        },
    ]
}

export default TabContainer;