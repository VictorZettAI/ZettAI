import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, Linkedin, Twitter, Github } from 'lucide-react'

interface ContactProps {
  isDarkMode: boolean
}

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: 'info@aisolutions.com',
    link: 'mailto:info@aisolutions.com'
  },
  {
    icon: Phone,
    title: 'Teléfono',
    content: '+34 900 123 456',
    link: 'tel:+34900123456'
  },
  {
    icon: MapPin,
    title: 'Ubicación',
    content: 'Madrid, España',
    link: 'https://maps.google.com'
  }
]

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://linkedin.com',
    label: 'LinkedIn'
  },
  {
    icon: Twitter,
    href: 'https://twitter.com',
    label: 'Twitter'
  },
  {
    icon: Github,
    href: 'https://github.com',
    label: 'GitHub'
  }
]

export default function Contact({ isDarkMode }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de envío del formulario
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contacto" className={`py-24 relative overflow-hidden ${
      isDarkMode ? 'bg-[#0B1120]' : 'bg-gray-50'
    }`}>
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: isDarkMode 
              ? 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.08) 0%, rgba(11, 17, 32, 0) 50%)'
              : 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.12) 0%, rgba(255, 255, 255, 0) 50%)'
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Contáctanos
          </h2>
          <p className={`text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Estamos aquí para ayudarte a transformar tu negocio con IA
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`p-8 rounded-2xl ${
              isDarkMode 
                ? 'bg-gray-800/50 border border-gray-700/50' 
                : 'bg-white border border-gray-200/50'
            } backdrop-blur-sm shadow-lg`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isDarkMode
                          ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-yellow-500'
                      } border focus:ring-2 focus:ring-yellow-500/20 outline-none`}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isDarkMode
                          ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-yellow-500'
                      } border focus:ring-2 focus:ring-yellow-500/20 outline-none`}
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Asunto
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isDarkMode
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-yellow-500'
                    } border focus:ring-2 focus:ring-yellow-500/20 outline-none`}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isDarkMode
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-yellow-500'
                    } border focus:ring-2 focus:ring-yellow-500/20 outline-none resize-none`}
                    placeholder="Cuéntanos más sobre tu proyecto..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                    isDarkMode
                      ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
                      : 'bg-yellow-500 text-white hover:bg-yellow-600'
                  } transition-colors duration-200`}
                >
                  <span>Enviar Mensaje</span>
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-xl ${
                    isDarkMode 
                      ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50' 
                      : 'bg-white hover:bg-gray-50 border border-gray-200/50'
                  } backdrop-blur-sm shadow-lg transition-all duration-200`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                    }`}>
                      <info.icon className={`w-6 h-6 ${
                        isDarkMode ? 'text-yellow-500' : 'text-yellow-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {info.title}
                      </h3>
                      <p className={`${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {info.content}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className={`p-8 rounded-xl ${
              isDarkMode 
                ? 'bg-gray-800/50 border border-gray-700/50' 
                : 'bg-white border border-gray-200/50'
            } backdrop-blur-sm shadow-lg`}
            >
              <h3 className={`text-xl font-semibold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Síguenos
              </h3>
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className={`p-3 rounded-lg ${
                      isDarkMode 
                        ? 'bg-gray-700/50 hover:bg-gray-700' 
                        : 'bg-gray-100/50 hover:bg-gray-200'
                    } transition-colors duration-200`}
                    aria-label={social.label}
                  >
                    <social.icon className={`w-6 h-6 ${
                      isDarkMode ? 'text-yellow-500' : 'text-yellow-600'
                    }`} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-40 h-40 opacity-20"
          style={{
            background: isDarkMode 
              ? 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.2), transparent)'
              : 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.3), transparent)'
          }}
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-10 w-32 h-32 opacity-20"
          style={{
            background: isDarkMode 
              ? 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.2), transparent)'
              : 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.3), transparent)'
          }}
        />
      </div>
    </section>
  )
}
