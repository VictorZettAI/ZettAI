import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import OpenAI from 'openai';

// Inicializar OpenAI - Necesitarás añadir tu API key
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface IADemo {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  demoComponent: React.ReactNode;
  features: string[];
}

const ChatDemo = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const completion = await openai.chat.completions.create({
        messages: [...messages, newMessage].map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        model: 'gpt-3.5-turbo',
      });

      const response = completion.choices[0]?.message?.content;
      if (response) {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, hubo un error al procesar tu mensaje.' }]);
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
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });

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
          <img src={generatedImage} alt="Generated" className="max-h-full max-w-full object-contain rounded-lg" />
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
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Analiza el siguiente texto y proporciona un resumen del sentimiento (positivo, negativo o neutral), palabras clave y temas principales. Responde en formato JSON con las siguientes claves: sentiment, keywords, themes"
          },
          {
            role: "user",
            content: text
          }
        ],
      });

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
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Analiza el siguiente código y proporciona sugerencias de mejora en términos de legibilidad, mantenibilidad y mejores prácticas. Proporciona las sugerencias en formato de lista."
          },
          {
            role: "user",
            content: code
          }
        ],
      });

      const suggestionsText = response.choices[0]?.message?.content || '';
      // Convertir el texto en una lista de sugerencias
      const suggestionsList = suggestionsText
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^[0-9.-]*\s*/, '')); // Eliminar números o guiones al inicio

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
    category: "Chat IA",
    description: "Interactúa con un asistente virtual impulsado por GPT-3.5. Haz preguntas, obtén respuestas detalladas y mantén conversaciones naturales.",
    imageUrl: "/images/chat-assistant.jpg",
    features: [
      "Respuestas en tiempo real",
      "Procesamiento de lenguaje natural",
      "Memoria de contexto",
      "Personalización de respuestas"
    ],
    demoComponent: <ChatDemo />
  },
  {
    id: 2,
    title: "Generador de Imágenes",
    category: "IA Generativa",
    description: "Crea imágenes únicas y personalizadas utilizando DALL-E 3. Describe lo que imaginas y observa cómo la IA lo convierte en realidad.",
    imageUrl: "/images/image-generator.jpg",
    features: [
      "Generación de alta calidad",
      "Personalización detallada",
      "Múltiples estilos artísticos",
      "Resolución 1024x1024"
    ],
    demoComponent: <ImageGeneratorDemo />
  },
  {
    id: 3,
    title: "Analizador de Texto",
    category: "Análisis IA",
    description: "Analiza textos para extraer sentimientos, palabras clave y temas principales. Ideal para análisis de contenido y comprensión de texto.",
    imageUrl: "/images/text-analyzer.jpg",
    features: [
      "Análisis de sentimiento",
      "Extracción de palabras clave",
      "Identificación de temas",
      "Procesamiento multilingüe"
    ],
    demoComponent: <TextAnalyzerDemo />
  },
  {
    id: 4,
    title: "Asistente de Código",
    category: "Desarrollo IA",
    description: "Mejora tu código con sugerencias inteligentes. Analiza la calidad del código, identifica problemas y recibe recomendaciones de mejora.",
    imageUrl: "/images/code-assistant.jpg",
    features: [
      "Análisis de código",
      "Sugerencias de mejora",
      "Detección de patrones",
      "Mejores prácticas"
    ],
    demoComponent: <CodeAssistantDemo />
  }
];

const IACard = ({ demo }: { demo: IADemo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      {/* Card principal */}
      <div 
        className={`group relative bg-[#000000]/70 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 ${
          isExpanded ? 'scale-95 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black">
          <img 
            src={demo.imageUrl} 
            alt={demo.title}
            className="w-full h-full object-cover opacity-50 transition-opacity duration-300 group-hover:opacity-60"
          />
        </div>

        {/* Content */}
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="bg-amber-500/10 text-amber-500 font-medium px-4 py-1.5 rounded-full text-sm border border-amber-500/20 transition-colors duration-300 group-hover:bg-amber-500/20">
              {demo.category}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-amber-200 transition-colors duration-300">
            {demo.title}
          </h3>

          <p className="text-gray-300 mb-6 line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
            {demo.description}
          </p>

          {/* Features List */}
          <div className="space-y-2 mb-8">
            {demo.features.map((feature, index) => (
              <div key={index} className="flex items-center text-gray-400 group-hover:text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50 mr-2"></div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Try Demo Button */}
          <button
            onClick={() => setIsExpanded(true)}
            className="inline-flex items-center space-x-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 px-6 py-3 rounded-lg transition-all duration-300 transform border border-amber-500/20 hover:border-amber-500/30"
          >
            <span className="font-medium">Probar Demo</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-amber-500/5 group-hover:to-amber-500/10 transition-opacity duration-300"></div>
      </div>

      {/* Demo expandida */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-500 ${
          isExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h3 className="text-2xl font-bold text-white">{demo.title}</h3>
              <p className="text-gray-400 mt-1">{demo.category}</p>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Demo Content */}
          <div className="p-6">
            {demo.demoComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

const IAS = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full relative">
          <img 
            src="/images/ai-background.jpg" 
            alt="AI Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Demos de Inteligencia Artificial
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explora nuestras demos interactivas de IA y descubre el potencial de la tecnología más avanzada.
            Desde conversaciones naturales hasta generación de imágenes, nuestras demos te mostrarán el futuro de la IA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {demoData.map(demo => (
            <IACard key={demo.id} demo={demo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IAS;
