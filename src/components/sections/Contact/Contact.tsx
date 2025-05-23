import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, Linkedin, Twitter, Github } from 'lucide-react'
import { SEO } from '@/components/SEO/SEO'
import { InputSanitizer } from '@/services/security/sanitization'
import { rateLimiter } from '@/services/security/rateLimit'
import { toast } from 'react-toastify'
import { trackFormSubmission } from '@/services/analytics'
import { apiConfig } from '@/config'
import { CONFIG } from '@/constants/config'

interface ContactProps {
}

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: CONFIG.contact.email,
    link: `mailto:${CONFIG.contact.email}`
  },
  {
    icon: Phone,
    title: 'Teléfono',
    content: CONFIG.contact.phone,
    link: `tel:${CONFIG.contact.phone}`
  },
  {
    icon: MapPin,
    title: 'Dirección',
    content: CONFIG.contact.address,
    link: `https://maps.google.com/?q=${encodeURIComponent(CONFIG.contact.address)}`
  }
];

const socialLinks = [
  {
    icon: Twitter,
    title: 'Twitter',
    link: CONFIG.social.twitter
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    link: CONFIG.social.linkedin
  },
  {
    icon: Github,
    title: 'GitHub',
    link: CONFIG.social.github
  }
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [sending, setSending] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Verificar rate limiting
      if (rateLimiter.isRateLimited('contact-form')) {
        toast.error('Por favor, espera unos minutos antes de enviar otro mensaje')
        return
      }

      setSending(true)

      // Sanitizar y validar datos
      const sanitizedName = InputSanitizer.sanitizeName(formData.name)
      const sanitizedEmail = InputSanitizer.sanitizeEmail(formData.email)
      const sanitizedSubject = InputSanitizer.sanitizeText(formData.subject, 200)
      const sanitizedMessage = InputSanitizer.sanitizeText(formData.message, 1000)

      if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
        toast.error('Por favor, completa todos los campos requeridos correctamente')
        return
      }

      // Enviar datos
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sanitizedName,
          email: sanitizedEmail,
          subject: sanitizedSubject,
          message: sanitizedMessage
        })
      })

      if (!response.ok) throw new Error('Error en el envío')

      toast.success('Mensaje enviado correctamente')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Registrar envío del formulario
      trackFormSubmission('contact')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al enviar el mensaje. Por favor, intenta nuevamente.')
    } finally {
      setSending(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <SEO
        title="Contacto - ZettAI"
        description="Ponte en contacto con nosotros para conocer más sobre nuestras soluciones de IA"
        type="website"
        keywords={['contacto', 'formulario', 'email', 'teléfono']}
      />
      <section id="contacto" className="py-32 relative overflow-hidden bg-black" role="region" aria-label="Formulario de contacto">
        {/* Gradiente superior */}
        <div 
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent)',
            zIndex: 1
          }}
        />

        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 -z-10 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(234, 179, 8, 0.15) 0%, rgba(11, 17, 32, 0) 50%)',
              'radial-gradient(circle at 100% 100%, rgba(234, 179, 8, 0.15) 0%, rgba(11, 17, 32, 0) 50%)',
              'radial-gradient(circle at 0% 100%, rgba(234, 179, 8, 0.15) 0%, rgba(11, 17, 32, 0) 50%)',
              'radial-gradient(circle at 100% 0%, rgba(234, 179, 8, 0.15) 0%, rgba(11, 17, 32, 0) 50%)',
              'radial-gradient(circle at 0% 0%, rgba(234, 179, 8, 0.15) 0%, rgba(11, 17, 32, 0) 50%)',
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <motion.span
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }
                }
              }}
              className="inline-block text-sm font-medium text-amber-200/80 uppercase tracking-wider mb-4"
            >
              Hablemos de tu proyecto
            </motion.span>
            <motion.h2 
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }
                }
              }}
              className="text-6xl font-bold mb-6 text-white"
            >
              ¿Tienes un Proyecto
              <br />
              en Mente?
            </motion.h2>
            <motion.p 
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }
                }
              }}
              className="text-xl leading-relaxed text-gray-400 max-w-2xl mx-auto"
            >
              Cuéntanos sobre tu visión y descubre cómo podemos ayudarte a 
              transformar tu negocio con IA
            </motion.p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.3
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto"
          >
            {/* Contact Info */}
            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.link}
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: {
                      x: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: index * 0.1
                      }
                    }
                  }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center p-6 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-white group-hover:text-amber-200 transition-colors">{item.title}</p>
                    <p className="text-gray-400">{item.content}</p>
                  </div>
                </motion.a>
              ))}

              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: 0.4
                    }
                  }
                }}
                className="flex gap-4 pt-6"
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.title}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-amber-500 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: 0.2
                  }
                }
              }}
              className="space-y-6"
            >
              {['name', 'email', 'subject', 'message'].map((field, index) => (
                <motion.div
                  key={field}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: index * 0.1
                      }
                    }
                  }}
                  className="relative"
                >
                  <motion.input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field)}
                    onBlur={() => setFocusedField(null)}
                    placeholder={
                      field === 'name' ? 'Nombre' :
                      field === 'email' ? 'Email' :
                      field === 'subject' ? 'Asunto' :
                      'Mensaje'
                    }
                    required={field !== 'subject'}
                    aria-required={field !== 'subject'}
                    aria-invalid={!formData[field as keyof typeof formData] && focusedField === field}
                    className={`w-full p-4 rounded-lg outline-none transition-all duration-300 bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:bg-white/[0.06] ${
                      focusedField === field 
                        ? 'ring-2 ring-amber-500 shadow-lg shadow-amber-500/20' 
                        : 'shadow-md'
                    }`}
                    style={{
                      height: field === 'message' ? '150px' : 'auto'
                    }}
                    {...(field === 'message' && { as: 'textarea' })}
                  />
                </motion.div>
              ))}

              <motion.button
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: 0.5
                    }
                  }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={sending}
                className="w-full p-4 rounded-lg font-medium flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20"
                aria-busy={sending}
              >
                {sending ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    Enviar Mensaje
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </>
  )
}
