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
import { CONFIG } from '@/constants/config'
import { appConfig } from '@/config/app'

const quickLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Casos de Éxito', href: '#casos' },
  { name: 'Demo', href: '#demo' },
  { name: 'Equipo', href: '#equipo' }
]

const services = appConfig.features.services.map(service => ({
  name: service.name,
  href: `#${service.id}`
}))

const socialLinks = [
  { platform: 'twitter', url: CONFIG.social.twitter, Icon: Twitter },
  { platform: 'linkedin', url: CONFIG.social.linkedin, Icon: Linkedin },
  { platform: 'github', url: CONFIG.social.github, Icon: Github }
].filter(link => link.url)

const contactInfo = [
  ...(CONFIG.contact.email ? [{
    icon: Mail,
    text: CONFIG.contact.email,
    href: `mailto:${CONFIG.contact.email}`,
    label: 'Email'
  }] : []),
  ...(CONFIG.contact.phone ? [{
    icon: Phone,
    text: CONFIG.contact.phone,
    href: `tel:${CONFIG.contact.phone.replace(/\s+/g, '')}`,
    label: 'Teléfono'
  }] : []),
  ...(CONFIG.contact.address ? [{
    icon: MapPin,
    text: CONFIG.contact.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(CONFIG.contact.address)}`,
    label: 'Dirección'
  }] : [])
]

function SocialIcon({ platform, url, Icon }: { platform: string; url: string; Icon: any }) {
  if (!url) return null;
  
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

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative pt-32 pb-12 overflow-hidden bg-[#070914]">
      {/* Línea dorada separadora */}
      <div className="container mx-auto px-6 max-w-7xl absolute top-0 left-0 right-0">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      </div>

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
            <h2 className="text-3xl font-bold text-white">{CONFIG.site.name}</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              {CONFIG.site.description}
            </p>
            <div className="flex items-center space-x-4 text-gray-400">
              {socialLinks.map((link) => (
                <SocialIcon key={link.platform} platform={link.platform} url={link.url} Icon={link.Icon} />
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
              {contactInfo.map((info) => (
                <li key={info.label}>
                  <a
                    href={info.href}
                    className="flex items-center space-x-3 text-gray-400 hover:text-amber-400 transition-colors duration-200 group"
                  >
                    <info.icon className="w-5 h-5 group-hover:text-amber-400" />
                    <span className="text-sm">{info.text}</span>
                  </a>
                </li>
              ))}
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
              {new Date().getFullYear()} {CONFIG.site.name}. Todos los derechos reservados.
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
