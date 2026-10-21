import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import Breadcrumb from '../../components/layout/Breadcrumb';
import HelpPanel from '../../components/layout/HelpPanel';
import classes from '../../styles/components/FAQ.module.css';

const FAQ_ITEMS = [
    {
        question: "Do you ship internationally?",
        answer: "Currently we only ship within the domestic region. We are working on international shipping soon!"
    },
    {
        question: "Are your candles eco-friendly?",
        answer: "Yes! We use 100% natural soy wax and lead-free cotton wicks. Our fragrances are phthalate-free."
    },
    {
        question: "How long do the candles burn?",
        answer: "Our standard 8oz candles burn for approximately 40-50 hours with proper care."
    },
    {
        question: "Do you offer wholesale?",
        answer: "Yes, please contact us via the contact form for wholesale inquiries."
    }
];

const FAQ = () => {
    const idPrefix = useId();
    const [openItems, setOpenItems] = useState<Set<number>>(() => new Set([0]));
    const allOpen = openItems.size === FAQ_ITEMS.length;

    const toggle = (index: number) => {
        setOpenItems(prev => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
    };

    const toggleAll = () => {
        setOpenItems(allOpen ? new Set() : new Set(FAQ_ITEMS.map((_, i) => i)));
    };

    return (
        <div className={classes.page}>
            <div className="container">
                <Breadcrumb current="FAQ" />

                <div className={classes.grid}>
                    <div className={classes.aside}>
                        <p className="eyebrow">Frequently asked</p>
                        <h1 className={`display-1 ${classes.title}`}>
                            Questions, <em>answered</em>
                        </h1>
                        <p className="body-copy">
                            Everything you might want to know about our candles, shipping and orders.
                        </p>
                        <div className={classes.help}>
                            <HelpPanel
                                title="Still have a question?"
                                text="We’re happy to help — write to us and we’ll get back to you."
                                action={{ to: '/contact', label: 'Contact us' }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className={classes.listHead}>
                            <p className={classes.count}>{FAQ_ITEMS.length} questions</p>
                            <button type="button" className="text-link" onClick={toggleAll}>
                                {allOpen ? 'Collapse all' : 'Expand all'}
                            </button>
                        </div>

                        <div className={classes.list}>
                            {FAQ_ITEMS.map((item, index) => {
                                const isOpen = openItems.has(index);
                                const buttonId = `${idPrefix}-q${index}`;
                                const panelId = `${idPrefix}-a${index}`;

                                return (
                                    <div key={item.question} className={isOpen ? `${classes.item} ${classes.open}` : classes.item}>
                                        <h2 className={classes.question}>
                                            <button
                                                type="button"
                                                id={buttonId}
                                                className={classes.trigger}
                                                aria-expanded={isOpen}
                                                aria-controls={panelId}
                                                onClick={() => toggle(index)}
                                            >
                                                <span>{item.question}</span>
                                                <span className={classes.icon} aria-hidden="true">
                                                    <Plus size={16} strokeWidth={1.5} />
                                                </span>
                                            </button>
                                        </h2>
                                        <div id={panelId} role="region" aria-labelledby={buttonId} className={classes.panel}>
                                            <div className={classes.panelInner}>
                                                <p className={classes.answer}>{item.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
