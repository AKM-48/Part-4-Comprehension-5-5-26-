export const presentationContent = {
  title: "Part 4 Comprehension",
  themeTitle: "Level the Playing Field",
  ui: {
    menuKicker: "Football Comprehension Quiz",
    summaryEyebrow: "Text Summary",
    gameEyebrow: "Mini Game",
    gameCompleteEyebrow: "Mini Game Complete",
    originalTextKicker: "Original Text",
    originalTextTitle: "Sport, Football, and Equality",
    questionLabel: "Question",
    roundLabel: "Round",
    ofLabel: "of",
    previous: "Previous",
    next: "Next",
    viewAnswer: "View Answer",
    hideAnswer: "Hide Answer",
    answerTitle: "Answer",
    evidenceTitle: "Evidence from the Text",
    backToMenu: "Back to Menu",
    start: "Start",
    restart: "Restart",
    footballQuizKicker: "Football Quiz Game",
    goalCounter: "Goal Counter",
    tryAgain:
      "Try again. Look for the answer that best matches the text.",
    correctAnswerTitle: "Correct Answer",
    nextQuestion: "Next Question",
    showVictory: "Show Victory",
    goalsComplete: "4/4 Goals",
  },
  menuButtons: {
    summary: "Text Summary",
    game: "Mini Game",
  },
  originalText: [
    "Sport is an area in which we can leverage our partnerships and engagement with different audiences to teach everyone that gender-based violence has no place in it, on or off the field, anywhere in our lives and that a future where all playing fields are truly level for all women and girls can be achieved.",
    "During the World Cup in Brazil, UN Women launched a mobile application ‘Clique 180’ to help women victims of violence access information and services.",
    "Together with the UN system and as part of the Secretary-General’s UNiTE to End Violence against Women campaign, UN Women promoted the distribution of stickers during the FIFA World Cup that read ‘The brave are not violent’ to educate soccer fans about the responsibility men should take to end violence against women and to combat gender stereotypes.",
    "UN Women has established a great partnership with the Valencia Club de Fútbol (VCF) through which we are working to change stereotypes, challenge misconceptions of masculinity and VCF is becoming a gender equality champion and mobilizing resources for UN Women’s mandate.",
    "We have been able to voice our gender equality message from a different speaker — a football club — and share the gender equality and women’s empowerment message in a new way and with an audience not necessarily familiar with our work — the football stars, players and football fans.",
    "This is UN Women’s first global partnership with a sports club and VCF is a key partner in the sports sector and industry to communicate the gender equality and women’s empowerment agenda to its particular audience while contributing to the core resources of the organization.",
    "The partnership aims to promote gender equality and features the UN Women logo on players’ jerseys, stadium banners and in the club’s social media. It also includes special matches and soccer clinics all over the world.",
  ],
  assignmentQuestions: [
    {
      id: "q1",
      question:
        "What are two actions UN Women has taken through sports to promote gender equality and reduce violence?",
      answer:
        "Through sport, UN Women promoted gender equality with the following examples: During the Brazilian World Cup, the “Clique 180” app was launched and stickers that read “The brave are not violent” were distributed. This helped women victims of violence, challenged stereotypes, and educated men about their responsibility to end violence against women. UN Women partnered with Valencia Club de Fútbol (VCF) to spread gender equality messages in new ways.",
      evidence: [
        "During the World Cup in Brazil, UN Women launched a mobile application ‘Clique 180’ to help women victims of violence access information and services.",
        "stickers during the FIFA World Cup that read ‘The brave are not violent’",
        "UN Women has established a great partnership with the Valencia Club de Fútbol (VCF)",
      ],
      explanation:
        "These quotes show specific actions UN Women used through sport: an app, stickers, and a football partnership.",
    },
    {
      id: "q2",
      question:
        "How does partnering with a football club like Valencia CF help spread the message of gender equality more effectively?",
      answer:
        "Partnering with VCF helped spread the message because it reached football audiences who were unfamiliar with UN Women’s work. The message gained exposure through the UN Women logo on players’ jerseys, banners, social media, special matches, and soccer clinics.",
      evidence: [
        "share the gender equality and women’s empowerment message in a new way and with an audience not necessarily familiar with our work",
        "the football stars, players and football fans",
        "features the UN Women logo on players’ jerseys, stadium banners and in the club’s social media",
        "special matches and soccer clinics all over the world",
      ],
      explanation:
        "These quotes show that VCF helped UN Women reach a wider football audience through visible football spaces and events.",
    },
    {
      id: "q3",
      question:
        "What is the speaker’s final claim about the power of sport, and which example from this section best supports that claim? Explain.",
      answer:
        "The speaker’s final claim is that sport can reach a new audience and create a future where “playing fields are truly level for all women and girls.” An example that best supports this claim is the partnership with VCF because it uses football stars, players, and fans to spread gender equality and women’s empowerment. This proves that sport can effectively challenge stereotypes by engaging the audience in a widespread manner.",
      evidence: [
        "a future where all playing fields are truly level for all women and girls can be achieved",
        "share the gender equality and women’s empowerment message in a new way",
        "the football stars, players and football fans",
      ],
      explanation:
        "These quotes support the final claim because they show that sport can reach new audiences and help promote equal opportunities.",
    },
  ],
  miniGame: {
    title: "Goal for Equality",
    intro:
      "Sport is more than just a game. It can be used to share important messages, reach new audiences, and encourage people to think differently about equality.",
    actions: ["Pass", "Shoot", "Defend"],
    progressLabels: [
      "Kickoff",
      "Pass forward",
      "Dribble closer",
      "Shot on goal",
      "Goal scored",
    ],
    rounds: [
      {
        round: 1,
        visualAction: "Player passes the ball forward",
        question: "Which organization spreads gender equality through sport?",
        options: [
          { label: "A", action: "Pass", text: "US Female Rights" },
          { label: "B", action: "Shoot", text: "UN Women", correct: true },
          { label: "C", action: "Defend", text: "World Football League" },
        ],
        correctAnswer: "B. UN Women",
        evidence: "UN Women launched a mobile application ‘Clique 180’...",
        quote:
          "UN Women launched a mobile application ‘Clique 180’ to help women victims of violence access information and services.",
        explanation:
          "This shows that UN Women is the organization taking action through sport.",
      },
      {
        round: 2,
        visualAction: "Player dribbles closer to the goal",
        question: "Which sport is mainly used to spread the message?",
        options: [
          { label: "A", action: "Pass", text: "Basketball" },
          { label: "B", action: "Shoot", text: "Tennis" },
          { label: "C", action: "Defend", text: "Football", correct: true },
        ],
        correctAnswer: "C. Football",
        evidence:
          "“Valencia Club de Fútbol (VCF)” and “football stars, players and football fans”",
        quote: "Valencia Club de Fútbol (VCF)",
        extraQuote: "football stars, players and football fans",
        explanation:
          "The text focuses mainly on football through the VCF partnership and FIFA World Cup examples.",
      },
      {
        round: 3,
        visualAction: "Player shoots toward the goal",
        question: "What is the main message of the text?",
        options: [
          { label: "A", action: "Pass", text: "Sport is only for entertainment" },
          {
            label: "B",
            action: "Shoot",
            text: "Sport can promote gender equality",
            correct: true,
          },
          { label: "C", action: "Defend", text: "Football should replace education" },
        ],
        correctAnswer: "B. Sport can promote gender equality",
        evidence:
          "Sport is an area in which we can leverage our partnerships and engagement with different audiences...",
        quote:
          "Sport is an area in which we can leverage our partnerships and engagement with different audiences",
        explanation:
          "This shows that sport can be used to teach and spread important messages about equality.",
      },
      {
        round: 4,
        label: "Extra Hard",
        visualAction: "Player scores the final goal",
        question: "Why is football especially effective for spreading equality messages?",
        options: [
          {
            label: "A",
            action: "Pass",
            text: "It reaches large audiences beyond UN Women’s usual audience",
            correct: true,
          },
          {
            label: "B",
            action: "Shoot",
            text: "It proves football is more important than other sports",
          },
          {
            label: "C",
            action: "Defend",
            text: "It avoids the need for real-world action",
          },
        ],
        correctAnswer:
          "A. It reaches large audiences beyond UN Women’s usual audience",
        evidence:
          "share the gender equality and women’s empowerment message in a new way and with an audience not necessarily familiar with our work — the football stars, players and football fans",
        quote:
          "share the gender equality and women’s empowerment message in a new way and with an audience not necessarily familiar with our work — the football stars, players and football fans",
        explanation:
          "This is harder because it requires understanding why football is useful: it reaches people who may not already know UN Women’s work.",
      },
    ],
    victoryTitle: "Goal for Equality!",
    finalSummary:
      "The text shows that sport can be used to send powerful messages about gender equality. Through football, these messages can reach new audiences, challenge stereotypes, and support the idea that women and girls should have equal opportunities.",
  },
};
