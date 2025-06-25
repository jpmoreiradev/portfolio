import React, { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

       emailjs.sendForm(
      'service_keu4u8j', // substitua pelo seu Service ID
      'template_67waoir', // substitua pelo seu Template ID
      form.current,
      'mRTpGKM0niZlV0vPo' // substitua pela sua Public Key
    )
    .then(() => {
      setLoading(false);
      setMessageSent(true);
      e.target.reset();
    })
    .catch((err) => {
      setLoading(false);
      setError('Erro ao enviar mensagem. Por favor, tente novamente.');
      console.error(err);
    });
  };

  return (
    <section id="contato" className="py-20 section-padding bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Entre em Contato
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Estou sempre interessado em novas oportunidades e projetos interessantes. 
              Se você tem uma pergunta ou apenas quer dizer oi, ficarei feliz em responder!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Vamos conversar
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-foreground font-medium">Email</p>
                      <p className="text-muted-foreground">jp02120123@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-foreground font-medium">Telefone</p>
                      <p className="text-muted-foreground">+55 (88) 9 9730-7495</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-foreground font-medium">Localização</p>
                      <p className="text-muted-foreground">Banabuiú, Brasil</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in">
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="user_name" className="block text-sm font-medium text-foreground mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="from_name"
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="user_email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="reply_to"
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Assunto da mensagem"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Sua mensagem..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2 group"
                >
                  <span>{loading ? 'Enviando...' : 'Enviar Mensagem'}</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                {messageSent && (
                  <p className="text-green-500 mt-4">Mensagem enviada com sucesso!</p>
                )}
                {error && (
                  <p className="text-red-500 mt-4">{error}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


