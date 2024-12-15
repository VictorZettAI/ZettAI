import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { SEO } from '../../SEO/SEO';

const testimonials = [
  {
    name: 'María García',
    role: 'CEO de TechSolutions',
    content: 'ZettAI transformó completamente nuestra forma de trabajar. Su implementación de IA no solo mejoró nuestra eficiencia, sino que también nos ayudó a destacar en nuestro mercado.',
    rating: 5
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Director de Innovación',
    content: 'La capacidad de ZettAI para entender nuestras necesidades y convertirlas en soluciones prácticas fue impresionante. Los resultados superaron nuestras expectativas.',
    rating: 5
  },
  {
    name: 'Ana Martínez',
    role: 'CTO de DataCorp',
    content: 'Trabajar con ZettAI fue una experiencia excepcional. Su equipo no solo es técnicamente brillante, sino que también entiende perfectamente las necesidades empresariales.',
    rating: 5
  }
]

export function Testimonials() {
  return (
    <>
      <SEO 
        title="Testimonios - ZettAI"
        description="Descubre lo que nuestros clientes dicen sobre nuestras soluciones de IA. Casos de éxito y experiencias reales con la implementación de inteligencia artificial."
        type="website"
        keywords={['testimonios IA', 'casos éxito IA', 'opiniones clientes', 'experiencias inteligencia artificial']}
      />
      <section className="py-24 bg-black relative overflow-hidden">
      {/* Gradiente superior */}
      <div 
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent)',
          zIndex: 1
        }}
      />

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
            Testimonios
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
            Lo Que Dicen
            <br />
            Nuestros Clientes
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
            Descubre cómo hemos ayudado a otras empresas a alcanzar sus objetivos
            a través de soluciones innovadoras de IA
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
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
              className="p-8 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all duration-300"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <blockquote className="text-lg text-gray-300 mb-6">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center">
                <div>
                  <div className="font-medium text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
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
