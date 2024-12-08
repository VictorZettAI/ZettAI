import { motion, useScroll, useTransform } from 'framer-motion'
import CountUp from 'react-countup'
import { useRef, useState } from 'react'
import networkBg from '../assets/network-bg.jpg'

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

export default function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      id="casos" 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Fondo de red neuronal */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${networkBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.7
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
              className="p-8 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500"
            >
              <div className="flex items-baseline gap-1 mb-3">
                <CountUp
                  end={metric.value}
                  decimals={metric.value % 1 !== 0 ? 1 : 0}
                  duration={2.5}
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
                />
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  {metric.suffix}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                {metric.label}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {metric.description}
              </p>
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
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.2
                  }
                }
              }}
              className="p-8 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{study.company}</h3>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-amber-500/10 text-amber-200">
                  {study.industry}
                </span>
              </div>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Desafío</h4>
                  <p className="text-gray-300">{study.challenge}</p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Solución</h4>
                  <p className="text-gray-300">{study.solution}</p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Resultados</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {study.results.map((result, i) => (
                      <li key={i} className="before:content-['•'] before:text-amber-500 before:mr-2">
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <blockquote className="border-l-2 border-amber-500/30 pl-4">
                <p className="text-gray-300 italic mb-4">{study.testimonial.quote}</p>
                <footer>
                  <div className="font-medium text-white">{study.testimonial.author}</div>
                  <div className="text-sm text-gray-400">{study.testimonial.position}</div>
                </footer>
              </blockquote>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
