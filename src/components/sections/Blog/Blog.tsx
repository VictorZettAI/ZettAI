import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { useImageLoader } from '../../../hooks/useImageLoader';
import { SEO } from '../../SEO/SEO';
import bgImage from '@/assets/golden-wave.jpg';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Inteligencia Artificial en la Industria Moderna',
    description: 'Descubre cómo la IA está transformando los procesos industriales y mejorando la eficiencia operativa.',
    date: '2023-12-01',
    category: 'Industria'
  },
  {
    id: 2,
    title: 'Machine Learning en el Sector Financiero',
    description: 'Análisis del impacto del aprendizaje automático en las decisiones financieras y la gestión de riesgos.',
    date: '2023-11-28',
    category: 'Finanzas'
  },
  {
    id: 3,
    title: 'El Futuro del Procesamiento del Lenguaje Natural',
    description: 'Explorando las últimas tendencias y avances en NLP y sus aplicaciones prácticas.',
    date: '2023-11-25',
    category: 'Tecnología'
  }
];

const BlogCard = ({ post, delay }: { post: BlogPost; delay: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: delay * 0.2
          }
        }
      }}
      className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:scale-105"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-amber-400 text-sm">{post.date}</span>
          <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-sm">
            {post.category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-300 mb-4 line-clamp-3">
          {post.description}
        </p>
        <motion.button
          whileHover={{ x: 5 }}
          className="text-amber-400 font-medium hover:text-amber-300 transition-colors inline-flex items-center"
        >
          Leer más
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>
    </motion.article>
  );
};

export function Blog() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const controls = useAnimation();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEO 
        title="Blog - Últimas Noticias y Artículos sobre IA"
        description="Descubre las últimas tendencias, noticias y avances en inteligencia artificial. Artículos escritos por expertos en el campo de la IA."
        type="website"
        keywords={['blog IA', 'noticias IA', 'inteligencia artificial', 'tecnología', 'machine learning']}
      />
      <section 
        id="blog"
        className="relative min-h-screen pt-32 pb-20 overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#070914]/40 to-[#070914]/40 pointer-events-none" />
        
        <div className="container relative mx-auto px-4 z-10">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6
                }
              }
            }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Últimas Publicaciones
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
              Explora nuestros artículos sobre IA, machine learning y tecnología
            </p>

            {/* Buscador */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 border border-amber-500/20 rounded-xl 
                           text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50
                           backdrop-blur-md transition-all duration-300"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-500/50 w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} delay={index} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">
                No se encontraron artículos que coincidan con tu búsqueda.
              </p>
            </motion.div>
          )}

          {filteredPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-amber-500 text-white px-8 py-3 rounded-lg hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                Ver más artículos
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
