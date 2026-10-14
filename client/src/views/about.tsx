
import { useState } from "react";
import { Link } from "react-router";
import "./about.css";

const faqs = [
  {
    question: "How does the Baby Name Generator work?",
    answer:
      "Our Baby Name Generator suggests names based on the preferences you choose. You can explore different options and discover names that fit what you're looking for.",
  },
  {
    question: "Can I save names that I like?",
    answer:
      "Yes! You can save your favorite baby names and revisit them anytime on your Favorites page.",
  },
  {
    question: "Where does the name information come from?",
    answer:
      "We provide name meanings and origins to help you explore the history and significance behind different names.",
  },
  {
    question: "What if I'm not sure what kind of name I want?",
    answer:
      "That's okay! You can browse and discover different names until you find one that feels right for you.",
  },
];

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <main className="about-page">
      <div className="about-container">
        {/* Breadcrumb */}
        <nav className="about-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="about-breadcrumb-separator">/</span>
          <Link
            to="/about"
            className="about-breadcrumb-current"
            aria-current="page"
          >
            About
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content">
            <h1>
              Every name has a story.
              <br />
              Let's find the one that
              <br />
              starts yours.
            </h1>

            <p>
              Choosing a baby name is a small decision with a lifetime
              of meaning. Our Baby Name Generator makes it easier to
              explore names, discover their meanings and origins, and
              find one that feels special to you. From familiar favorites
              to names you may have never considered, we're here to
              help you enjoy the search.
            </p>

            <Link to="/contact" className="about-contact-button">
              Contact Us
            </Link>
          </div>

          <div className="about-hero-image">
            <img
              src="/about-hero.jpg"
              alt="Baby wrapped in a white blanket"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="about-faq">
          <h2>FAQs</h2>

          <div className="about-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div className="about-faq-item" key={faq.question}>
                  <button
                    type="button"
                    className="about-faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span
                      className="about-faq-icon"
                      aria-hidden="true"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                    <span>{faq.question}</span>
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    hidden={!isOpen}
                  >
                    <p className="about-faq-answer">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
