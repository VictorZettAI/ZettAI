import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, Linkedin, Twitter, Github } from 'lucide-react'

interface ContactProps {
}

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: 'contacto@ZettAI.com',
    link: 'mailto:contacto@ZettAI.com'
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
    content: 'Calle Tecnología 123, 28001 Madrid',
    link: 'https://maps.google.com'
  }
]

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://linkedin.com/company/ZettAI',
    label: 'LinkedIn'
  },
  {
    icon: Twitter,
    href: 'https://twitter.com/ZettAI',
    label: 'Twitter'
  },
  {
    icon: Github,
    href: 'https://github.com/ZettAI',
    label: 'GitHub'
  }
]

export default function Contact() {
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
    setSending(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Form submitted:', formData)
    setSending(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contacto" className="py-32 relative overflow-hidden bg-[#0B1120]">
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
                  key={social.label}
                  href={social.href}
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
  )
}
