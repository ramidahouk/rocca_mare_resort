export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-section" data-nav-tone="dark" aria-label="Contact and reserve">
        <div className="contact-inner">

          {/* Left — form */}
          <div className="contact-form-col">
            <span className="type-label contact-eyebrow">Reserve / Contact</span>
            <h1 className="contact-headline">Plan your stay.</h1>
            <p className="contact-subline">
              Tell us when you are coming. We will take care of the rest.
            </p>

            <form className="contact-form" action="#" method="post" noValidate>
              <div className="contact-field-row">
                <label className="contact-field">
                  <span className="contact-field-label">First name</span>
                  <input
                    className="contact-input"
                    type="text"
                    name="first_name"
                    autoComplete="given-name"
                    required
                  />
                </label>
                <label className="contact-field">
                  <span className="contact-field-label">Last name</span>
                  <input
                    className="contact-input"
                    type="text"
                    name="last_name"
                    autoComplete="family-name"
                    required
                  />
                </label>
              </div>

              <label className="contact-field">
                <span className="contact-field-label">Email</span>
                <input
                  className="contact-input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                />
              </label>

              <div className="contact-field-row">
                <label className="contact-field">
                  <span className="contact-field-label">Arrival</span>
                  <input
                    className="contact-input"
                    type="date"
                    name="arrival"
                  />
                </label>
                <label className="contact-field">
                  <span className="contact-field-label">Departure</span>
                  <input
                    className="contact-input"
                    type="date"
                    name="departure"
                  />
                </label>
              </div>

              <label className="contact-field">
                <span className="contact-field-label">Room preference</span>
                <select className="contact-input contact-select" name="room">
                  <option value="">No preference</option>
                  <option value="room">The Room</option>
                  <option value="sea-room">The Sea Room</option>
                  <option value="suite">The Suite</option>
                </select>
              </label>

              <label className="contact-field">
                <span className="contact-field-label">Message</span>
                <textarea
                  className="contact-input contact-textarea"
                  name="message"
                  rows={4}
                />
              </label>

              <button type="submit" className="contact-submit btn-primary">
                Send enquiry
              </button>
            </form>
          </div>

          {/* Right — info */}
          <aside className="contact-info-col" aria-label="Location and contact details">
            <div className="contact-info-block">
              <span className="type-label contact-info-label">Location</span>
              <p className="contact-info-text">
                Rocca Mare Resort<br />
                Via della Scogliera 12<br />
                Mediterranean Coast
              </p>
            </div>

            <div className="contact-info-block">
              <span className="type-label contact-info-label">Reservations</span>
              <a href="mailto:reserve@roccamare.com" className="contact-info-link">
                reserve@roccamare.com
              </a>
              <a href="tel:+390000000000" className="contact-info-link">
                +39 000 000 0000
              </a>
            </div>

            <div className="contact-info-block">
              <span className="type-label contact-info-label">Hours</span>
              <p className="contact-info-text">
                Reservations open daily<br />
                09:00 — 20:00
              </p>
            </div>
          </aside>

        </div>
      </section>

      {/* Full-bleed map */}
      <div className="contact-map" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/map.jpg"
          alt=""
          className="contact-map-image"
          loading="lazy"
          decoding="async"
        />
      </div>
    </main>
  );
}
