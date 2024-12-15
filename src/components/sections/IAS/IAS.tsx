import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { SEO } from '../../SEO/SEO';
import { openAIService } from '@/services/api/openai';
import { CONFIG } from '@/constants/config';
import bgImage from '@/assets/golden-wave.jpg';
import robotImage from '@/assets/robot.jpg';
import cityImage from '@/assets/city.jpg';
import triangleImage from '@/assets/triangle-portal.jpg';
import circuitImage from '@/assets/circuit-lines.jpg';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface IADemo {
  id: number;
  title: string;
  description: string;
  image: string;
  enabled: boolean;
}

function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const userMessage: Message = { role: 'user', content: input };
      setMessages(prev => [...prev, userMessage]);
      setInput('');

      const response = await openAIService.chat([...messages, userMessage]);
      
      if (response) {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      }
    } catch (error) {
      console.error('Error en el chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.role === 'user'
                ? 'bg-amber-500/10 text-amber-500 ml-auto'
                : 'bg-gray-800 text-white mr-auto'
            } max-w-[80%]`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="animate-bounce">●</div>
            <div className="animate-bounce delay-100">●</div>
            <div className="animate-bounce delay-200">●</div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-amber-500 text-black px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

const ImageGeneratorDemo = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const response = await openAIService.generateImage(prompt);
      setGeneratedImage(response.data[0]?.url || '');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar la imagen');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe la imagen que quieres generar..."
          className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          onClick={generateImage}
          disabled={isLoading}
          className="bg-amber-500 text-black px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          Generar
        </button>
      </div>
      <div className="h-[400px] flex items-center justify-center bg-gray-800 rounded-lg">
        {isLoading ? (
          <div className="text-amber-500">Generando imagen...</div>
        ) : generatedImage ? (
          <OptimizedImage src={generatedImage} alt="Generated" className="max-h-full max-w-full object-contain rounded-lg" />
        ) : (
          <div className="text-gray-400">La imagen generada aparecerá aquí</div>
        )}
      </div>
    </div>
  );
};

const TextAnalyzerDemo = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeText = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const response = await openAIService.analyzeText(text);
      const analysisResult = JSON.parse(response.choices[0]?.message?.content || '{}');
      setAnalysis(analysisResult);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al analizar el texto');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ingresa el texto a analizar..."
        className="w-full h-32 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <button
        onClick={analyzeText}
        disabled={isLoading}
        className="w-full bg-amber-500 text-black px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
      >
        Analizar
      </button>
      {isLoading ? (
        <div className="text-amber-500">Analizando texto...</div>
      ) : analysis && (
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-amber-500 font-medium mb-2">Sentimiento</h4>
            <p className="text-white">{analysis.sentiment}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-amber-500 font-medium mb-2">Palabras Clave</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords?.map((keyword: string, index: number) => (
                <span key={index} className="bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-amber-500 font-medium mb-2">Temas Principales</h4>
            <ul className="list-disc list-inside text-white">
              {analysis.themes?.map((theme: string, index: number) => (
                <li key={index}>{theme}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const CodeAssistantDemo = () => {
  const [code, setCode] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeCode = async () => {
    if (!code.trim()) return;

    setIsLoading(true);
    try {
      const response = await openAIService.analyzeCode(code);
      const suggestionsText = response.choices[0]?.message?.content || '';
      const suggestionsList = suggestionsText
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^[0-9.-]*\s*/, ''));

      setSuggestions(suggestionsList);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al analizar el código');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Pega tu código aquí..."
        className="w-full h-48 bg-gray-800 text-white font-mono rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <button
        onClick={analyzeCode}
        disabled={isLoading}
        className="w-full bg-amber-500 text-black px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
      >
        Analizar Código
      </button>
      {isLoading ? (
        <div className="text-amber-500">Analizando código...</div>
      ) : suggestions.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-amber-500 font-medium mb-4">Sugerencias de Mejora</h4>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start space-x-2 text-white">
                <span className="text-amber-500 mt-1">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const demoData: IADemo[] = [
  {
    id: 1,
    title: "Chat Asistente",
    description: "Interactúa con nuestro asistente virtual impulsado por IA. Capaz de mantener conversaciones naturales y ayudarte con diversas tareas.",
    image: robotImage,
    enabled: true
  },
  {
    id: 2,
    title: "Generador de Imágenes",
    description: "Convierte tus ideas en imágenes únicas utilizando nuestra IA generativa. Crea arte, diseños y visualizaciones sorprendentes.",
    image: triangleImage,
    enabled: true
  },
  {
    id: 3,
    title: "Análisis de Texto",
    description: "Analiza y comprende textos en profundidad con nuestra IA. Extrae información clave, sentimientos y más.",
    image: circuitImage,
    enabled: true
  },
  {
    id: 4,
    title: "Asistente de Código",
    description: "Obtén ayuda con tu código. Nuestro asistente puede ayudarte a debuggear, optimizar y mejorar tu código.",
    image: cityImage,
    enabled: true
  }
];

const IACard = ({ demo }: { demo: IADemo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      className="relative bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsActive(!isActive)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative h-48 overflow-hidden">
        <OptimizedImage
          src={demo.image}
          alt={demo.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070914] to-transparent" />
      </div>

      <div className="p-6 relative">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
          {demo.title}
        </h3>
        <p className="text-gray-300 mb-4">
          {demo.description}
        </p>
        <motion.button
          onClick={() => setIsActive(!isActive)}
          className="inline-flex items-center space-x-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 px-6 py-3 rounded-lg transition-all duration-300 transform border border-amber-500/20 hover:border-amber-500/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!demo.enabled}
        >
          <span className="font-medium">Probar Demo</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
      </div>

      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#070914]/95 p-6 z-10"
        >
          <div className="h-full flex flex-col">
            {demo.id === 1 && <ChatDemo />}
            {demo.id === 2 && <ImageGeneratorDemo />}
            {demo.id === 3 && <TextAnalyzerDemo />}
            {demo.id === 4 && <CodeAssistantDemo />}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export function IAS() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <>
      <SEO 
        title="Demo IA - Prueba Nuestras Soluciones de IA"
        description="Experimenta en tiempo real con nuestras soluciones de inteligencia artificial. Desde chatbots hasta generación de imágenes."
        type="website"
        keywords={['demo IA', 'inteligencia artificial', 'chatbot', 'generación de imágenes', 'análisis de texto']}
      />
      <section 
        id="ias"
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
              Experimenta la IA en Acción
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Prueba nuestras demostraciones interactivas de inteligencia artificial
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {demoData.map((demo, index) => (
              <motion.div
                key={demo.id}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.2
                    }
                  }
                }}
              >
                <IACard demo={demo} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
