import { motion, useScroll, useTransform } from 'framer-motion'
import CountUp from 'react-countup'
import { useRef, useState } from 'react'

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
      className="py-24 relative overflow-hidden bg-[#0B1120]"
    >
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

      <div className="container mx-auto px-4 max-w-7xl">
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
          className="text-center max-w-3xl mx-auto mb-20"
        >
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
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Casos de Éxito
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
            className="text-xl text-gray-300"
          >
            Descubre cómo hemos ayudado a empresas líderes a transformar sus negocios con IA
          </motion.p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
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
              className={`p-6 rounded-xl bg-gray-800/50 hover:bg-gray-800/80 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <div className="flex items-baseline gap-1 mb-2">
                <CountUp
                  end={metric.value}
                  decimals={metric.value % 1 !== 0 ? 1 : 0}
                  duration={2.5}
                  className="text-3xl md:text-4xl font-bold text-yellow-500"
                />
                <span className="text-2xl md:text-3xl font-bold text-yellow-500">
                  {metric.suffix}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                {metric.label}
              </h3>
              <p className="text-gray-400">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
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
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.company}
              variants={{
                hidden: { 
                  x: index % 2 === 0 ? -20 : 20, 
                  opacity: 0 
                },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.2
                  }
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-8 rounded-xl bg-gray-800/50 hover:bg-gray-800/80 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {study.company}
                </h3>
                <p className="text-sm text-yellow-500">
                  {study.industry}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-medium mb-2 text-gray-300">
                    Desafío
                  </h4>
                  <p className="text-gray-400">
                    {study.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-gray-300">
                    Solución
                  </h4>
                  <p className="text-gray-400">
                    {study.solution}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-gray-300">
                    Resultados
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    {study.results.map((result, i) => (
                      <li 
                        key={i}
                        className="text-gray-400"
                      >
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <blockquote className="border-l-4 border-yellow-500 pl-4">
                <p className="italic mb-2 text-gray-300">
                  "{study.testimonial.quote}"
                </p>
                <footer>
                  <p className="font-medium text-white">
                    {study.testimonial.author}
                  </p>
                  <p className="text-sm text-gray-400">
                    {study.testimonial.position}
                  </p>
                </footer>
              </blockquote>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
