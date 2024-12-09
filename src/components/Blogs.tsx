import goldenWave from '../assets/golden-wave.jpg';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

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
    title: "GPT-4 Turbo: El Nuevo Horizonte de la IA",
    description: "Últimas actualizaciones y mejoras en el modelo más avanzado de OpenAI.",
    date: "2024-01-05",
    category: "IA"
  },
  {
    id: 2,
    title: "Avances en IA Generativa",
    description: "Cómo la IA generativa está revolucionando la creación de contenido digital.",
    date: "2024-01-03",
    category: "Tecnología"
  },
  {
    id: 3,
    title: "IA en la Medicina Moderna",
    description: "La inteligencia artificial en el diagnóstico médico y tratamientos.",
    date: "2024-01-01",
    category: "Salud"
  },
  {
    id: 4,
    title: "El Futuro del Aprendizaje Automático",
    description: "Tendencias emergentes y predicciones para el futuro del machine learning.",
    date: "2023-12-28",
    category: "Machine Learning"
  },
  {
    id: 5,
    title: "Ética en la Inteligencia Artificial",
    description: "Desafíos éticos y consideraciones morales en el desarrollo de IA.",
    date: "2023-12-25",
    category: "Ética"
  },
  {
    id: 6,
    title: "Robótica e IA: Una Sinergia Perfecta",
    description: "Cómo la IA está transformando el campo de la robótica y automatización.",
    date: "2023-12-22",
    category: "Robótica"
  }
];

const BlogCard = ({ post }: { post: BlogPost }) => (
  <div className="group relative bg-[#000000]/70 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-1 hover:bg-[#000000]/80">
    {/* Glow effect */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-amber-500/5 group-hover:to-amber-500/10 transition-opacity duration-300"></div>
    
    {/* Card content */}
    <div className="relative flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <span className="bg-amber-500/10 text-amber-500 font-medium px-4 py-1.5 rounded-full text-sm border border-amber-500/20 transition-colors duration-300 group-hover:bg-amber-500/20">
          {post.category}
        </span>
        <span className="text-neutral-400 text-sm font-medium">
          {post.date}
        </span>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-200 transition-colors duration-300 line-clamp-2">
        {post.title}
      </h3>
      
      <p className="text-gray-400 mb-8 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
        {post.description}
      </p>

      <div className="mt-auto">
        <button className="flex items-center space-x-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 px-4 py-2 rounded-lg transition-all duration-300 group-hover:translate-x-1 transform border border-amber-500/20 hover:border-amber-500/30">
          <span className="font-medium">Leer más</span>
          <svg 
            className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 8l4 4m0 0l-4 4m4-4H3" 
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

export default function Blogs() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#030407]">
      {/* Fondo con efecto de onda dorada */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `url(${goldenWave})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Overlay gradiente */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(3, 4, 7, 0.9), rgba(3, 4, 7, 0.7))',
        }}
      />

      {/* Bottom shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030407] to-transparent"></div>

      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="flex flex-col items-center text-center mb-24">
          <h2 className="text-7xl font-bold leading-tight text-white mb-6">
            Blog de IA
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            Explora las últimas novedades y avances en el mundo de la Inteligencia Artificial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
