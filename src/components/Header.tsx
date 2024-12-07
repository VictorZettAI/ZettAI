import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  const { scrollY } = useScroll()

  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(11, 17, 32, 0)', 'rgba(11, 17, 32, 0.9)']
  )
  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(75, 85, 99, 0)', 'rgba(75, 85, 99, 0.3)']
  )
  const headerBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(12px)']
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Update active link based on scroll position
      const sections = document.querySelectorAll('section[id]')
      const scrollPosition = window.scrollY + 100

      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute('id') || ''

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveLink(sectionId)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: 'Inicio', href: '#', id: '' },
    { name: 'Servicios', href: '#servicios', id: 'servicios' },
    { name: 'Demo', href: '#demo', id: 'demo' },
    { name: 'Equipo', href: '#equipo', id: 'equipo' },
    { name: 'Contacto', href: '#contacto', id: 'contacto' },
  ]

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <motion.header
      style={{ 
        backgroundColor: headerBackground,
        borderBottom: `1px solid`,
        borderColor: headerBorder,
        backdropFilter: headerBlur,
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <a href="#" className="text-2xl font-bold text-white">
              ZettAI
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center space-x-8"
          >
            {menuItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative text-sm font-medium transition-colors duration-300 text-gray-300 hover:text-yellow-500`}
              >
                {item.name}
                <motion.div
                  initial={false}
                  animate={{
                    width: activeLink === item.id ? '100%' : '0%',
                    opacity: activeLink === item.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-500`}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-yellow-500 transition-colors"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0,
            transition: {
              height: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
              },
              opacity: {
                duration: 0.3,
                delay: isMenuOpen ? 0.2 : 0
              }
            }
          }}
          className="md:hidden overflow-hidden"
        >
          <motion.div 
            variants={navVariants}
            initial="hidden"
            animate={isMenuOpen ? "visible" : "hidden"}
            className="flex flex-col space-y-4 py-6"
          >
            {menuItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-300 text-gray-300 hover:text-yellow-500 hover:bg-gray-800 ${activeLink === item.id ? 'bg-gray-800' : ''}`}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </nav>
    </motion.header>
  )
}
