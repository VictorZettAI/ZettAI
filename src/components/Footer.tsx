import { Brain, Github, Linkedin, Twitter } from 'lucide-react'

interface FooterProps {
  isDarkMode: boolean
}

export function Footer({ isDarkMode }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Brain className={`w-8 h-8 mr-2 ${isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}`} />
              <span className={`text-xl font-bold ${isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}`}>
                Zettai AI
              </span>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Transformando el futuro con inteligencia artificial.
              Soluciones innovadoras para empresas modernas.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Servicios
            </h3>
            <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>Machine Learning</li>
              <li>Chatbots Inteligentes</li>
              <li>Análisis de Datos</li>
              <li>Automatización</li>
            </ul>
          </div>

          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Empresa
            </h3>
            <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>Sobre Nosotros</li>
              <li>Casos de Éxito</li>
              <li>Blog</li>
              <li>Contacto</li>
            </ul>
          </div>

          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Legal
            </h3>
            <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>Privacidad</li>
              <li>Términos</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © {currentYear} Zettai AI. Todos los derechos reservados.
            </p>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className={`hover:text-yellow-500 transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`hover:text-yellow-500 transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`hover:text-yellow-500 transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
