import { motion } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Phone,
  ArrowUp
} from 'lucide-react'

const quickLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Casos de Éxito', href: '#casos' },
  { name: 'Demo', href: '#demo' },
  { name: 'Equipo', href: '#equipo' }
]

const services = [
  { name: 'Machine Learning', href: '#servicios' },
  { name: 'Análisis Predictivo', href: '#servicios' },
  { name: 'Automatización IA', href: '#servicios' },
  { name: 'Big Data', href: '#servicios' },
  { name: 'Consultoría IA', href: '#servicios' }
]

const contact = {
  email: 'contacto@ZettAI.com',
  phone: '+34 900 123 456',
  address: 'Calle Tecnología 123, 28001 Madrid',
  social: {
    twitter: 'https://twitter.com/ZettAI',
    linkedin: 'https://linkedin.com/company/ZettAI',
    github: 'https://github.com/ZettAI'
  }
}

const SocialIcon = ({ platform, url }: { platform: string; url: string }) => {
  const icons = {
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github
  }
  const Icon = icons[platform as keyof typeof icons]
  
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="transform transition-colors duration-200 hover:text-amber-400"
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  )
}

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative pt-32 pb-12 overflow-hidden bg-[#070914]">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">ZettAI</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Transformando el futuro empresarial con soluciones de IA innovadoras y personalizadas.
            </p>
            <div className="flex items-center space-x-4 text-gray-400">
              {Object.entries(contact.social).map(([platform, url]) => (
                <SocialIcon key={platform} platform={platform} url={url} />
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Servicios</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <motion.li
                  key={service.name}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={service.href}
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors duration-200"
                  >
                    {service.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center space-x-3 text-gray-400 hover:text-amber-400 transition-colors duration-200 group"
                >
                  <Mail className="w-5 h-5 group-hover:text-amber-400" />
                  <span className="text-sm">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center space-x-3 text-gray-400 hover:text-amber-400 transition-colors duration-200 group"
                >
                  <Phone className="w-5 h-5 group-hover:text-amber-400" />
                  <span className="text-sm">{contact.phone}</span>
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{contact.address}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm text-center md:text-left text-gray-400"
            >
              {new Date().getFullYear()} ZettAI. Todos los derechos reservados.
            </motion.p>
            
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-amber-400 transition-all duration-200"
            >
              <span className="text-sm">Volver arriba</span>
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
