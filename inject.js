class Bot {
  constructor() {
    this.writingMutex = false;
    this.desiredAnswer = 993;
    this.unrelatedCounter = 0;
    this.insulted = false;
    this.swearCautionedTimes = 0;
    this.praiseCounter = 0;
    this.messageCounter = 0;
    this.cuckMode = false;
    this.failCounter = 0;
    this.running = true;
    this.age = null;

    this.cuckGenderReply = [
      "д",
      "Д",
      "ж",
      "Ж"
    ];

    this.zakatLyrics = [
      "Фотографирую закат",
      "Будто пару лет назад"
    ];

    this.praises = [
      "Ты молодец!",
      "Ты умничка!",
      "Ты самый лучший!",
      "Ты — гений!",
      "Ты мастер на все руки!"
    ];

    this.forgives = [
      "Прощаю",
      "Ладно. Прощаю.",
      "Мир?",
      "Хорошо. Я тебя прощаю",
      "Пообещай что больше такого не повторится",
      "Больше такого не пиши"
    ];

    this.greetings = [
      "прив",
      "привет",
      "ghbdtn",
      "Привет!",
      "Хай!",
      "Хеллоу",
      "Здравствуй",
      "Здравствуйте",
      "Доброго времени суток",
      "конничива",
      "Салют",
      "Шалом",
      "Асалам Алейкум!",
      "%daytime_greeting%"
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
      "У меня бабушка в комнате, не матерись пожалуйста!",
      "Бабушка за спиной, не матерись пожалуйста"
    ];

    this.finalSwearCautions = [
      "Ну я же просил не материться",
      "Ну я же попросил не материться",
      "Это последнее предупреждение",
      "Это последнее предупреждение насчёт мата."
    ];

    this.kanekiNames = [
      "Канеки",
      "Kен Канеки",
      "Канеки. Кен Канеки.",
      "Я уже давно мёртв внутри. Зачем тебе моё имя?"
    ];

    this.motivationStrings = [
      "У тебя всё получится!",
      "Я в тебя верю",
      "Я верю в тебя",
      "Давай eщё раз?",
      "Не отчаивайся",
      "Пожалуйста",
      "Я. Жe. Гуль.",
      "Я. Жи. Гуль.",
      "Я. Гуль.",
      "Я гуль.",
      "Этот мир прогнил. Не осталось ничего кроме боли.",
      "Дед инсайд",
      "Сколько?",
      "Сколько будет?",
      "Отвечай",
      "Отвечай на вопрос",
      "Ответь на вопрос",
      "Ответ сюда",
      "Может посчитаем?",
      "Как ты?",
      "Ты умён",
      "Что с лицом?",
      "Ну?",
      "Ну же",
      "Мда",
      "Мда...",
      "Не тупи",
      "Не кисни",
      "Развиваем устный счёт.",
      "Я умер, прости",
      "Я уже погиб.",
      "Неизвестная команда. Для справки наберите /help",
      "Подготовьте номер паблик стейтик джава точка ланг точка обжектрy точка" +
        " чат фанкшнс точка аэф джава точка ланг точка булеан джава точка ланг" +
        " точка обжект джава точка ланг точка обжект ноль равно равно один"
    ];

    this.ensuranceQuestions = [
      "Уверен?",
      "Ты уверен?",
      "Ты в этом уверен?",
      "Точно?",
      "Это окончательный ответ?",
      "Ваш окончательный ответ?"
    ];

    this.disappointments = [
      "Я разочарован",
      "Ломаю шмотки команда раков",
      "Неправильно.",
      "Ответ неверный",
      "Ответ неверный, начнём сначала",
      "Здоровья маме"
    ];

    this.gawrGura =
      "--------------------------------------------------------------------------------------------------------mш:------------------\n" +
      "-----------------------------------------------------------------------------------------------------------mцL---------------\n" +
      "-----------------------------------------------------------------------------------------------------------нfбШo:-----------\n" +
      "-----------------------------------------------------------------------------------------------------------нФmЬv----------\n" +
      "---------------------------------------------------чФДggggggggJJBbn------------------------------mIsHw----------\n" +
      "--------------------------------------------mBgggggggggggggggggg@и:-----------------------нGtQu----------\n" +
      "----------------------------------------yjДфДggДЮн::--------т;wI#ДggБбДR:------------------чЖhKн-----------\n" +
      "------------------------------------r#ggggJЭ::-----------:----::-----------mБJggg@i--------------mtyXЁ::-----------\n" +
      "----------------------------------DgggW:---------uштыysstU:my---------mДgggL:-----------ЧRЖRjj:-----------\n" +
      "-------------------------------mggЩ--------VSnv;mч:----:----нч:тnЪx--------ЪggДs----------QBQвЮ---------\n" +
      "-----------------------------чЁggL-----тv-тCTЧ---чzт-------------тциV--L:::----wjg@i----------VGIII#ДJjБЬr::\n" +
      "------------------------mBggBr---:т:mBДт-----тzБS----т::---нs-----oДM::m---шgggЮ---------mfBJJJJJJgЁЁ\n" +
      "--------------------тRggggBч--тtgj#rчЧ:-чLЮRДG;-unhrт#Ъr---SЪ-mДBч--шgggg@;----------:rЧфjgg\n" +
      "----------------mjggJJBjJgЭ---xД::----;щmtt;тuфБ#юhmVCvнyт-sбIs----nБT--шgjjjДJggЖ:---------------\n" +
      "-------------vБggД@BJgv---нm-----т;u::--------------------------------:::тr------Ch:---EJДЁ@ДggE----------т:\n" +
      "-----------TggggggggЙr--oG:-----mвRДgggb:-------------шgggДБDv:--:---цh---ыggJggggggL:-------:::\n" +
      "----------шgJjЁBjДЁgg::---DK:----тTt---zIбДJEr-------------mJgБEi---oL:::---mD:---#gBДД@BgIz---------\n" +
      "------------------------шK:---Ъfn-----:rч::--------------------------------:--:т;u:-----юв;---ЪБi-----------------------\n" +
      "------------------------mБL---yн-------mv:---------------------------------тLr-------mr---щjh-----------------------\n" +
      "--------------------------gg---тni::---тr-т:U------------::-----т-----------iix:-т:----mv:::-xjJю------------------------\n" +
      "---------------------------Щa----тт:--шUШjЮ;--------------------тHfфyzAL--тч:----FЩ;-------------------------\n" +
      "-----------------------------:JJЭ-----L::-щЧшДJЁgJДSVчrтLyEggДJJJO;:Ъm-u:----m#----------------------------\n" +
      "------------------------------uбЬr-mц-uDт::---oRLrЫиmWmЙ:---::mKI:-As:-m#щ----------------------------\n" +
      "-----:т:---------------------т:-тнттvsIIнztи:--------------::-------------mютShu:т:Ч:т::----------------------------\n" +
      "--------т:-------------------т--------------тmiizт::т::т:::тzUuuтт:::тцЧLт:-------------::-----------------------------\n" +
      "----------т----------------ЮJRtu:-----------------rттu::-------:тч::::-----------------mGДБ:--------------------------\n" +
      "----------т:---------------#gggggJ@Sx:------------mGЧшSt;;------------тobBgggggЩ:-------------------------\n" +
      "--------тvv-------------nBДБ@ДJJJggggg@IHv-----mGv:-----mX@ggggggДB@Ёgjj:-------------------------\n" +
      "----ттunn-------------DgjЁЁБ@@BBjJJgЮДJggДahФDДgggЫ#gДДBB@@Ё@JJЖ:-----------------------\n" +
      "::-------::--------------hjДБRбБ@RБRБRBsmJДБBgggggД@Бg:тz@ЙЁRЁЁjЁRЙЁjg#-----------------------\n" +
      "***\n" +
      "А";

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
    this.messageCounter = 0;
    this.cuckMode = false;
    this.failCounter = 0;
    this.running = true;
    this.age = null;

    clearTimeout(this.greetingTimerHandle);
    this.greetingTimerHandle = null;

    clearTimeout(this.writingTimerHandle);
    this.writingTimerHandle = null;
  }

  getAgeSuffix(age)
  {
    let str;
    let count = age % 100;

    if (count >= 5 && count <= 20) {
      str = 'лет';
    } else {
      count = count % 10;

      if (count == 1) {
        str = 'год';
      } else if (count >= 2 && count <= 4) {
        str = 'года'; 
      } else {
        txt = 'лет';
      }
    }

    return str;
  }

  booleanRandom(probability = 0.5)
  {
    return Math.random() < probability;
  }

  expressResentment()
  {
    // Промолчать с 50% шансом
    if (this.booleanRandom())
    {
      this.writeMessageSimulated(this.getRandomString(this.insultedReplies));
    }
  }

  writeMessageInstant(message)
  {
    chat.sendMessage(message);
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

      }, 250 * message.length + Math.random() * (200 * message.length));
    }, 3000 + Math.random() * 3000);
  }

  askEquationSimulated()
  {
    this.writeMessageSimulated((this.desiredAnswer + 7) + "-7?", null);
  }

  isFloat(n)
  {
    return Number(n) === n && n % 1 !== 0;
  }

  onConnect()
  {
    this.resetState();

    let greetingMessage = this.getRandomString(this.greetings);
    if (greetingMessage == "%daytime_greeting%") {

      let greetingMessage = "";

      var d = new Date();
      var hour = d.getHours();

      if (hour < 6)
      {
        let variants = [
          "Доброй ночи",
          "Доброй ночки",
          "ночи",
          "Ночь в хату",
          "Ночь на дворе",
        ];
        greetingMessage = this.getRandomString(variants);
      }
      else if (hour < 12)
      {
        let variants = [
          "Утречка!",
          "Доброе утро",
          "Доброе утречко",
          "Доброго утра",
          "утра",
          "Утро в хату"
        ];
        greetingMessage = this.getRandomString(variants);
      }
      else if (hour < 17)
      {
        let variants = [
          "День добрый",
          "Добрый день!",
          "Доброго дня!"
        ];
        greetingMessage = this.getRandomString(variants);
      }
      else
      {
        let variants = [
          "Добрый вечер",
          "Доброго вечера",
          "Доброго вечерочка",
          "Добрейшего вечерочка!",
          "Вечер в хату",
          "С вечерком"
        ];
        greetingMessage = this.getRandomString(variants);
      }
    }

    this.greetingTimerHandle = setTimeout(() => {
      this.writeMessageSimulated(greetingMessage,
      () => {
        this.askEquationSimulated();
      });
    }, 5000);
  }

  onMessageReceived(type, content) {
    if (type != chat.MessageType.TEXT) {
      return;
    }

    this.messageCounter++;
    clearTimeout(this.greetingTimerHandle);

    if (!this.running)
    {
      return;
    }

    // Специальный режим для тех, кто пишет "М" в начале беседы
    if (this.messageCounter == 1 && content.toUpperCase() == "М")
    {
      console.log("[Cuck mode] Activated");

      this.age = Math.round(14 + Math.random() * 10);

      this.cuckMode = true;

      let spaceExclusion = false;
      this.writeMessageSimulated(
          this.getRandomString(this.cuckGenderReply) +

          ((spaceExclusion = this.booleanRandom(0.8)) ? " " : "") +

          (this.booleanRandom(0.2) ?
            this.age +
            (this.booleanRandom(0.2) ? " " + this.getAgeSuffix(this.age) : "") : "") +
     
          (this.booleanRandom(0.3) ? ")" : ""));
      return;
    }

    if (this.insulted && content.match(/про(cти|щен)|извин/ig) != null)
    {
      this.insulted = false;
      this.writeMessageSimulated(this.getRandomString(this.forgives), () => {
          this.askEquationSimulated();
      });
      return;
    }

    if (content.match(/\/stop|\/exit|\/quit|\/halt|\/break|\/pause/g) != null)
    {
      this.writeMessageSimulated("Недостаточно прав для выполнения команды.");
      return;
    }

    if (content == "💩👍")
    {
      this.writeMessageInstant("Протокол завершения диалога.");
      this.running = false;
      return;
    }

    // Вызов справки
    if (content == "/help")
    {
      this.writeMessageInstant("Чат-бот \"Токийский Гуль\".\n" +
          "Версия: FIOR210913\n" +
          "***\n" +
          "Бот пишется в познавательно-развлекательных целях, без " +
            " преследования какой-либо материальной или коммерческой выгоды.\n" +
            "Пожалуйста, помогите улучшить проект предложив правки в исходный " +
            "код. Спасибо за проявленный интерес!\n" +
          "***\n" +
          "Список команд:\n" +
          "/help — Вызов справки\n" +
          "/gawr — Акула Гура\n" +
          "/praise — Зачитать похвалу\n" +
          "/github — Ссылка на репозиторий исходного кода\n"
      );
      return;
    }

    // Выразить обиду, если она есть
    if (this.insulted) {
      this.expressResentment();
      return;
    }

    // Назвать своё имя
    if (content.match(/(?=.*как)(?=.*з(ов|ва))|имя/ig) != null)
    {
      console.log("[Bot] Name question triggered");
      this.writeMessageSimulated(this.getRandomString(this.kanekiNames), () => {
          this.askEquationSimulated();
      });
      return;
    }

    // Назвать возраст 
    if (content.match(/(?=.*ск)(?=.*((?<=[\s,.:;"']|^)л+ет+(?=[\s,.:;"'?]|$)))|возраст/gi) != null)
    {
      console.log("[Bot] Age question triggered");

      if (!Number.isInteger(this.age))
      {
        if (this.booleanRandom())
        {
          this.age = Math.round(12 + Math.random() * 30);
        }
        else {
          this.age = 18;
        }
      }

      this.writeMessageSimulated(
          this.age +
          (this.booleanRandom() ?
            (this.booleanRandom() ? " " : "") +
            (this.booleanRandom() ? this.getAgeSuffix(this.age) : "") : ""),
          () => {
              this.askEquationSimulated();
          }
      );
      return;
    }

    // Посчитать пример заданный собеседником
    let capture;
    if ((capture = content.match(/(\d+\.?\d*\s*[\-+\/\*]\s*\d+\.?\d*)/g)) != null)
    {
      let answer = eval(capture[0]);
      let message = "";

      if (!isFinite(answer))
      {
        let variants = [
          "нельзя",
          "на ноль делить нельзя",
          "совсем больной на ноль делить?",
          "плюс минус бесконечность"
        ];
        message = this.getRandomString(variants);
      }
      else if (Math.floor(answer) == 300)
      {
        message = "Тракторист сегодня я.";
      }
      else if (Math.floor(answer) == 1488)
      {
        message = "Осуждаю.";
      }
      else
      {
        if (this.isFloat(answer))
        {
          answer = parseFloat(answer.toFixed(2));
        }

        message = answer.toString();
      }

      this.writeMessageSimulated(message, () => {
          this.askEquationSimulated();
      });
    }

    // Оскорбиться на мат 
    if (content.match(/[её]б(а|[ёе][штн])|бля|ху[ийе]|су(ч)?к|пид[оае]|п[иeё]зд/ig) != null)
    {

      this.swearCautionedTimes++;

      if (this.swearCautionedTimes == 1)
      {
        // Бабушка в комнате
        this.writeMessageSimulated(
            this.getRandomString(this.noSwearPrays),
            () => {
              this.askEquationSimulated();
            }
        );
      }

      // Последнее предупреждение
      else if (this.swearCautionedTimes == 2)
      {
        this.writeMessageSimulated(this.getRandomString(this.finalSwearCautions));
      }

      // Обидеться, если не помогло
      else 
      {
        this.insulted = true;
        this.expressResentment();
      }

      return;
    }

    if (content == "/gawr")
    {
      this.writeMessageInstant(this.gawrGura);
      this.askEquationSimulated(); 

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


    if (content == "/github")
    {
      this.writeMessageInstant(
          "Репозиторий исходного кода на GitHub:\n" +
          "https://github.com/Philosoph228/fior\n" +
          "***\n" +
          "Буду признателен за Ваш вклад в улучшение проекта ❤\n"
      );
      return;
    }

    if (content.match(/(бот|код|[зc]даюсь|это\?|устал|хватит)/ig) != null
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

        if (this.desiredAnswer < 900)
        {
          if (this.failCounter == 0)
          {
            this.failCounter++;
            this.writeMessageSimulated(this.getRandomString(this.esuranceQuestions), () => {
              this.askEquationSimulated();
            });
            return;
          }
          else {
            this.desiredAnswer = 993;
            this.writeMessageSimluated(this.getRandomString(this.disappointments), () => {
              this.askEquationSimulated();
            });
            return;
          }
        }

        this.desiredAnswer = 993;
      }
    }
    else {
      if (this.unrelatedCounter++ >= 2)
      {
        console.log("[Bot] Trigger motivational message");
        this.unrelatedCounter = 0;

        if (this.cuckMode)
        {
          this.writeMessageSimulated("...",
              () => {
                this.askEquationSimulated(); 
              });
        }
        else {
          this.writeMessageSimulated(
              this.getRandomString(this.motivationStrings),
              () => {
                this.askEquationSimulated();
              }
          );
        }

        return;
      }
    }

    // Ask a question
    this.askEquationSimulated();
  }
}

var bot = new Bot();
