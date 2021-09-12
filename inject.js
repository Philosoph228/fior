class Bot {
  constructor() {
    this.writingMutex = false;
    this.desiredAnswer = 993;
    this.unrelatedCounter = 0;
    this.insulted = false;
    this.swearCautionedTimes = 0;
    this.praiseCounter = 0;

    this.praises = [
      "Ты молодец!",
      "Ты умничка!",
      "Ты самый лучший!",
      "Ты — гений!",
      "Ты мастер на все руки!"
    ];

    this.greetings = [
      "прив",
      "Хай!",
      "Привет!",
      "Здравствуй"
    ];

    this.insultedReplies = [
      "Ты меня обидел.",
      "Я на тебя обижен.",
      "Я обиделся",
      "Проси прощения",
      "Проси прощений"
    ];

    this.noSwearPrays = [
      "Не матерись пожалуйста у меня бабушка в комнате",
      "Пожалуйста не матерись, у меня бабушка в комнате",
      "У меня бабушка в комнате, не матерись пожалуйста!"
    ];

    this.motivationStrings = [
      "У тебя всё получится!",
      "Я в тебя верю",
      "Давай eщё раз?",
      "Не отчаивайся",
      "Я. Жe. Гуль.",
      "Отвечай",
      "Сколько?",
      "Ты умён",
      "Ну?",
      "Мда...",
      "Не тупи",
      "Я умер, прости",
      "Неизвестная команда. Для справки наберите /help",
      "Подготовьте номер паблик стейтик джава точка ланг точка обжектрy точка" +
        " чат фанкшнс точка аэф джава точка ланг точка булеан джава точка ланг" +
        " точка обжект джава точка ланг точка обжект ноль равно равно один"
    ];

    chat.addEventListener(chat.Event.CONNECTED, this.onConnect.bind(this));
    chat.addEventListener(chat.Event.DISCONNECTED, this.resetState.bind(this));
    chat.addEventListener(chat.Event.MESSAGE_RECEIVED, this.onMessageReceived.bind(this));
  }

  getRandomString(arr)
  {
    if (Array.isArray(arr) && arr.length)
    {
      return arr[Math.round(Math.random() * (arr.length - 1))];
    }

    throw 'getRandomString: argument not an array or passed array is empty';
  }

  resetState() {
    this.writingMutex = false;
    this.desiredAnswer = 993;
    this.unrelatedCounter = 0;
    this.insulted = false;
    this.swearCautionedTimes = 0;
    this.praiseCounter = 0;

    clearTimeout(this.greetingTimerHandle);
    this.greetingTimerHandle = null;

    clearTimeout(this.writingTimerHandle);
    this.writingTimerHandle = null;
  }

  writeMessageSimulated(message, callback = null)
  {
    this.writingMutex = true;
    clearTimeout(this.writingTimerHandle);

    this.writingTimerHandle = setTimeout(() => {
      chat.setStartedTyping();

      this.writingTimerHandle = setTimeout(() => {
        chat.setFinishedTyping();
        chat.sendMessage(message);

        this.writingMutex = false;

        if (typeof(callback) == "function")
        {
          callback();
        }

      }, 250 * message.length + Math.random() * (250 * message.length));
    }, 3000 + Math.random() * 3000);
  }

  askEquationSimulated()
  {
    this.writeMessageSimulated((this.desiredAnswer + 7) + "-7?", null);
  }

  onConnect()
  {
    this.resetState();

    this.greetingTimerHandle = setTimeout(() => {
      this.writeMessageSimulated(this.getRandomString(this.greetings),
      () => {
        this.askEquationSimulated();
      });
    }, 5000);
  }

  onMessageReceived(type, content) {
    clearTimeout(this.greetingTimerHandle);

    if (type != chat.MessageType.TEXT) {
      return;
    }

    if (this.insulted && content.match(/про(cти|щен)|извин/g) != null)
    {
      this.insulted = false;
      this.writeMessageSimulated("Ладно. Прощаю.", () => {
          this.askEquationSimulated();
      });
      return;
    }

    if (this.insulted) {
      if (Math.random() <= 0.5)
      {
        this.writeMessageSimulated(this.getRandomString(this.insultedReplies));
      }

      return;
    }

    if (content.match(/еб|бля|ху[йе]|су(ч)?к/g) != null)
    {

      if (this.swearCautionedTimes++ == 1)
      {
        this.writeMessageSimulated("Ну я же попросил не материться");
        return;
      }

      if (this.swearCautionedTimes++ >= 2)
      {
        this.writeMessageSimulated(this.getRandomString(this.insultedReplies));
        this.insulted = true;
        return;
      }

      this.writeMessageSimulated(
          this.getRandomString(this.noSwearPrays),
          () => {
            this.askEquationSimulated();
          }
      );
      return;
    }

    if (content == "/gawr")
    {
      this.writeMessageSimulated(
          "А",
          () => {
            this.askEquationSimulated(); 
          }
      );

      return;
    }

    if (content == "/praise")
    {
      if (this.praiseCounter++ <= 2)
      {
        // Praise a mate
        this.writeMessageSimulated(
            this.getRandomString(this.praises),
            () => {
              this.askEquationSimulated();
            }
        );
      }
      else {
        this.praiseCounter = 0;
        this.writeMessageSimulated(
          "Сам себя не похвалишь — никто не похвалит!",
          () => {
            this.askEquationSimulated(); 
          });
      }

      return;
    }


    if (content == "/sources")
    {
      this.writeMessageSimulated(
          "Репозиторий исходного кода на GitHub:\n" +
          "https://github.com/Philsoph228/fior\n" +
          "***\n" +
          "Буду признателен за Ваш вклад в улучшение проекта ❤\n"
      );
      return;
    }

    if (content == "/help")
    {
      this.writeMessageSimulated("Чат-бот \"Токийский Гуль\".\n" +
          "Версия: FIOR210912\n" +
          "***\n" +
          "Список команд:\n" +
          "/help — Вызов справки\n" +
          "/gawr — Акула Гура\n" +
          "/praise — Зачитать похвалу\n" +
          "/sources — Исходный код"
      );
      return;
    }

    if (content.match(/(бот|код|[з|c]даюсь|это\?|устал|хватит)/g) != null
        || content[0] == '/')
    {
      this.writeMessageSimulated("Неизвестная команда. Для справки наберите /help");
      return;
    }

    let answer;
    let matches = content.match(/-?\d+/g);
    if (matches != null)
    {
      let answer = parseInt(matches[0]);
      let isRightAnswer = (answer == this.desiredAnswer);

      if (isRightAnswer)
      {
        this.desiredAnswer -= 7;
      }
      else
      {
        /* Пока бот эмулирует набор текста, чел можеть дать правильный
           ответ и бот его простит */
        if (this.writingMutex)
        {
          return;
        }

        this.desiredAnswer = 993;
      }
    }
    else {
      if (this.unrelatedCounter++ >= 2)
      {
        console.log("[Bot] Trigger motivational message");
        this.unrelatedCounter = 0;

        this.writeMessageSimulated(
            this.getRandomString(this.motivationStrings),
            () => {
              this.askEquationSimulated();
            }
        );

        return;
      }
    }

    // Ask a question
    this.askEquationSimulated();
  }
}

var bot = new Bot();
