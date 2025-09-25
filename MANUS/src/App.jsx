import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Star, Trophy, Play, BookOpen, Target, Award } from 'lucide-react'
import FractionGame from './components/FractionGame.jsx'
import './App.css'

// Importando as imagens
import logoIncluiMais from './assets/IncluiMais2.png'
import mainCharacter from './assets/main_character_welcome.png'
import fractionPizza from './assets/fraction_pizza.png'
import fractionBars from './assets/fraction_bars.png'
import fractionShapes from './assets/fraction_shapes.png'

function App() {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [points, setPoints] = useState(150)
  const [progress, setProgress] = useState(35)
  const [activeGame, setActiveGame] = useState(null)

  const games = [
    {
      id: 1,
      type: "pizza",
      title: "Pizza das Frações",
      description: "Divida pizzas em fatias iguais e aprenda sobre frações!",
      image: fractionPizza,
      difficulty: "Fácil",
      points: 50,
      unlocked: true
    },
    {
      id: 2,
      type: "bars",
      title: "Barras Coloridas",
      description: "Compare frações usando barras coloridas interativas.",
      image: fractionBars,
      difficulty: "Médio",
      points: 75,
      unlocked: true
    },
    {
      id: 3,
      type: "shapes",
      title: "Formas Geométricas",
      description: "Explore frações com círculos, quadrados e triângulos.",
      image: fractionShapes,
      difficulty: "Médio",
      points: 100,
      unlocked: currentLevel >= 2
    }
  ]

  const achievements = [
    { name: "Primeiro Passo", icon: Star, earned: true },
    { name: "Explorador", icon: Target, earned: true },
    { name: "Mestre das Pizzas", icon: Trophy, earned: false },
    { name: "Campeão", icon: Award, earned: false }
  ]

  const handleGameStart = (gameType) => {
    setActiveGame(gameType)
  }

  const handleGameEnd = () => {
    setActiveGame(null)
  }

  const handleScoreUpdate = (newPoints) => {
    setPoints(points + newPoints)
    // Atualizar progresso baseado nos pontos
    const newProgress = Math.min(100, progress + (newPoints / 10))
    setProgress(newProgress)
    
    // Verificar se deve subir de nível
    if (newProgress >= 70 && currentLevel === 1) {
      setCurrentLevel(2)
    }
  }

  // Se um jogo está ativo, mostrar o componente do jogo
  if (activeGame) {
    return (
      <FractionGame 
        gameType={activeGame} 
        onBack={handleGameEnd}
        onScoreUpdate={handleScoreUpdate}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-orange-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={logoIncluiMais} alt="IncluiMais" className="h-12 w-auto" />
              <h1 className="text-2xl font-bold text-gray-800">Frações Divertidas</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-gray-700">{points} pontos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-purple-500" />
                <span className="font-semibold text-gray-700">Nível {currentLevel}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Aprenda Frações de Forma 
                <span className="text-orange-500"> Divertida!</span>
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Junte-se ao nosso amigo e descubra o mundo das frações através de jogos interativos e atividades empolgantes!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Play className="mr-2 h-5 w-5" />
                  Começar a Jogar
                </Button>
                <Button size="lg" variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Como Funciona
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img 
                src={mainCharacter} 
                alt="Personagem IncluiMais" 
                className="w-80 h-80 object-contain animate-bounce-slow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-8 bg-white/50">
        <div className="container mx-auto px-4">
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-blue-500" />
                Seu Progresso
              </CardTitle>
              <CardDescription>Continue aprendendo para desbloquear novos jogos!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Progresso Geral</span>
                    <span className="text-sm text-gray-500">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {achievements.map((achievement, index) => (
                    <Badge 
                      key={index}
                      variant={achievement.earned ? "default" : "secondary"}
                      className={`flex items-center gap-1 ${achievement.earned ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <achievement.icon className="h-3 w-3" />
                      {achievement.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Jogos Disponíveis
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card 
                key={game.id} 
                className={`transition-all duration-300 hover:shadow-xl ${
                  game.unlocked 
                    ? 'border-2 border-green-200 hover:border-green-300 cursor-pointer' 
                    : 'border-2 border-gray-200 opacity-60'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="relative">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {!game.unlocked && (
                      <div className="absolute inset-0 bg-gray-500/50 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold">🔒 Bloqueado</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg">{game.title}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className={
                      game.difficulty === 'Fácil' ? 'border-green-300 text-green-600' :
                      game.difficulty === 'Médio' ? 'border-yellow-300 text-yellow-600' :
                      'border-red-300 text-red-600'
                    }>
                      {game.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{game.points} pts</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    disabled={!game.unlocked}
                    variant={game.unlocked ? "default" : "secondary"}
                    onClick={() => game.unlocked && handleGameStart(game.type)}
                  >
                    {game.unlocked ? (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Jogar Agora
                      </>
                    ) : (
                      <>
                        🔒 Desbloqueie no Nível {game.id + 1}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img src={logoIncluiMais} alt="IncluiMais" className="h-8 w-auto" />
              <span className="text-lg font-semibold">IncluiMais+</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-300">Aprendizagem gamificada para todos</p>
              <p className="text-sm text-gray-400">© 2024 IncluiMais. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

