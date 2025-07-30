import { Link } from 'react-router-dom';

function TabItem({ title, url }) {
  return (
    <div className="tab-item">
      <Link to={url}>{title}</Link>
    </div>
  );
}

export default TabItem;
