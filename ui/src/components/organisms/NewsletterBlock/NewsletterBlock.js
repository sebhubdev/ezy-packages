import React from "react";
import arrow from "@ezycore/ui/src/assets/img/arrow.png";
import brushStrokes from "@ezycore/ui/src/assets/img/brush-strokes.png";
import AlertMsg from "@ezycore/ui/src/components/atoms/AlertMsg/AlertMsg";
import newsletterDataService from "services/newsletter";

const NewsletterBlock = () => {
  const newsletterFormRef = React.useRef(null);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [alertAppareance, setAlertAppareance] = React.useState(null);
  const [sending, setSending] = React.useState(false);

  const sendNewsletter = (e) => {
    e.preventDefault();

    const form = newsletterFormRef.current;
    const data = new FormData(form);
    setSending(true);
    newsletterDataService
      .sendNewsletter(data)
      .then((res) => {
        setAlertMessage("Votre message a été envoyé avec succès. :)");
        setAlertAppareance("success");
        form.reset();
        setSending(false);
      })
      .catch((err) => {
        setAlertMessage("Une erreur s'est produite lors de l'envoi. :(");
        setAlertAppareance("danger");
        setSending(false);
      });
  };
  return (
    <div id="newsletter" className="newsletter-block">
      <div className="newsletter-block__inner">
        <div className="newsletter-block__content">
          <div className="newsletter-block__content__inner">
            <span className="newsletter-block__content__title">Newsletter</span>
            <div className="newsletter-block__content__text">
              <p>
                Envie de recevoir
                <br />
                <span className="dark">mes actualités</span> et
                <br />
                <span className="dark">mes supers bons plans ?</span>
                <br />
                (promos, concours,...)
              </p>
              <span className="newsletter-block__content__text__background">
                <img src={brushStrokes} alt="" />
              </span>
            </div>
            <p className="newsletter-block__content__cite">
              C'est ici que ca se passe !
            </p>
          </div>
          <div className="newsletter-block__content__arrow">
            <img src={arrow} alt="" />
          </div>
        </div>
        <div className="newsletter-block__form__container">
          <form className="newsletter-block__form" ref={newsletterFormRef}>
            {alertMessage && (
              <AlertMsg message={alertMessage} appareance={alertAppareance} />
            )}
            <div className="newsletter-block__form__elem">
              <label
                htmlFor="lastname"
                className="newsletter-block__form__elem__label"
              >
                Nom
              </label>
              <input
                id="lastname"
                type="text"
                className="newsletter-block__form__elem__field"
                name="lastname"
              />
            </div>
            <div className="newsletter-block__form__elem">
              <label
                htmlFor="name"
                className="newsletter-block__form__elem__label"
              >
                Prénom
              </label>
              <input
                id="name"
                type="text"
                className="newsletter-block__form__elem__field"
                name="name"
              />
            </div>
            <div className="newsletter-block__form__elem">
              <label
                htmlFor="email"
                className="newsletter-block__form__elem__label"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                className="newsletter-block__form__elem__field"
                name="email"
              />
            </div>

            <div className="newsletter-block__form__elem">
              <label
                htmlFor=""
                className="newsletter-block__form__elem__label"
              ></label>
              <div className="newsletter-block__form__elem__button">
                <button className="btn" onClick={sendNewsletter}>
                  Let's go
                </button>
                {sending && <div>Envoi en cours...</div>}
              </div>
              <div />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterBlock;
