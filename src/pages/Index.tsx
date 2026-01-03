import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "Вам пришло письмо от 'банка' с просьбой срочно подтвердить данные карты. Что делать?",
      answers: [
        "Перейти по ссылке и ввести данные",
        "Позвонить в банк по официальному номеру для проверки",
        "Проигнорировать письмо",
        "Ответить на письмо с вопросами"
      ],
      correct: 1
    },
    {
      question: "Какой из этих URL является подозрительным для входа ВКонтакте?",
      answers: [
        "https://vk.com",
        "https://vk-login.com",
        "https://m.vk.com",
        "https://id.vk.com"
      ],
      correct: 1
    },
    {
      question: "В Steam вам пишет 'друг' со ссылкой на турнир. Что сделать?",
      answers: [
        "Сразу перейти по ссылке",
        "Проверить профиль друга и спросить голосом",
        "Ввести данные для регистрации",
        "Поделиться ссылкой с другими"
      ],
      correct: 1
    },
    {
      question: "Признак фишингового сайта:",
      answers: [
        "HTTPS и замок в адресной строке",
        "Профессиональный дизайн",
        "Опечатки в URL и срочные требования",
        "Наличие контактов поддержки"
      ],
      correct: 2
    },
    {
      question: "В Telegram канале обещают удвоить криптовалюту. Ваши действия?",
      answers: [
        "Перевести деньги для проверки",
        "Распознать мошенническую схему и игнорировать",
        "Рассказать друзьям о возможности заработка",
        "Запросить гарантии у администратора"
      ],
      correct: 1
    },
    {
      question: "Какой признак НЕ указывает на фишинг?",
      answers: [
        "Просьба ввести пароль по email",
        "Подозрительный адрес отправителя",
        "Двухфакторная аутентификация на сайте",
        "Срочные требования действий"
      ],
      correct: 2
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.filter((answer, index) => answer === questions[index].correct).length;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const getResultMessage = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { text: "Отлично! Вы эксперт по кибербезопасности!", icon: "Trophy", color: "text-accent" };
    if (percentage >= 70) return { text: "Хорошо! Вы знаете основы защиты от фишинга.", icon: "CheckCircle", color: "text-primary" };
    if (percentage >= 50) return { text: "Неплохо, но есть что улучшить.", icon: "AlertCircle", color: "text-yellow-500" };
    return { text: "Рекомендуем изучить материалы сайта внимательнее.", icon: "XCircle", color: "text-destructive" };
  };

  if (showResults) {
    const score = calculateScore();
    const result = getResultMessage(score);
    
    return (
      <Card className="border-2 border-primary">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Icon name={result.icon as any} className={result.color} size={64} />
          </div>
          <CardTitle className="text-3xl">Результаты теста</CardTitle>
          <CardDescription className="text-xl mt-2">
            Правильных ответов: {score} из {questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-lg font-semibold mb-4">{result.text}</p>
            <div className="w-full bg-muted rounded-full h-4 mb-6">
              <div 
                className="bg-primary h-4 rounded-full transition-all duration-1000" 
                style={{ width: `${(score / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Разбор ответов:</h3>
            {questions.map((q, index) => (
              <div key={index} className={`p-4 rounded-lg ${selectedAnswers[index] === q.correct ? 'bg-accent/10 border-2 border-accent' : 'bg-destructive/10 border-2 border-destructive'}`}>
                <p className="font-semibold mb-2">Вопрос {index + 1}: {q.question}</p>
                <p className="text-sm">
                  <span className={selectedAnswers[index] === q.correct ? 'text-accent' : 'text-destructive'}>
                    Ваш ответ: {q.answers[selectedAnswers[index]]}
                  </span>
                </p>
                {selectedAnswers[index] !== q.correct && (
                  <p className="text-sm text-accent mt-1">
                    Правильный ответ: {q.answers[q.correct]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <Button onClick={resetQuiz} className="w-full" size="lg">
            <Icon name="RotateCcw" size={20} className="mr-2" />
            Пройти тест заново
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-primary">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline">Вопрос {currentQuestion + 1} из {questions.length}</Badge>
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-2 rounded-full ${index === currentQuestion ? 'bg-primary' : index < currentQuestion ? 'bg-accent' : 'bg-muted'}`}
              />
            ))}
          </div>
        </div>
        <CardTitle className="text-2xl">{questions[currentQuestion].question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {questions[currentQuestion].answers.map((answer, index) => (
          <Button
            key={index}
            variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
            className="w-full justify-start text-left h-auto py-4 px-6"
            onClick={() => handleAnswer(index)}
          >
            <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
            {answer}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 relative overflow-hidden">
      <div className="fixed left-0 top-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="fixed right-0 top-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2" />
      <div className="fixed left-0 bottom-1/4 w-80 h-80 bg-destructive/5 rounded-full blur-3xl -translate-x-1/3" />
      <div className="relative z-10">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Shield" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-foreground">Безопасность в Сети</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#definition" className="text-muted-foreground hover:text-primary transition-colors">Что такое фишинг?</a>
              <a href="#examples" className="text-muted-foreground hover:text-primary transition-colors">Примеры</a>
              <a href="#tips" className="text-muted-foreground hover:text-primary transition-colors">Советы</a>
              <a href="#quiz" className="text-muted-foreground hover:text-primary transition-colors">Тест</a>
              <a href="#resources" className="text-muted-foreground hover:text-primary transition-colors">Ресурсы</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge className="mb-4" variant="outline">
            <Icon name="AlertTriangle" size={16} className="mr-2" />
            Цифровая грамотность
          </Badge>
          <h2 className="text-5xl font-bold text-foreground leading-tight">
            Защитите себя от мошенников в интернете
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Узнайте, как распознать фишинг, избежать обмана и обезопасить свои данные в цифровом мире
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button size="lg" className="gap-2">
              <Icon name="ArrowDown" size={20} />
              Начать обучение
            </Button>
          </div>
        </div>
      </section>

      <section id="definition" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Что такое фишинг?</h2>
            <p className="text-lg text-muted-foreground">Базовые понятия и определения</p>
          </div>

          <Card className="mb-8 border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <Icon name="Fish" className="text-destructive" size={28} />
                </div>
                <CardTitle className="text-2xl">Фишинг</CardTitle>
              </div>
              <CardDescription className="text-base">
                Вид интернет-мошенничества, целью которого является получение доступа к конфиденциальным данным пользователей
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/80">
                Фишинг (от англ. "fishing" — рыбалка) — это метод обмана, при котором злоумышленники выдают себя за доверенные организации или людей, чтобы украсть ваши личные данные, пароли, данные банковских карт или другую конфиденциальную информацию.
              </p>
              <Separator />
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <Icon name="Mail" className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Email-фишинг</h4>
                    <p className="text-sm text-muted-foreground">Поддельные письма от "банков" и сервисов</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon name="Link" className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Фишинговые ссылки</h4>
                    <p className="text-sm text-muted-foreground">Ссылки на поддельные сайты</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon name="MessageSquare" className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">SMS-фишинг</h4>
                    <p className="text-sm text-muted-foreground">Мошеннические СМС-сообщения</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon name="Phone" className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Голосовой фишинг</h4>
                    <p className="text-sm text-muted-foreground">Звонки от "сотрудников банка"</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="examples" className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Примеры фишинговых атак</h2>
              <p className="text-lg text-muted-foreground">Реальные схемы мошенничества</p>
            </div>

            <Tabs defaultValue="links" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="links">Поддельные ссылки</TabsTrigger>
                <TabsTrigger value="sites">Сайты</TabsTrigger>
                <TabsTrigger value="steam">Steam</TabsTrigger>
                <TabsTrigger value="vk">VK паблики</TabsTrigger>
                <TabsTrigger value="telegram">Telegram</TabsTrigger>
              </TabsList>

              <TabsContent value="links" className="space-y-6">
                <Card className="border-l-4 border-l-destructive">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/10 rounded">
                      <Icon name="Link" className="text-destructive" size={24} />
                    </div>
                    <CardTitle>Поддельные ссылки</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80">
                    Мошенники создают ссылки, которые выглядят похожими на официальные сайты, но содержат небольшие изменения в адресе:
                  </p>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="Check" className="text-accent" size={16} />
                      <code className="text-sm">https://vk.com</code>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent">Настоящий</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="X" className="text-destructive" size={16} />
                      <code className="text-sm">https://vk-com.ru</code>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">Фишинг</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="X" className="text-destructive" size={16} />
                      <code className="text-sm">https://vkontakte-login.com</code>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">Фишинг</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </TabsContent>

              <TabsContent value="sites" className="space-y-6">
                <Card className="border-l-4 border-l-destructive">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-destructive/10 rounded">
                        <Icon name="Globe" className="text-destructive" size={24} />
                      </div>
                      <CardTitle>Поддельные сайты</CardTitle>
                    </div>
                  </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80">
                    Копии известных сайтов, которые внешне не отличить от оригинала. Цель — украсть ваш логин и пароль при попытке входа.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-accent/10 p-4 rounded-lg border-2 border-accent">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="ShieldCheck" className="text-accent" size={20} />
                        <span className="font-semibold">Настоящий сайт</span>
                      </div>
                      <ul className="text-sm space-y-1 text-foreground/70">
                        <li>✓ HTTPS и замок в адресной строке</li>
                        <li>✓ Правильное доменное имя</li>
                        <li>✓ Актуальный SSL-сертификат</li>
                        <li>✓ Официальный дизайн</li>
                      </ul>
                    </div>
                    <div className="bg-destructive/10 p-4 rounded-lg border-2 border-destructive">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="ShieldAlert" className="text-destructive" size={20} />
                        <span className="font-semibold">Фишинговый сайт</span>
                      </div>
                      <ul className="text-sm space-y-1 text-foreground/70">
                        <li>✗ Подозрительный URL</li>
                        <li>✗ Ошибки в тексте</li>
                        <li>✗ Просьба ввести данные карты</li>
                        <li>✗ Срочные требования действий</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </TabsContent>

              <TabsContent value="steam" className="space-y-6">
                <Card className="border-l-4 border-l-destructive">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-destructive/10 rounded">
                        <Icon name="Gamepad2" className="text-destructive" size={24} />
                      </div>
                      <CardTitle>Мошенничество в Steam</CardTitle>
                    </div>
                  </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80">
                    Игровая платформа Steam — частая мишень для мошенников. Популярные схемы обмана:
                  </p>
                  <div className="space-y-3">
                    <div className="flex gap-3 p-3 bg-muted rounded-lg">
                      <Icon name="Gift" className="text-primary mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold mb-1">Поддельные раздачи</h4>
                        <p className="text-sm text-muted-foreground">Обещают бесплатные игры или скины за переход по ссылке и ввод данных аккаунта</p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-3 bg-muted rounded-lg">
                      <Icon name="Users" className="text-primary mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold mb-1">Фальшивые друзья</h4>
                        <p className="text-sm text-muted-foreground">Боты добавляются в друзья и присылают ссылки на "турниры" или "торговлю"</p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-3 bg-muted rounded-lg">
                      <Icon name="ShoppingCart" className="text-primary mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold mb-1">Поддельный маркетплейс</h4>
                        <p className="text-sm text-muted-foreground">Копии торговой площадки Steam для кражи предметов инвентаря</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </TabsContent>

              <TabsContent value="vk" className="space-y-6">
                <Card className="border-l-4 border-l-destructive">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-destructive/10 rounded">
                        <Icon name="MessageCircle" className="text-destructive" size={24} />
                      </div>
                      <CardTitle>Мошенничество в пабликах VK</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground/80">
                      Социальная сеть ВКонтакте полна мошеннических схем в сообществах и пабликах:
                    </p>
                    <div className="space-y-3">
                      <div className="flex gap-3 p-3 bg-muted rounded-lg">
                        <Icon name="DollarSign" className="text-primary mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold mb-1">Фальшивые розыгрыши</h4>
                          <p className="text-sm text-muted-foreground">Паблики-подделки известных брендов проводят "конкурсы" с просьбой перейти по ссылке и ввести данные карты</p>
                        </div>
                      </div>
                      <div className="flex gap-3 p-3 bg-muted rounded-lg">
                        <Icon name="CreditCard" className="text-primary mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold mb-1">Поддельные магазины</h4>
                          <p className="text-sm text-muted-foreground">Сообщества с товарами по заниженным ценам. После оплаты товар не приходит, а деньги исчезают</p>
                        </div>
                      </div>
                      <div className="flex gap-3 p-3 bg-muted rounded-lg">
                        <Icon name="UserPlus" className="text-primary mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold mb-1">Взлом аккаунтов</h4>
                          <p className="text-sm text-muted-foreground">Ссылки на "проверку профиля" или "голосование" ведут на фишинговые страницы для кражи данных</p>
                        </div>
                      </div>
                      <div className="flex gap-3 p-3 bg-muted rounded-lg">
                        <Icon name="TrendingUp" className="text-primary mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold mb-1">Инвестиционные пирамиды</h4>
                          <p className="text-sm text-muted-foreground">Паблики обещают быстрый заработок на крипте или трейдинге. Вложенные деньги пропадают без следа</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="telegram" className="space-y-6">
                <Card className="border-l-4 border-l-destructive">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-destructive/10 rounded">
                        <Icon name="Send" className="text-destructive" size={24} />
                      </div>
                      <CardTitle>Обман в Telegram каналах</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground/80">
                      Telegram — популярная площадка для мошенников. Основные схемы обмана:
                    </p>
                    <div className="space-y-3">
                      <div className="flex gap-3 p-3 bg-muted rounded-lg">
                        <Icon name="Coins" className="text-primary mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold mb-1">Крипто-мошенничество</h4>
                          <p className="text-sm text-muted-foreground">Каналы с "гарантированной прибылью" на криптовалюте. Просят перевести деньги на кошелёк для "инвестиций"</p>
                        </div>
                      </div>
                      <div className="flex gap-3 p-3 bg-muted rounded-lg">
                        <Icon name="Bot" className="text-primary mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold mb-1">Фишинговые боты</h4>
                          <p className="text-sm text-muted-foreground">Боты просят данные карты для "активации" или "верификации". Реальные сервисы так не работают</p>
                        </div>
                      </div>
                      <div className="flex gap-3 p-3 bg-muted rounded-lg">
                        <Icon name="Package" className="text-primary mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold mb-1">Поддельные магазины</h4>
                          <p className="text-sm text-muted-foreground">Каналы продают популярные товары по низким ценам. После оплаты администратор блокирует покупателя</p>
                        </div>
                      </div>
                      <div className="flex gap-3 p-3 bg-muted rounded-lg">
                        <Icon name="Sparkles" className="text-primary mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold mb-1">Поддельные раздачи</h4>
                          <p className="text-sm text-muted-foreground">Каналы от имени известных блогеров раздают призы за репост и переход по ссылке с вводом данных</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section id="tips" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Как защититься от фишинга</h2>
            <p className="text-lg text-muted-foreground">Практические советы по безопасности</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-accent/50 hover:border-accent transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded">
                    <Icon name="Eye" className="text-accent" size={24} />
                  </div>
                  <CardTitle>Проверяйте ссылки</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Наведите курсор на ссылку перед кликом. Проверьте адрес сайта в браузере. Ищите опечатки и странные символы в домене.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/50 hover:border-accent transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded">
                    <Icon name="Lock" className="text-accent" size={24} />
                  </div>
                  <CardTitle>Используйте HTTPS</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Убедитесь, что сайт использует защищённое соединение. Ищите значок замка в адресной строке браузера.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/50 hover:border-accent transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded">
                    <Icon name="Key" className="text-accent" size={24} />
                  </div>
                  <CardTitle>Сложные пароли</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Используйте уникальные пароли для каждого сайта. Включите двухфакторную аутентификацию где возможно.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/50 hover:border-accent transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded">
                    <Icon name="Mail" className="text-accent" size={24} />
                  </div>
                  <CardTitle>Осторожность с письмами</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Не открывайте подозрительные письма. Банки и сервисы не просят пароли по email. Проверяйте адрес отправителя.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/50 hover:border-accent transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded">
                    <Icon name="Download" className="text-accent" size={24} />
                  </div>
                  <CardTitle>Не скачивайте файлы</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Не открывайте вложения от незнакомцев. Проверяйте файлы антивирусом. Будьте осторожны с архивами и исполняемыми файлами.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/50 hover:border-accent transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded">
                    <Icon name="RefreshCw" className="text-accent" size={24} />
                  </div>
                  <CardTitle>Обновляйте ПО</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Устанавливайте обновления браузера и операционной системы. Используйте актуальный антивирус с обновлёнными базами.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 bg-primary/5 border-2 border-primary">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Icon name="Lightbulb" className="text-primary mt-1" size={32} />
                <div>
                  <h3 className="font-bold text-lg mb-2">Золотое правило безопасности</h3>
                  <p className="text-foreground/80">
                    Если что-то кажется подозрительным — скорее всего, так оно и есть. Лучше перепроверить информацию, чем стать жертвой мошенников. 
                    При сомнениях свяжитесь с организацией напрямую через официальный сайт или телефон.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="quiz" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Проверьте свои знания</h2>
            <p className="text-lg text-muted-foreground">Интерактивный тест о фишинге</p>
          </div>

          <QuizSection />
        </div>
      </section>

      <section id="resources" className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Полезные ресурсы</h2>
              <p className="text-lg text-muted-foreground">Инструменты и сервисы для защиты</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Search" size={20} />
                    Проверка ссылок
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="https://www.virustotal.com" target="_blank" rel="noopener noreferrer" className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="font-semibold mb-1">VirusTotal</div>
                    <p className="text-sm text-muted-foreground">Проверка URL и файлов на вирусы</p>
                  </a>
                  <a href="https://www.urlvoid.com" target="_blank" rel="noopener noreferrer" className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="font-semibold mb-1">URLVoid</div>
                    <p className="text-sm text-muted-foreground">Анализ репутации сайтов</p>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Shield" size={20} />
                    Менеджеры паролей
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="https://bitwarden.com" target="_blank" rel="noopener noreferrer" className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="font-semibold mb-1">Bitwarden</div>
                    <p className="text-sm text-muted-foreground">Бесплатный менеджер паролей</p>
                  </a>
                  <a href="https://1password.com" target="_blank" rel="noopener noreferrer" className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="font-semibold mb-1">1Password</div>
                    <p className="text-sm text-muted-foreground">Защита паролей и данных</p>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Chrome" size={20} />
                    Расширения браузера
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="font-semibold mb-1">uBlock Origin</div>
                    <p className="text-sm text-muted-foreground">Блокировка рекламы и трекеров</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="font-semibold mb-1">HTTPS Everywhere</div>
                    <p className="text-sm text-muted-foreground">Принудительное HTTPS соединение</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BookOpen" size={20} />
                    Обучающие материалы
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="https://www.phishing.org" target="_blank" rel="noopener noreferrer" className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="font-semibold mb-1">Phishing.org</div>
                    <p className="text-sm text-muted-foreground">База знаний о фишинге</p>
                  </a>
                  <a href="https://xakep.ru" target="_blank" rel="noopener noreferrer" className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="font-semibold mb-1">Xakep.ru</div>
                    <p className="text-sm text-muted-foreground">Новости информационной безопасности</p>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Icon name="Shield" size={28} />
              <h3 className="text-2xl font-bold">Безопасность в Сети</h3>
            </div>
            <p className="text-background/80">
              Образовательный проект по повышению цифровой грамотности и защите от интернет-мошенничества
            </p>
            <Separator className="bg-background/20 my-6" />
            <p className="text-sm text-background/60">
              © 2026 Безопасность в Сети. Будьте бдительны и защищены в интернете.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Index;