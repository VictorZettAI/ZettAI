import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, CheckCircle, ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import trianglePortal from '../assets/triangle-portal.jpg'

const features = [
  {
    title: 'Análisis Predictivo',
    description: 'Anticipa tendencias y comportamientos con precisión utilizando modelos avanzados de machine learning.',
    benefits: [
      'Predicciones precisas en tiempo real',
      'Modelos adaptativos auto-optimizados',
      'Visualización intuitiva de resultados'
    ]
  },
  {
    title: 'Automatización Inteligente',
    description: 'Optimiza procesos empresariales con automatización basada en IA que aprende y mejora continuamente.',
    benefits: [
      'Reducción significativa de tareas manuales',
      'Mejora continua del rendimiento',
      'Integración perfecta con sistemas existentes'
    ]
  },
  {
    title: 'Insights Accionables',
    description: 'Convierte datos complejos en insights claros y accionables para tomar mejores decisiones.',
    benefits: [
      'Dashboards personalizables en tiempo real',
      'Alertas inteligentes automatizadas',
      'Reportes detallados bajo demanda'
    ]
  }
]

export default function DemoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section 
      ref={containerRef}
      id="demo" 
      className="py-32 relative overflow-hidden bg-black perspective-1000"
    >
      {/* Partículas 3D sutiles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              background: `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})`,
              boxShadow: '0 0 2px rgba(255, 255, 255, 0.3)',
              transform: `translateZ(${Math.random() * 100}px)`,
              animation: `particle${i} ${Math.random() * 20 + 15}s linear infinite`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent opacity-50" />

      {/* Sombra inferior */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, transparent, rgba(0, 0, 0, 0.7))'
        }}
      />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block text-sm font-medium text-amber-200/80 uppercase tracking-wider mb-4"
          >
            Experiencia en acción
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-6xl font-bold mb-6 text-white"
          >
            Descubre el Poder
            <br />
            de la IA
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl leading-relaxed text-gray-400 max-w-2xl mx-auto"
          >
            Explora cómo nuestra plataforma transforma datos complejos en soluciones 
            inteligentes y resultados tangibles para tu negocio
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Video Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-gradient-to-br from-amber-500/10 to-transparent p-1"
          >
            <div className="aspect-video relative rounded-xl overflow-hidden">
              <img
                src={trianglePortal}
                alt="Portal triangular brillante"
                className="w-full h-full object-cover"
              />
            </div>
            
            <motion.button
              onClick={handlePlayClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-colors duration-300`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 rounded-full flex items-center justify-center bg-amber-500 text-white shadow-lg backdrop-blur-sm"
              >
                <Play className="w-8 h-8 ml-1" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all duration-300 group"
              >
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-200 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm mb-4 text-gray-400">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                      className="flex items-start space-x-2"
                    >
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-500" />
                      <span className="text-sm text-gray-300">
                        {benefit}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <div className="flex justify-center mt-12">
              <Link to="/ias">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium bg-amber-500 hover:bg-amber-400 text-gray-900 transition-colors shadow-lg shadow-amber-500/20 mr-4"
                >
                  Solicitar Demo Personalizada
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </Link>
              <Link to="/blog">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium bg-amber-500 hover:bg-amber-400 text-gray-900 transition-colors shadow-lg shadow-amber-500/20"
                >
                  Descubre Nuestro Blog
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        ${[...Array(100)].map((_, i) => `
          @keyframes particle${i} {
            0% {
              transform: translate3d(
                ${Math.random() * 40 - 20}px,
                ${Math.random() * 40 - 20}px,
                ${Math.random() * 100}px
              );
            }
            50% {
              transform: translate3d(
                ${Math.random() * 40 - 20}px,
                ${Math.random() * 40 - 20}px,
                ${Math.random() * 200}px
              );
            }
            100% {
              transform: translate3d(
                ${Math.random() * 40 - 20}px,
                ${Math.random() * 40 - 20}px,
                ${Math.random() * 100}px
              );
            }
          }
        `).join('\n')}
      `}</style>
    </section>
  )
}
