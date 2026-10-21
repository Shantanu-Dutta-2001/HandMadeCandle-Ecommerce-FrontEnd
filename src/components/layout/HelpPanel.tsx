import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import classes from '../../styles/components/HelpPanel.module.css';

interface HelpLink {
    to: string;
    label: string;
}

interface HelpPanelProps {
    title: string;
    text: ReactNode;
    action: HelpLink;
    secondary?: HelpLink;
}

const HelpPanel = ({ title, text, action, secondary }: HelpPanelProps) => (
    <aside className={classes.panel}>
        <div className={classes.inner}>
            <div className={classes.copy}>
                <h2 className={classes.title}>{title}</h2>
                <p className={classes.text}>{text}</p>
            </div>
            <div className={classes.actions}>
                {secondary && <Link to={secondary.to} className="text-link">{secondary.label}</Link>}
                <Link to={action.to} className="pill-btn pill-btn-primary">
                    {action.label} <ArrowRight size={15} aria-hidden="true" />
                </Link>
            </div>
        </div>
    </aside>
);

export default HelpPanel;
