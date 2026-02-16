'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import styles from './Contact.module.css';

const InputField = ({ label, type = "text", id, ...props }) => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("");

    return (
        <div className={styles.inputGroup}>
            <input
                className={styles.input}
                type={type}
                id={id}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                {...props}
            />
            <label
                htmlFor={id}
                className={`${styles.label} ${(focused || value) ? styles.active : ''}`}
            >
                {label}
            </label>
            <div className={`${styles.underline} ${focused ? styles.underlineActive : ''}`} />
        </div>
    );
};

export default function Contact() {
    return (
        <section id="contact" className={styles.section}>
            <div className="container">
                <div className={styles.flexWrapper}>
                    <div className={styles.info}>
                        <h2 className={`gradient-text ${styles.heading}`}>Let's Connect</h2>
                        <p className={styles.subtext}>
                            Based in Hyderabad.<br />
                            Always interested in new AI/ML challenges.
                        </p>

                        <div className={styles.contactDetails}>
                            <a href="mailto:reddyroshan976@gmail.com" className={styles.link}>reddyroshan976@gmail.com</a>
                            <a href="tel:9949458597" className={styles.link}>+91 9949458597</a>
                        </div>
                    </div>

                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <InputField label="Full Name" id="name" />
                        <InputField label="Email Address" id="email" type="email" />
                        <div className={styles.inputGroup}>
                            <textarea
                                className={styles.textarea}
                                id="message"
                                rows={4}
                            ></textarea>
                            <label htmlFor="message" className={styles.label}>Message</label>
                            <div className={styles.underline} />
                        </div>

                        <Button type="submit" variant="primary" className={styles.submitBtn}>
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
