import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, X, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ChatbotProps {
  isDarkMode: boolean
}

interface Message {
  id: number
  text: string
  isBot: boolean
}

export function Chatbot({ isDarkMode }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '¡Hola! Soy el asistente virtual de ZettAI. ¿En qué puedo ayudarte?',
      isBot: true
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Añadir mensaje del usuario
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Simular respuesta del bot (aquí podrías integrar una API real)
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: 'Gracias por tu mensaje. Un miembro de nuestro equipo se pondrá en contacto contigo pronto.',
        isBot: true
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  return (
    <>
      <motion.button
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-8 z-50 w-96"
          >
            <Card className="shadow-2xl border-0 bg-[#030407] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-amber-500/20">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Bot className="w-6 h-6 mr-2 text-amber-500" />
                  <span className="text-white">
                    Asistente Virtual
                  </span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-800 hover:bg-gray-700 text-amber-500 hover:text-amber-400 transition-colors rounded-full w-8 h-8 p-1"
                >
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-96 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${
                        message.isBot ? 'flex-row' : 'flex-row-reverse'
                      }`}>
                        {message.isBot && (
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="/bot-avatar.png" />
                            <AvatarFallback className="bg-amber-500 text-black">
                              AI
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`rounded-lg p-3 ${
                          message.isBot
                            ? 'bg-gray-800/50 text-white border border-amber-500/20' 
                            : 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
                        }`}>
                          {message.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="bg-gray-800/50 border-amber-500/20 focus:border-amber-500 focus:ring-amber-500/20 placeholder-gray-500"
                  />
                  <Button 
                    type="submit" 
                    className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 rounded-full transition-colors"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    <span>Enviar</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
