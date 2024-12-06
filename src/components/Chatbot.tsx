import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, X, Bot } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

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
      text: '¡Hola! Soy el asistente virtual de Zettai AI. ¿En qué puedo ayudarte?',
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
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg ${
          isDarkMode ? 'bg-yellow-500 text-black' : 'bg-yellow-600 text-white'
        }`}
        whileHover={{ scale: 1.1 }}
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
            <Card className={`shadow-xl border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Bot className={`w-6 h-6 mr-2 ${
                    isDarkMode ? 'text-yellow-500' : 'text-yellow-600'
                  }`} />
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    Asistente Virtual
                  </span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className={isDarkMode ? 'text-gray-400 hover:text-white' : ''}
                >
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-96 overflow-y-auto mb-4 space-y-4">
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
                            <AvatarFallback className={
                              isDarkMode ? 'bg-yellow-500 text-black' : 'bg-yellow-600 text-white'
                            }>
                              AI
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`rounded-lg p-3 ${
                          message.isBot
                            ? isDarkMode 
                              ? 'bg-gray-700 text-white' 
                              : 'bg-gray-100 text-gray-900'
                            : isDarkMode
                              ? 'bg-yellow-500 text-black'
                              : 'bg-yellow-600 text-white'
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
                    className={isDarkMode ? 'bg-gray-700 border-gray-600' : ''}
                  />
                  <Button type="submit" size="icon">
                    <Send className="w-4 h-4" />
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
