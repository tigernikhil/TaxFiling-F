import React from 'react';

export default function HelpPage() {
  const faqs = [
    { q: 'What is ITR?', a: 'Income Tax Return is a form...' },
    { q: 'Who should file ITR?', a: 'If your income exceeds...' },
    { q: 'What is the deadline?', a: '31st July for individuals...' }
  ];

  return (
    <div className="help-page">
      <h1>Help Center</h1>
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, idx) => (
          <div key={idx} className="faq-item">
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}
      </section>
      <section className="contact-section">
        <h2>Contact Support</h2>
        <p>Email: support@cleartax.in</p>
        <p>Phone: 1800-XXX-XXXX</p>
      </section>
    </div>
  );
}
