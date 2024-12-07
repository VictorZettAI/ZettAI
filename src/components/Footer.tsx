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
      className={`transform transition-colors duration-200 hover:text-yellow-500`}
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
    <footer className="relative pt-24 pb-12 overflow-hidden bg-[#070914] text-gray-400">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">ZettAI</h2>
            <p className="text-sm leading-relaxed">
              Transformando el futuro empresarial con soluciones de IA innovadoras y personalizadas.
            </p>
            <div className="flex items-center space-x-4">
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
                    className="text-sm hover:text-yellow-500 transition-colors duration-200"
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
                    className="text-sm hover:text-yellow-500 transition-colors duration-200"
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
                  className="flex items-center space-x-3 hover:text-yellow-500 transition-colors duration-200"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center space-x-3 hover:text-yellow-500 transition-colors duration-200"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">{contact.phone}</span>
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{contact.address}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm text-center md:text-left"
            >
              {new Date().getFullYear()} ZettAI. Todos los derechos reservados.
            </motion.p>
            
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 transition-colors duration-200"
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
