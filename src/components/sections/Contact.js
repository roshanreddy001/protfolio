'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Button from '@/components/ui/Button';
import styles from './Contact.module.css';

const InputField = ({ label, type = "text", id, value, onChange, ...props }) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className={styles.inputGroup}>
            <input
                className={styles.input}
                type={type}
                id={id}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={onChange}
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
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    // Form State for controlled inputs
    const [formData, setFormData] = useState({
        from_name: '',
        from_email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                form.current,
                {
                    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
                }
            )
            .then(
                () => {
                    setLoading(false);
                    setStatus('success');
                    // Clear the form data specifically
                    setFormData({
                        from_name: '',
                        from_email: '',
                        subject: '',
                        message: ''
                    });
                    setTimeout(() => setStatus(null), 5000);
                },
                (error) => {
                    setLoading(false);
                    setStatus('error');
                    console.error('FAILED...', error.text);
                },
            );
    };

    return (
        <section id="contact" className={styles.section}>
            <div className="container">
                <div className={styles.flexWrapper}>
                    <div className={styles.info}>
                        <h2 className={`gradient-text ${styles.heading}`}>Let's Connect</h2>
                        <p className={styles.subtext}>
                            Based in Hyderabad.<br />
                            Always interested to bulid new relationships.
                        </p>

                        <div className={styles.contactDetails}>
                            <a href="mailto:reddyroshan976@gmail.com" className={styles.link}>reddyroshan976@gmail.com</a>
                            <a href="tel:9949458597" className={styles.link}>+91 9949458597</a>
                        </div>
                    </div>

                    <form ref={form} className={styles.form} onSubmit={sendEmail}>
                        <div className={styles.row}>
                            <InputField
                                label="Full Name"
                                name="from_name"
                                id="name"
                                value={formData.from_name}
                                onChange={handleChange}
                                required
                            />
                            <InputField
                                label="Email Address"
                                name="from_email"
                                id="email"
                                type="email"
                                value={formData.from_email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <InputField
                            label="Subject"
                            name="subject"
                            id="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />

                        <input type="hidden" name="message_time" value={new Date().toLocaleString()} />

                        <div className={styles.inputGroup}>
                            <textarea
                                className={styles.textarea}
                                name="message"
                                id="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <label
                                htmlFor="message"
                                className={`${styles.label} ${(formData.message) ? styles.active : ''}`}
                            >
                                Message
                            </label>
                            <div className={styles.underline} />
                        </div>

                        <Button type="submit" variant="primary" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </Button>

                        {status === 'success' && (
                            <p className={styles.successMessage}>Message sent successfully!</p>
                        )}
                        {status === 'error' && (
                            <p className={styles.errorMessage}>Failed to send. Please try again.</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
