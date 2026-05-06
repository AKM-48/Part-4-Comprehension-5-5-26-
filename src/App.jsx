import { useState } from "react";
import { presentationContent } from "./data/content.js";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function App() {
  const [screen, setScreen] = useState("menu");

  return (
    <main className="app-shell">
      {screen === "menu" && <MainMenu onNavigate={setScreen} />}
      {screen === "summary" && <SummaryView onBack={() => setScreen("menu")} />}
      {screen === "game" && <GameView onBack={() => setScreen("menu")} />}
    </main>
  );
}

function MainMenu({ onNavigate }) {
  const { title, themeTitle, menuButtons, ui } = presentationContent;

  return (
    <section className="menu-screen screen">
      <div className="stadium-lights" aria-hidden="true" />
      <div className="menu-copy">
        <p className="kicker">{ui.menuKicker}</p>
        <h1>{title}</h1>
        <p className="theme-title">{themeTitle}</p>
      </div>

      <div className="menu-pitch" aria-hidden="true">
        <div className="mini-goal" />
        <div className="mini-player" />
        <div className="mini-ball" />
      </div>

      <div className="menu-actions" aria-label="Main menu options">
        <button className="pixel-button primary" onClick={() => onNavigate("summary")}>
          {menuButtons.summary}
        </button>
        <button className="pixel-button accent" onClick={() => onNavigate("game")}>
          {menuButtons.game}
        </button>
      </div>
    </section>
  );
}

function SummaryView({ onBack }) {
  const { ui } = presentationContent;
  const { summaryCards } = presentationContent;
  const questions = presentationContent.assignmentQuestions;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [revealed, setRevealed] = useState({});
  const activeQuestion = questions[questionIndex];
  const isRevealed = Boolean(revealed[activeQuestion.id]);
  const activeEvidence = isRevealed ? activeQuestion.evidence : [];

  const goToQuestion = (nextIndex) => {
    setQuestionIndex(clamp(nextIndex, 0, questions.length - 1));
  };

  return (
    <section className="summary-screen screen">
      <TopBar eyebrow={ui.summaryEyebrow} onBack={onBack} />

      <div className="summary-top-cards">
        <SummaryCard
          title={summaryCards.intro.title}
          text={summaryCards.intro.text}
          variant="intro"
        />
        <SummaryCard
          title={summaryCards.mainIdea.title}
          text={summaryCards.mainIdea.text}
          variant="main-idea"
        />
      </div>

      <div className="summary-layout">
        <section className="reading-panel" aria-labelledby="original-text-title">
          <div className="section-heading">
            <p className="kicker">{ui.originalTextKicker}</p>
            <h2 id="original-text-title">{ui.originalTextTitle}</h2>
          </div>
          <div className="text-scroll">
            {presentationContent.originalText.map((paragraph, index) => (
              <p key={paragraph}>
                {renderHighlightedText(paragraph, activeEvidence, index)}
              </p>
            ))}
          </div>
        </section>

        <section className="qa-panel" aria-labelledby="question-title">
          <div className="section-heading">
            <p className="kicker">
              {ui.questionLabel} {questionIndex + 1} {ui.ofLabel} {questions.length}
            </p>
            <h2 id="question-title">{activeQuestion.question}</h2>
          </div>

          <div className="question-tools" aria-label="Question navigation">
            <button
              className="small-button"
              onClick={() => goToQuestion(questionIndex - 1)}
              disabled={questionIndex === 0}
            >
              {ui.previous}
            </button>
            <div className="dot-row" aria-hidden="true">
              {questions.map((question, index) => (
                <span
                  className={`dot ${index === questionIndex ? "active" : ""}`}
                  key={question.id}
                />
              ))}
            </div>
            <button
              className="small-button"
              onClick={() => goToQuestion(questionIndex + 1)}
              disabled={questionIndex === questions.length - 1}
            >
              {ui.next}
            </button>
          </div>

          <button
            className="pixel-button primary full-width"
            onClick={() =>
              setRevealed((current) => ({
                ...current,
                [activeQuestion.id]: !current[activeQuestion.id],
              }))
            }
          >
            {isRevealed ? ui.hideAnswer : ui.viewAnswer}
          </button>

          {isRevealed && (
            <div className="answer-block">
              <h3>{ui.answerTitle}</h3>
              <p>{activeQuestion.answer}</p>

              <EvidenceBox
                title={ui.evidenceTitle}
                quotes={activeQuestion.evidence}
                explanation={activeQuestion.explanation}
              />
            </div>
          )}
        </section>
      </div>

      <div className="summary-bottom-card">
        <SummaryCard
          title={summaryCards.briefSummary.title}
          text={summaryCards.briefSummary.text}
          variant="brief"
        />
      </div>
    </section>
  );
}

function SummaryCard({ title, text, variant }) {
  return (
    <section className={`summary-card ${variant}`}>
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}

function GameView({ onBack }) {
  const game = presentationContent.miniGame;
  const { ui } = presentationContent;
  const [started, setStarted] = useState(false);
  const [kickoff, setKickoff] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState("idle");
  const [victory, setVictory] = useState(false);
  const [finalMessage, setFinalMessage] = useState(false);
  const round = game.rounds[roundIndex];
  const totalRounds = game.rounds.length;

  const resetGame = () => {
    setStarted(false);
    setKickoff(false);
    setRoundIndex(0);
    setProgress(0);
    setSelectedOption(null);
    setResult("idle");
    setVictory(false);
    setFinalMessage(false);
  };

  const startGame = () => {
    setStarted(false);
    setKickoff(true);
    setRoundIndex(0);
    setProgress(0);
    setSelectedOption(null);
    setResult("idle");
    setVictory(false);
    setFinalMessage(false);
  };

  const finishKickoff = () => {
    setKickoff(false);
    setStarted(true);
  };

  const chooseOption = (option) => {
    if (result === "correct") {
      return;
    }

    setSelectedOption(option.label);

    if (option.correct) {
      setResult("correct");
      setProgress(roundIndex + 1);
    } else {
      setResult("wrong");
    }
  };

  const nextRound = () => {
    if (roundIndex === totalRounds - 1) {
      setVictory(true);
      return;
    }

    setRoundIndex((current) => current + 1);
    setSelectedOption(null);
    setResult("idle");
  };

  if (kickoff) {
    return (
      <section className="game-screen screen">
        <TopBar eyebrow={ui.gameEyebrow} onBack={onBack} />
        <KickoffTransition onFinish={finishKickoff} />
      </section>
    );
  }

  if (!started) {
    return (
      <section className="game-screen screen">
        <TopBar eyebrow={ui.gameEyebrow} onBack={onBack} />
        <div className="game-intro">
          <FootballField
            progress={0}
            total={totalRounds}
            label={game.progressLabels[0]}
          />
          <div className="intro-copy">
            <p className="kicker">{ui.footballChallengeKicker}</p>
            <h1>{game.title}</h1>
            <p>{game.intro}</p>
            <button className="pixel-button accent" onClick={startGame}>
              {ui.start}
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (finalMessage) {
    return (
      <FinalMessageScreen
        game={game}
        total={totalRounds}
        onBack={onBack}
        onPlayAgain={resetGame}
      />
    );
  }

  if (victory) {
    return (
      <section className="game-screen screen">
        <TopBar eyebrow={ui.gameCompleteEyebrow} onBack={onBack} />
        <div className="victory-layout">
          <FootballField
            progress={totalRounds}
            total={totalRounds}
            label={game.progressLabels[totalRounds]}
          />
          <div className="victory-copy">
            <p className="kicker">
              {totalRounds}/{totalRounds} Goals
            </p>
            <h1>{game.victoryTitle}</h1>
            <p>{game.victoryMessage}</p>
            <p className="good-luck">{game.goodLuck}</p>
            <p>{game.finalSummary}</p>
            <div className="button-row">
              <button className="pixel-button accent" onClick={resetGame}>
                {ui.playAgain}
              </button>
              <button className="pixel-button neutral" onClick={onBack}>
                {ui.backToMenu}
              </button>
              <button
                className="pixel-button primary"
                onClick={() => setFinalMessage(true)}
              >
                {ui.revealFinalMessage}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="game-screen screen">
      <TopBar eyebrow={game.title} onBack={onBack} />
      <div className="game-layout">
        <FootballField
          progress={progress}
          total={totalRounds}
          label={game.progressLabels[progress]}
        />

        <section className="challenge-panel" aria-labelledby="round-question">
          <div className="round-header">
            <div>
              <p className="kicker">
                {ui.roundLabel} {round.round} {ui.ofLabel} {totalRounds}
              </p>
              <h2 id="round-question">{round.question}</h2>
            </div>
            <GoalCounter progress={progress} total={totalRounds} />
          </div>

          <div className="option-grid" aria-label="Answer choices">
            {round.options.map((option) => {
              const isSelected = selectedOption === option.label;
              const isCorrect = result === "correct" && option.correct;
              const isWrong = result === "wrong" && isSelected;

              return (
                <button
                  className={`action-choice ${isCorrect ? "correct" : ""} ${
                    isWrong ? "wrong" : ""
                  }`}
                  key={option.label}
                  onClick={() => chooseOption(option)}
                  disabled={result === "correct"}
                >
                  <span className="action-name">{option.action}</span>
                  <span className="option-text">
                    {option.label}. {option.text}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="feedback-area" aria-live="polite">
            {result === "wrong" && (
              <p className="try-again">{ui.tryAgain}</p>
            )}

            {result === "correct" && (
              <div className="answer-block game-answer">
                <h3>{ui.correctAnswerTitle}</h3>
                <p>{round.correctAnswer}</p>
                <EvidenceBox
                  title={ui.evidenceTitle}
                  lead={round.evidence}
                  quotes={[round.quote, round.extraQuote].filter(Boolean)}
                  explanation={round.explanation}
                />
                <p className="field-note">{round.visualAction}.</p>
                <button className="pixel-button primary" onClick={nextRound}>
                  {roundIndex === totalRounds - 1
                    ? ui.showVictory
                    : ui.nextQuestion}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}

function KickoffTransition({ onFinish }) {
  const { ui } = presentationContent;
  const handleAnimationEnd = (event) => {
    if (event.target === event.currentTarget) {
      onFinish();
    }
  };

  return (
    <section className="kickoff-wrap" aria-label={ui.kickoff}>
      <div className="kickoff-pitch">
        <div className="kickoff-card" onAnimationEnd={handleAnimationEnd}>
          <p className="kicker">Mini Game</p>
          <h1>{ui.kickoff}</h1>
          <div className="kickoff-ball" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalMessageScreen({ game, total, onBack, onPlayAgain }) {
  const { ui } = presentationContent;

  return (
    <section className="game-screen screen finale-screen">
      <TopBar eyebrow={game.finalMessage.title} onBack={onBack} />
      <div className="finale-layout">
        <div className="finale-stage" aria-hidden="true">
          <FootballField
            progress={total}
            total={total}
            label={game.progressLabels[total]}
          />
          <div className="pixel-confetti one" />
          <div className="pixel-confetti two" />
          <div className="pixel-confetti three" />
          <div className="pixel-confetti four" />
          <div className="pixel-confetti five" />
          <div className="pixel-confetti six" />
        </div>
        <div className="victory-copy finale-copy">
          <p className="kicker">{game.victoryTitle}</p>
          <h1>{game.finalMessage.title}</h1>
          <p>{game.finalMessage.text}</p>
          <p className="good-luck">{game.finalMessage.thanks}</p>
          <div className="button-row">
            <button className="pixel-button accent" onClick={onPlayAgain}>
              {ui.playAgain}
            </button>
            <button className="pixel-button neutral" onClick={onBack}>
              {ui.backToMenu}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TopBar({ eyebrow, onBack }) {
  const { ui } = presentationContent;

  return (
    <header className="top-bar">
      <div>
        <p className="kicker">{eyebrow}</p>
        <strong>{presentationContent.title}</strong>
      </div>
      <button className="small-button" onClick={onBack}>
        {ui.backToMenu}
      </button>
    </header>
  );
}

function FootballField({ progress, total, label }) {
  const safeTotal = Math.max(total, 1);
  const safeProgress = clamp(progress, 0, safeTotal);
  const progressRatio = safeProgress / safeTotal;
  const ballPosition = {
    x: 8 + progressRatio * 84,
    y: 72 - progressRatio * 23,
  };
  const playerPosition = {
    x: 4 + progressRatio * 64,
    y: 61 - progressRatio * 16,
  };
  const ballStyle = {
    "--ball-x": `${ballPosition.x}%`,
    "--ball-y": `${ballPosition.y}%`,
  };
  const playerStyle = {
    "--player-x": `${playerPosition.x}%`,
    "--player-y": `${playerPosition.y}%`,
  };

  return (
    <section
      className="field-wrap"
      aria-label={`Football progress: ${safeProgress} of ${safeTotal}`}
    >
      <div className="score-strip">
        <span>{presentationContent.ui.goalCounter}</span>
        <strong>{safeProgress}/{safeTotal}</strong>
      </div>
      <div className="football-field">
        <div className="field-stripe stripe-one" />
        <div className="field-stripe stripe-two" />
        <div className="half-line" />
        <div className="center-circle" />
        <div className="penalty-box" />
        <div className="goal-mouth">
          <span />
          <span />
          <span />
        </div>
        <div className="keeper" aria-hidden="true">
          <span className="keeper-head" />
          <span className="keeper-body" />
        </div>
        <div className="pixel-player" style={playerStyle} aria-hidden="true">
          <span className="player-head" />
          <span className="player-shirt" />
          <span className="player-leg left" />
          <span className="player-leg right" />
        </div>
        <div
          className={`pixel-ball ${safeProgress === safeTotal ? "scored" : ""}`}
          style={ballStyle}
        >
          <span />
        </div>
      </div>
      <div className="progress-caption">
        <span>{label}</span>
        <div className="progress-track">
          <span style={{ width: `${progressRatio * 100}%` }} />
        </div>
      </div>
    </section>
  );
}

function GoalCounter({ progress, total }) {
  return (
    <div
      className="goal-counter"
      style={{ "--goal-count": total }}
      aria-label={`Progress ${progress} out of ${total}`}
    >
      {Array.from({ length: total }).map((_, index) => (
        <span className={index < progress ? "filled" : ""} key={index} />
      ))}
    </div>
  );
}

function EvidenceBox({ title, lead, quotes, explanation }) {
  return (
    <div className="evidence-box">
      <h3>{title}</h3>
      {lead && <p className="evidence-lead">{lead}</p>}
      {quotes.map((quote) => (
        <blockquote key={quote}>{quote}</blockquote>
      ))}
      <p className="explanation">{explanation}</p>
    </div>
  );
}

function renderHighlightedText(text, highlights, paragraphIndex) {
  if (!highlights.length) {
    return text;
  }

  const matches = highlights
    .flatMap((highlight, highlightIndex) => {
      const found = [];
      let start = 0;

      while (start < text.length) {
        const index = text.indexOf(highlight, start);

        if (index === -1) {
          break;
        }

        found.push({
          start: index,
          end: index + highlight.length,
          key: `${paragraphIndex}-${highlightIndex}-${index}`,
        });
        start = index + highlight.length;
      }

      return found;
    })
    .sort((a, b) => a.start - b.start || b.end - a.end);

  const filteredMatches = [];
  for (const match of matches) {
    const previous = filteredMatches[filteredMatches.length - 1];
    if (!previous || match.start >= previous.end) {
      filteredMatches.push(match);
    }
  }

  if (!filteredMatches.length) {
    return text;
  }

  const parts = [];
  let cursor = 0;

  filteredMatches.forEach((match) => {
    if (match.start > cursor) {
      parts.push(text.slice(cursor, match.start));
    }

    parts.push(
      <mark className="text-highlight" key={match.key}>
        {text.slice(match.start, match.end)}
      </mark>,
    );
    cursor = match.end;
  });

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts;
}

export default App;
