import type { ReactNode } from 'react';
import PageIntro from '../layout/PageIntro';
import HelpPanel from '../layout/HelpPanel';
import classes from '../../styles/components/Policy.module.css';

export interface PolicySection {
    id: string;
    title: string;
    navLabel: string;
    content: ReactNode;
}

interface PolicyPageProps {
    crumb: string;
    title: ReactNode;
    intro: string;
    glance: ReactNode;
    sections: PolicySection[];
    help: { title: string; text: ReactNode };
}

const PolicyPage = ({ crumb, title, intro, glance, sections, help }: PolicyPageProps) => (
    <div className={classes.page}>
        <PageIntro crumb={crumb} eyebrow="Customer care" title={title} intro={intro} />

        <div className="container">
            <div className={classes.glance}>{glance}</div>

            <div className={classes.layout}>
                <nav aria-label="On this page" className={classes.toc}>
                    <p className={classes.tocLabel} aria-hidden="true">On this page</p>
                    <ul>
                        {sections.map(section => (
                            <li key={section.id}><a href={`#${section.id}`}>{section.navLabel}</a></li>
                        ))}
                    </ul>
                </nav>

                <div>
                    {sections.map((section, index) => (
                        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className={classes.section}>
                            <p className={classes.sectionNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</p>
                            <h2 id={`${section.id}-title`} className={classes.sectionTitle}>{section.title}</h2>
                            {section.content}
                        </section>
                    ))}

                    <div className={classes.help}>
                        <HelpPanel
                            title={help.title}
                            text={help.text}
                            secondary={{ to: '/faq', label: 'Read the FAQ' }}
                            action={{ to: '/contact', label: 'Contact us' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default PolicyPage;
