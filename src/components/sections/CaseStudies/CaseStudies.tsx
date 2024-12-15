import { motion, useScroll, useTransform } from 'framer-motion'
import CountUp from 'react-countup'
import { useRef, useState, useEffect } from 'react'
import trianglePortal from '@//assets/city.jpg'
import { OptimizedImage } from '../../ui/OptimizedImage';
import { useImageLoader } from '@//hooks/useImageLoader'
import { SEO } from '../../SEO/SEO';

interface CaseStudiesProps {
}

const metrics = [
  {
    value: 98,
    suffix: '%',
    label: 'Satisfacción del Cliente',
    description: 'De nuestros clientes reportan mejoras significativas'
  },
  {
    value: 2.5,
    suffix: 'M',
    label: 'Predicciones Diarias',
    description: 'Decisiones empresariales optimizadas con IA'
  },
  {
    value: 45,
    suffix: '%',
    label: 'Reducción de Costes',
    description: 'Promedio de ahorro en procesos automatizados'
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Soporte Continuo',
    description: 'Asistencia técnica y monitorización'
  }
]

const caseStudies = [
  {
    company: 'TechCorp Global',
    industry: 'Tecnología',
    challenge: 'Optimización de cadena de suministro',
    solution: 'IA predictiva para gestión de inventario',
    results: ['Reducción del 35% en costes', 'Mejora del 45% en eficiencia', 'ROI positivo en 6 meses'],
    testimonial: {
      quote: "La implementación de ZettAI transformó completamente nuestra operativa.",
      author: "María González",
      position: "Directora de Operaciones"
    }
  },
  {
    company: 'FinanceHub',
    industry: 'Servicios Financieros',
    challenge: 'Detección de fraude en tiempo real',
    solution: 'Sistema de ML para análisis de transacciones',
    results: ['99.9% de precisión en detección', 'Reducción del 75% en falsos positivos', 'Ahorro de €2M anuales'],
    testimonial: {
      quote: "Un cambio revolucionario en nuestra capacidad de prevención de fraude.",
      author: "Carlos Ruiz",
      position: "CISO"
    }
  }
]

export function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [startCounting, setStartCounting] = useState(false)
  
  // Optimizar la carga de la imagen de fondo
  const { isLoaded: isCityLoaded } = useImageLoader(trianglePortal)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCounting(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <>
      <SEO 
        title="Casos de Éxito - ZettAI"
        description="Explora nuestros casos de éxito en la implementación de soluciones de IA. Historias reales de transformación empresarial a través de la inteligencia artificial."
        type="website"
        keywords={['casos éxito IA', 'implementación IA', 'transformación digital', 'soluciones empresariales IA']}
      />
      <section 
        id="casos" 
        ref={containerRef}
        className="relative py-32 overflow-hidden bg-[#030407]"
      >
        {/* Imagen de fondo */}
        <OptimizedImage 
          className="absolute inset-0 opacity-90"
          src={trianglePortal}
          style={{
            objectFit: 'cover',
            objectPosition: 'left',
            filter: 'grayscale(30%) brightness(100%)'
          }}
        />

        {/* Gradiente superior */}
        <div 
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent)',
            zIndex: 1
          }}
        />

        {/* Sombra inferior */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.85) 90%, rgba(0, 0, 0, 0.95))',
            zIndex: 1
          }}
        />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
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
            className="flex flex-col items-end text-right space-y-6 mb-24"
          >
            <motion.h2 
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 90,
                    damping: 20
                  }
                }
              }}
              className="text-7xl font-bold leading-tight text-white"
            >
              Casos de
              <br />
              Éxito
            </motion.h2>
            <motion.p 
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 70,
                    damping: 20
                  }
                }
              }}
              className="text-xl text-gray-400 max-w-xl leading-relaxed"
            >
              Descubre cómo hemos ayudado a empresas líderes a transformar sus negocios con soluciones de IA innovadoras
            </motion.p>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
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
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: index * 0.2
                    }
                  }
                }}
                className="bg-[#000000] border border-white/10 rounded-2xl p-6 
                  transition-all duration-300 hover:border-amber-500/30 
                  hover:shadow-lg hover:shadow-amber-500/20
                  bg-opacity-70 backdrop-blur-sm 
                  flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                      {startCounting ? (
                        <CountUp 
                          end={metric.value} 
                          suffix={metric.suffix} 
                          duration={2} 
                          enableScrollSpy
                        />
                      ) : (
                        '0' + metric.suffix
                      )}
                    </div>
                    <span className="text-sm text-amber-200 bg-amber-500/10 px-3 py-1 rounded-full">
                      Métrica
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {metric.label}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Case Studies Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.4
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: index * 0.2
                    }
                  }
                }}
                className="bg-[#000000] border border-white/10 rounded-2xl p-8 space-y-6 
                  transition-all duration-300 hover:border-amber-500/30 
                  hover:shadow-lg hover:shadow-amber-500/20
                  bg-opacity-70 backdrop-blur-sm"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">{study.company}</h3>
                  <span className="text-sm text-amber-200 bg-amber-500/10 px-3 py-1 rounded-full">
                    {study.industry}
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-300 font-medium">Desafío:</p>
                    <p className="text-gray-400">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">Solución:</p>
                    <p className="text-gray-400">{study.solution}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">Resultados:</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="before:content-['•'] before:text-amber-500 before:mr-2">
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-6 mt-6">
                  <blockquote className="italic text-gray-300 mb-4 border-l-2 border-amber-500/30 pl-4">
                    "{study.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="text-white font-semibold">{study.testimonial.author}</p>
                      <p className="text-sm text-gray-400">{study.testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
