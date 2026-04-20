import { useState } from "react";
import Layout from "@/components/Layout";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageSeo } from "@/hooks/usePageSeo";

const Contact = () => {
  usePageSeo(
    "Contact — Commandez & Contactez STEFCOS | Lomé, Togo",
    "Contactez STEFCOS TOGO SARL pour vos commandes, questions ou conseils personnalisés. Nous sommes basés à Lomé et livrons partout au Togo."
  );
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const revealRef = useScrollReveal();

  // Remplacer FORMSPREE_ID par l'ID obtenu sur formspree.io
  const FORMSPREE_ID = "FORMSPREE_ID";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _cc: "Hermannzoumi1@gmail.com",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Layout>
      <section className="container mx-auto px-6 lg:px-12 py-16 md:py-24" ref={revealRef}>
        <div className="text-center mb-14" data-reveal>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Parlons Ensemble
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light">Contactez-Nous</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-10" data-reveal="left">
            <div>
              <h2 className="font-serif text-2xl font-light mb-6">Restons en Contact</h2>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Notre équipe est à votre disposition pour répondre à toutes vos questions sur nos produits et services.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group cursor-default">
                <MapPin size={20} className="text-accent mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h4 className="font-sans text-sm font-semibold mb-1">Adresse</h4>
                  <p className="font-sans text-sm text-muted-foreground">
                    Zone industrielle, Carrefour Ramatou
                    <br />
                    Zone Portuaire - 07 BP 7300
                    <br />
                    Lomé - Togo
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-default">
                <Phone size={20} className="text-accent mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h4 className="font-sans text-sm font-semibold mb-1">Téléphone</h4>
                  <div className="font-sans text-sm text-muted-foreground space-y-1">
                    <p>(+228) 79 79 23 25</p>
                    <p>(+228) 90 54 22 75</p>
                    <p>(+228) 70 43 09 92</p>
                    <p>(+228) 93 68 49 43</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-default">
                <Mail size={20} className="text-accent mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h4 className="font-sans text-sm font-semibold mb-1">Email</h4>
                  <p className="font-sans text-sm text-muted-foreground">contact@stefcos.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" data-reveal="right">
            <div>
              <label className="font-sans text-xs font-semibold tracking-widest uppercase text-muted-foreground block mb-2">
                Nom complet
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-accent transition-colors duration-300"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="font-sans text-xs font-semibold tracking-widest uppercase text-muted-foreground block mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-accent transition-colors duration-300"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="font-sans text-xs font-semibold tracking-widest uppercase text-muted-foreground block mb-2">
                Sujet
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-accent transition-colors duration-300"
                placeholder="Sujet de votre message"
              />
            </div>
            <div>
              <label className="font-sans text-xs font-semibold tracking-widest uppercase text-muted-foreground block mb-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                placeholder="Votre message..."
              />
            </div>
            {status === "success" && (
              <p className="font-sans text-sm text-green-600 bg-green-50 border border-green-200 rounded-sm px-4 py-3">
                Message envoyé ! Nous vous répondrons dans les plus brefs délais.
              </p>
            )}
            {status === "error" && (
              <p className="font-sans text-sm text-red-600 bg-red-50 border border-red-200 rounded-sm px-4 py-3">
                Une erreur est survenue. Veuillez réessayer ou nous contacter sur WhatsApp.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-primary/90 hover:gap-5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Envoi en cours..." : "Envoyer"}
              <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
