import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import './../App.css'; // Import App.css for global styles

interface Question {
  questionText: string;
  answerOptions: { answerText: string; isCorrect: boolean }[];
  curiosity: string;
  imageUrl: string;
}

interface UserAnswer {
  questionIndex: number;
  isCorrect: boolean;
  selectedAnswerText: string;
}

const questions: Question[] = [
  {
    questionText: 'Qual é o maior animal do mundo?',
    answerOptions: [
      { answerText: 'Tubarão-branco', isCorrect: false },
      { answerText: 'Baleia-azul', isCorrect: true },
      { answerText: 'Lula-gigante', isCorrect: false },
      { answerText: 'Golfinho', isCorrect: false },
    ],
    curiosity: 'A baleia-azul não é apenas o maior animal da Terra, mas também o mais barulhento, com chamadas que atingem até 188 decibéis.',
    imageUrl: 'https://www.nationalgeographic.com/content/dam/animals/pictures/mammals/b/blue-whale/blue-whale-01.jpg',
  },
  {
    questionText: 'Qual animal aquático é conhecido por construir "jardins" no fundo do mar?',
    answerOptions: [
      { answerText: 'Peixe-palhaço', isCorrect: false },
      { answerText: 'Polvo', isCorrect: false },
      { answerText: 'Baiacu', isCorrect: false },
      { answerText: 'Peixe-jardineiro', isCorrect: true },
    ],
    curiosity: 'O baiacu-jardineiro macho cria intrincados padrões geométricos na areia para atrair uma parceira.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Pufferfish_nest_Japan.jpg/1200px-Pufferfish_nest_Japan.jpg',
  },
  {
    questionText: 'Qual destes não é um mamífero marinho?',
    answerOptions: [
      { answerText: 'Foca', isCorrect: false },
      { answerText: 'Pinguim', isCorrect: true },
      { answerText: 'Orca', isCorrect: false },
      { answerText: 'Peixe-boi', isCorrect: false },
    ],
    curiosity: 'Pinguins são aves marinhas que não voam, adaptadas para a vida aquática, mas não são mamíferos.',
    imageUrl: 'https://www.nationalgeographic.com/content/dam/animals/pictures/birds/e/emperor-penguin/emperor-penguin-01.jpg',
  },
  {
    questionText: 'Qual é o habitat natural do cavalo-marinho?',
    answerOptions: [
      { answerText: 'Rios de água doce', isCorrect: false },
      { answerText: 'Lagos de montanha', isCorrect: false },
      { answerText: 'Recifes de coral e leitos de ervas marinhas', isCorrect: true },
      { answerText: 'Desertos', isCorrect: false },
    ],
    curiosity: 'Cavalos-marinhos são os únicos peixes onde o macho carrega os ovos em uma bolsa incubadora.',
    imageUrl: 'https://www.nationalgeographic.com/content/dam/animals/pictures/fish/s/seahorse/seahorse-01.jpg',
  },
  {
    questionText: 'Qual animal marinho é famoso por sua capacidade de camuflagem?',
    answerOptions: [
      { answerText: 'Estrela-do-mar', isCorrect: false },
      { answerText: 'Caranguejo', isCorrect: false },
      { answerText: 'Polvo', isCorrect: true },
      { answerText: 'Água-viva', isCorrect: false },
    ],
    curiosity: 'Polvos podem mudar a cor e a textura de sua pele em segundos para se misturar ao ambiente, seja para caçar ou se esconder de predadores.',
    imageUrl: 'https://www.nationalgeographic.com/content/dam/animals/pictures/invertebrates/o/octopus/octopus-01.jpg',
  },
  {
    questionText: 'Qual peixe é conhecido por ter um "nariz" longo e pontudo?',
    answerOptions: [
      { answerText: 'Atum', isCorrect: false },
      { answerText: 'Peixe-espada', isCorrect: true },
      { answerText: 'Salmão', isCorrect: false },
      { answerText: 'Bacalhau', isCorrect: false },
    ],
    curiosity: 'O peixe-espada usa seu "nariz" para cortar e atordoar suas presas, facilitando a caça.',
    imageUrl: 'https://www.nationalgeographic.com/content/dam/animals/pictures/fish/s/swordfish/swordfish-01.jpg',
  },
  {
    questionText: 'Qual é o nome do maior recife de coral do mundo?',
    answerOptions: [
      { answerText: 'Recife Mesoamericano', isCorrect: false },
      { answerText: 'Recife de Coral do Mar Vermelho', isCorrect: false },
      { answerText: 'Grande Barreira de Coral', isCorrect: true },
      { answerText: 'Recife de Coral da Flórida', isCorrect: false },
    ],
    curiosity: 'A Grande Barreira de Coral é tão grande que pode ser vista do espaço e é composta por bilhões de pequenos organismos chamados pólipos de coral.',
    imageUrl: 'https://www.nationalgeographic.com/content/dam/travel/photos/000/900/900/900/great-barrier-reef-australia.jpg',
  },
  {
    questionText: 'Qual animal marinho tem três corações?',
    answerOptions: [
      { answerText: 'Lula', isCorrect: false },
      { answerText: 'Polvo', isCorrect: true },
      { answerText: 'Caranguejo', isCorrect: false },
      { answerText: 'Estrela-do-mar', isCorrect: false },
    ],
    curiosity: 'O polvo tem dois corações que bombeiam sangue para as brânquias e um terceiro que o circula para o resto do corpo.',
    imageUrl: 'https://www.nationalgeographic.com/content/dam/animals/pictures/invertebrates/o/octopus/octopus-01.jpg',
  },
  {
    questionText: 'Qual é a principal fonte de alimento para as baleias-azuis?',
    answerOptions: [
      { answerText: 'Pequenos peixes', isCorrect: false },
      { answerText: 'Algas', isCorrect: false },
      { answerText: 'Krill', isCorrect: true },
      { answerText: 'Focas', isCorrect: false },
    ],
    curiosity: 'Apesar de seu tamanho gigantesco, as baleias-azuis se alimentam quase exclusivamente de pequenos crustáceos chamados krill, filtrando toneladas deles por dia.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Krill_swarm.jpg/1200px-Krill_swarm.jpg',
  },
  {
    questionText: 'Qual animal marinho é conhecido por sua picada dolorosa e tentáculos longos?',
    answerOptions: [
      { answerText: 'Água-viva', isCorrect: true },
      { answerText: 'Anêmona-do-mar', isCorrect: false },
      { answerText: 'Concha', isCorrect: false },
      { answerText: 'Pepino-do-mar', isCorrect: false },
    ],
    curiosity: 'Algumas águas-vivas, como a caravela-portuguesa, não são uma única criatura, mas uma colônia de organismos chamados zooides.',
    imageUrl: 'https://www.nationalgeographic.com/content/dam/animals/pictures/invertebrates/j/jellyfish/jellyfish-01.jpg',
  },
  {
    questionText: 'Qual é o nome do peixe que pode gerar eletricidade?',
    answerOptions: [
      { answerText: 'Enguia elétrica', isCorrect: true },
      { answerText: 'Peixe-gato', isCorrect: false },
      { answerText: 'Atum', isCorrect: false },
      { answerText: 'Dourado', isCorrect: false },
    ],
    curiosity: 'A enguia elétrica pode gerar choques de até 600 volts, o suficiente para atordoar presas e predadores.',
    imageUrl: 'https://www.nationalgeographic.com/content/dam/animals/pictures/fish/e/electric-eel/electric-eel-01.jpg',
  },
  {
    questionText: 'Qual animal marinho é conhecido por sua concha em espiral e por ser um "fóssil vivo"?',
    answerOptions: [
      { answerText: 'Caracol marinho', isCorrect: false },
      { answerText: 'Amêijoa', isCorrect: false },
      { answerText: 'Náutilo', isCorrect: true },
      { answerText: 'Ostra', isCorrect: false },
    ],
    curiosity: 'O náutilo existe há milhões de anos, com poucas mudanças em sua forma, o que o torna um dos mais antigos habitantes do oceano.',
    imageUrl: 'https://www.nationalgeographic.com/content/dam/animals/pictures/invertebrates/n/nautilus/nautilus-01.jpg',
  },
  {
    questionText: 'Qual é o nome do peixe que vive em simbiose com anêmonas-do-mar?',
    answerOptions: [
      { answerText: 'Peixe-leão', isCorrect: false },
      { answerText: 'Peixe-palhaço', isCorrect: true },
      { answerText: 'Peixe-pedra', isCorrect: false },
      { answerText: 'Peixe-lua', isCorrect: false },
    ],
    curiosity: 'O peixe-palhaço é imune ao veneno da anêmona e usa-a como abrigo, enquanto a anêmona se beneficia dos restos de comida do peixe.',
    imageUrl: 'https://www.nationalgeographic.com/content/dam/animals/pictures/fish/c/clownfish/clownfish-01.jpg',
  },
  {
    questionText: 'Qual animal marinho é o mais rápido do oceano?',
    answerOptions: [
      { answerText: 'Tubarão-mako', isCorrect: false },
      { answerText: 'Golfinho', isCorrect: false },
      { answerText: 'Peixe-vela', isCorrect: true },
      { answerText: 'Atum', isCorrect: false },
    ],
    curiosity: 'O peixe-vela pode atingir velocidades de até 110 km/h, tornando-o o peixe mais rápido conhecido.',
    imageUrl: 'https://www.nationalgeographic.com/content/dam/animals/pictures/fish/s/sailfish/sailfish-01.jpg',
  },
  {
    questionText: 'Qual é o nome do maior tubarão não predador, que se alimenta por filtração?',
    answerOptions: [
      { answerText: 'Tubarão-branco', isCorrect: false },
      { answerText: 'Tubarão-martelo', isCorrect: false },
      { answerText: 'Tubarão-baleia', isCorrect: true },
      { answerText: 'Tubarão-tigre', isCorrect: false },
    ],
    curiosity: 'O tubarão-baleia é o maior peixe do mundo e, apesar de seu tamanho imponente, é um gigante gentil que se alimenta de plâncton e pequenos peixes.',
    imageUrl: 'https://www.nationalgeographic.com/content/dam/animals/pictures/fish/w/whale-shark/whale-shark-01.jpg',
  },
];

const correctSound = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
const incorrectSound = new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3');
const triumphantMusic = new Audio('https://www.soundjay.com/misc/sounds/tada-1.mp3');

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [selectedAnswerCorrectness, setSelectedAnswerCorrectness] = useState<boolean | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleAnswerOptionClick = (isCorrect: boolean, selectedAnswerText: string) => {
    if (isAnswerSelected) return; // Prevent multiple selections

    setIsAnswerSelected(true);
    setSelectedAnswerCorrectness(isCorrect);

    const newUserAnswer: UserAnswer = {
      questionIndex: currentQuestion,
      isCorrect: isCorrect,
      selectedAnswerText: selectedAnswerText,
    };
    setUserAnswers((prev) => [...prev, newUserAnswer]);

    if (isCorrect) {
      setScore(score + 1);
      setFeedbackMessage('Correto! ' + questions[currentQuestion].curiosity);
      correctSound.play();
    } else {
      setFeedbackMessage('Errado!');
      incorrectSound.play();
    }
    setShowNextButton(true);
  };

  const handleNextQuestionClick = () => {
    setFeedbackMessage(null);
    setIsAnswerSelected(false);
    setSelectedAnswerCorrectness(null);
    setShowNextButton(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      if (score > 1) {
        triumphantMusic.play();
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setFeedbackMessage(null);
    setIsAnswerSelected(false);
    setSelectedAnswerCorrectness(null);
    setUserAnswers([]);
    setShowNextButton(false);
    triumphantMusic.pause();
    triumphantMusic.currentTime = 0;
  };

  return (
    <Container className="quiz-container d-flex align-items-center justify-content-center min-vh-100">
      <Row>
        <Col>
          <Card className="quiz-card p-4 shadow-lg">
            {showScore ? (
              <div className="score-section text-center">
                <h2>Você acertou {score} de {questions.length} perguntas!</h2>
                <Button variant="primary" onClick={restartQuiz} className="mt-3">
                  Reiniciar Quiz
                </Button>
                <div className="mt-4 text-start">
                  <h3>Resumo do Quiz:</h3>
                  {userAnswers.map((answer, index) => (
                    <Alert key={index} variant={answer.isCorrect ? 'success' : 'danger'} className="mb-2">
                      <strong>Pergunta {answer.questionIndex + 1}:</strong> {questions[answer.questionIndex].questionText}<br/>
                      Sua resposta: {answer.selectedAnswerText} - {answer.isCorrect ? 'Correta' : 'Errada'}
                    </Alert>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="question-section">
                  <div className="question-count">
                    <span>Pergunta {currentQuestion + 1}</span>/{questions.length}
                  </div>
                  <div className="question-image mt-3 mb-3 text-center">
                    <img src={questions[currentQuestion].imageUrl} alt="Imagem da pergunta" style={{ maxHeight: '250px', objectFit: 'cover', maxWidth: '100%', borderRadius: '0.25rem' }} />
                  </div>
                  <div className="question-text mt-3">
                    <h3>{questions[currentQuestion].questionText}</h3>
                  </div>
                  {feedbackMessage && (
                    <Alert variant={selectedAnswerCorrectness ? 'success' : 'danger'} className="mt-3">
                      {feedbackMessage}
                    </Alert>
                  )}
                </div>
                <div className="answer-section mt-4">
                  {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                    <Button
                      variant={
                        isAnswerSelected && answerOption.isCorrect
                          ? 'success'
                          : isAnswerSelected && !answerOption.isCorrect && selectedAnswerCorrectness === false
                          ? 'danger'
                          : 'outline-info'
                      }
                      key={index}
                      onClick={() => handleAnswerOptionClick(answerOption.isCorrect, answerOption.answerText)}
                      className="d-block w-100 mb-2 py-2"
                      disabled={isAnswerSelected}
                    >
                      {answerOption.answerText}
                    </Button>
                  ))}
                  {showNextButton && (
                    <Button variant="primary" onClick={handleNextQuestionClick} className="d-block w-100 mt-3 py-2">
                      Próxima Pergunta
                    </Button>
                  )}
                </div>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Quiz;