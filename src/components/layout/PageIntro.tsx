import type { ReactNode } from 'react';
import Breadcrumb from './Breadcrumb';
import classes from '../../styles/components/PageIntro.module.css';

interface PageIntroProps {
    crumb: string;
    eyebrow: string;
    title: ReactNode;
    intro?: ReactNode;
    introPlacement?: 'side' | 'below';
}

const PageIntro = ({ crumb, eyebrow, title, intro, introPlacement = 'side' }: PageIntroProps) => (
    <div className="container">
        <Breadcrumb current={crumb} />
        <header className={introPlacement === 'side' ? `${classes.head} ${classes.side}` : classes.head}>
            <div>
                <p className="eyebrow">{eyebrow}</p>
                <h1 className={`display-1 ${classes.title}`}>{title}</h1>
            </div>
            {intro && <p className={`body-copy ${classes.intro}`}>{intro}</p>}
        </header>
    </div>
);

export default PageIntro;
