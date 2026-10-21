import { Link } from 'react-router-dom';
import classes from '../../styles/components/Breadcrumb.module.css';

interface BreadcrumbProps {
    current: string;
}

const Breadcrumb = ({ current }: BreadcrumbProps) => (
    <nav aria-label="Breadcrumb" className={classes.breadcrumb}>
        <ol>
            <li><Link to="/">Home</Link></li>
            <li aria-current="page">{current}</li>
        </ol>
    </nav>
);

export default Breadcrumb;
