import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Star, Trophy, CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react'

const FractionGame = ({ gameType, onBack, onScoreUpdate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [questions, setQuestions] = useState([])

  // Gerar perguntas baseadas no tipo de jogo
  useEffect(() => {
    generateQuestions()
  }, [gameType])

  const generateQuestions = () => {
    const newQuestions = []
    
    if (gameType === 'pizza') {
      // Perguntas sobre pizza
      newQuestions.push(
        {
          question: "Se uma pizza foi dividida em 8 fatias iguais e você comeu 3 fatias, que fração da pizza você comeu?",
          options: ["1/8", "3/8", "5/8", "3/5"],
          correct: 1,
          visual: "🍕 dividida em 8 fatias, 3 comidas"
        },
        {
          question: "Uma pizza tem 6 fatias. Se você comer 2 fatias, que fração sobrou?",
          options: ["2/6", "4/6", "1/3", "2/3"],
          correct: 1,
          visual: "🍕 com 6 fatias, 2 comidas"
        },
        {
          question: "Qual é maior: 1/2 de uma pizza ou 3/8 de uma pizza?",
          options: ["1/2", "3/8", "São iguais", "Não dá para comparar"],
          correct: 0,
          visual: "🍕 comparando 1/2 vs 3/8"
        }
      )
    } else if (gameType === 'bars') {
      // Perguntas sobre barras
      newQuestions.push(
        {
          question: "Qual barra representa a fração 2/5?",
          options: ["Barra com 2 de 5 partes coloridas", "Barra com 3 de 5 partes coloridas", "Barra com 1 de 5 partes coloridas", "Barra com 4 de 5 partes coloridas"],
          correct: 0,
          visual: "Barras coloridas representando diferentes frações"
        },
        {
          question: "Se uma barra está dividida em 10 partes e 7 estão coloridas, qual fração representa?",
          options: ["3/10", "7/10", "10/7", "7/3"],
          correct: 1,
          visual: "Barra com 10 divisões, 7 coloridas"
        },
        {
          question: "Qual é equivalente a 1/2?",
          options: ["2/4", "3/5", "1/3", "3/7"],
          correct: 0,
          visual: "Comparação de frações equivalentes"
        }
      )
    } else if (gameType === 'shapes') {
      // Perguntas sobre formas
      newQuestions.push(
        {
          question: "Um círculo está dividido em 4 partes iguais. Se 1 parte está colorida, qual fração representa?",
          options: ["1/4", "1/3", "2/4", "3/4"],
          correct: 0,
          visual: "⭕ dividido em 4 partes, 1 colorida"
        },
        {
          question: "Um triângulo está dividido em 3 partes iguais. Se 2 partes estão coloridas, qual fração representa?",
          options: ["1/3", "2/3", "3/2", "2/1"],
          correct: 1,
          visual: "🔺 dividido em 3 partes, 2 coloridas"
        },
        {
          question: "Qual forma mostra 3/4?",
          options: ["Quadrado com 3 de 4 partes coloridas", "Círculo com 1 de 4 partes coloridas", "Triângulo com 2 de 3 partes coloridas", "Quadrado com 1 de 4 partes coloridas"],
          correct: 0,
          visual: "Diferentes formas geométricas com frações"
        }
      )
    }
    
    setQuestions(newQuestions)
  }

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 10)
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setGameCompleted(true)
        onScoreUpdate(score + (answerIndex === questions[currentQuestion].correct ? 10 : 0))
      }
    }, 2000)
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameCompleted(false)
    generateQuestions()
  }

  const getGameTitle = () => {
    switch(gameType) {
      case 'pizza': return 'Pizza das Frações'
      case 'bars': return 'Barras Coloridas'
      case 'shapes': return 'Formas Geométricas'
      default: return 'Jogo de Frações'
    }
  }

  const getGameEmoji = () => {
    switch(gameType) {
      case 'pizza': return '🍕'
      case 'bars': return '📊'
      case 'shapes': return '🔷'
      default: return '🎮'
    }
  }

  if (gameCompleted) {
    const finalScore = score
    const percentage = (finalScore / (questions.length * 10)) * 100
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-2 border-green-300 shadow-xl">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <CardTitle className="text-3xl text-green-600">Parabéns!</CardTitle>
              <CardDescription className="text-lg">Você completou o {getGameTitle()}!</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-green-100 rounded-lg p-6">
                <div className="text-4xl font-bold text-green-600 mb-2">{finalScore} pontos</div>
                <div className="text-lg text-green-700">{percentage.toFixed(0)}% de acertos</div>
                <Progress value={percentage} className="mt-4 h-4" />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {percentage >= 90 && <Badge className="bg-yellow-500"><Trophy className="w-4 h-4 mr-1" />Excelente!</Badge>}
                {percentage >= 70 && <Badge className="bg-blue-500"><Star className="w-4 h-4 mr-1" />Muito Bom!</Badge>}
                {percentage >= 50 && <Badge className="bg-green-500"><CheckCircle className="w-4 h-4 mr-1" />Bom Trabalho!</Badge>}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetGame} className="bg-blue-500 hover:bg-blue-600">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Jogar Novamente
                </Button>
                <Button onClick={onBack} variant="outline">
                  <Home className="mr-2 h-4 w-4" />
                  Voltar ao Menu
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header do Jogo */}
        <div className="flex justify-between items-center mb-6">
          <Button onClick={onBack} variant="outline">
            <Home className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">{score} pontos</span>
            </div>
          </div>
        </div>

        {/* Progresso */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Pergunta {currentQuestion + 1} de {questions.length}</span>
              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        {/* Pergunta */}
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <span className="text-2xl">{getGameEmoji()}</span>
              {getGameTitle()}
            </CardTitle>
            <CardDescription className="text-base italic bg-blue-50 p-3 rounded">
              {currentQ.visual}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-6">{currentQ.question}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  variant="outline"
                  className={`h-auto p-4 text-left justify-start ${
                    showResult
                      ? index === currentQ.correct
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : index === selectedAnswer
                        ? 'bg-red-100 border-red-500 text-red-700'
                        : 'opacity-50'
                      : 'hover:bg-blue-50 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                      showResult && index === currentQ.correct
                        ? 'bg-green-500 border-green-500 text-white'
                        : showResult && index === selectedAnswer
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'border-gray-300'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{option}</span>
                    {showResult && index === currentQ.correct && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {showResult && index === selectedAnswer && index !== currentQ.correct && <XCircle className="h-5 w-5 text-red-500" />}
                  </div>
                </Button>
              ))}
            </div>

            {showResult && (
              <div className={`mt-6 p-4 rounded-lg ${
                selectedAnswer === currentQ.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {selectedAnswer === currentQ.correct ? (
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Correto! Você ganhou 10 pontos!
                  </div>
                ) : (
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 mr-2" />
                    Ops! A resposta correta era: {currentQ.options[currentQ.correct]}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FractionGame

