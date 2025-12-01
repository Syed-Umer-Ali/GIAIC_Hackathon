import React, { useState, useEffect } from 'react';

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
  correct_option_id: string;
  explanation: string;
}

interface QuizData {
  questions: Question[];
}

interface QuizProps {
  slug: string;
}

export default function Quiz({ slug }: QuizProps) {
  const [data, setData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [userAnswers, setUserAnswers] = useState<{[questionId: number]: string}>({});
  const [showExplanation, setShowExplanation] = useState<{[questionId: number]: boolean}>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const apiUrl = 'http://localhost:8000/api/features/quiz';
        const response = await fetch(`${apiUrl}?slug=${encodeURIComponent(slug)}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        const result: QuizData = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Quiz generation failed');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [slug]);

  const handleOptionSelect = (questionId: number, optionId: string) => {
    // Only allow selection if not already answered or if we want to allow changing before submitting?
    // Let's make it instant feedback for simplicity as per spec FR-006 "immediate feedback"
    // OR we can do "Submit" style. 
    // "Immediate feedback" implies checking right away.
    
    if (userAnswers[questionId]) return; // Already answered

    setUserAnswers(prev => ({...prev, [questionId]: optionId}));
    setShowExplanation(prev => ({...prev, [questionId]: true}));
  };

  const calculateScore = () => {
    if (!data) return 0;
    let correct = 0;
    data.questions.forEach(q => {
        if (userAnswers[q.id] === q.correct_option_id) correct++;
    });
    return correct;
  };

  if (loading) {
    return (
      <div className="alert alert--info">
         <div className="text--center">
          <strong>Generating Quiz...</strong>
          <div className="margin-top--sm spinner-border"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert--danger">
        Failed to load quiz. {error}
      </div>
    );
  }

  if (!data) return null;

  const allAnswered = data.questions.length > 0 && Object.keys(userAnswers).length === data.questions.length;

  return (
    <div className="padding--md" style={{background: 'var(--ifm-background-surface-color)', borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-200)'}}>
      <h3 className="margin-bottom--md">✅ Knowledge Check</h3>
      
      {data.questions.map((q, index) => {
        const answered = !!userAnswers[q.id];
        const isCorrect = userAnswers[q.id] === q.correct_option_id;
        
        return (
            <div key={q.id} className="margin-bottom--lg padding-bottom--md" style={{borderBottom: '1px solid var(--ifm-color-emphasis-200)'}}>
                <p><strong>{index + 1}. {q.question}</strong></p>
                <div className="options-list">
                    {q.options.map(opt => {
                        const isSelected = userAnswers[q.id] === opt.id;
                        const isCorrectOption = opt.id === q.correct_option_id;
                        
                        let btnClass = 'button--secondary';
                        if (answered) {
                            if (isSelected && isCorrect) btnClass = 'button--success';
                            else if (isSelected && !isCorrect) btnClass = 'button--danger';
                            else if (isCorrectOption && !isCorrect) btnClass = 'button--outline button--success'; // Show correct answer
                            else btnClass = 'button--ghost';
                        } else {
                            btnClass = 'button--outline button--secondary';
                        }

                        return (
                            <button 
                                key={opt.id}
                                className={`button button--block ${btnClass} margin-bottom--xs`}
                                style={{textAlign: 'left', justifyContent: 'flex-start'}}
                                onClick={() => handleOptionSelect(q.id, opt.id)}
                                disabled={answered}
                            >
                                {opt.text}
                            </button>
                        );
                    })}
                </div>
                
                {answered && (
                    <div className={`alert alert--${isCorrect ? 'success' : 'warning'} margin-top--sm`}>
                        <strong>{isCorrect ? 'Correct!' : 'Incorrect.'}</strong> {q.explanation}
                    </div>
                )}
            </div>
        );
      })}

      {allAnswered && (
        <div className="text--center margin-top--lg">
            <h2>Final Score: {calculateScore()} / {data.questions.length}</h2>
            <button className="button button--primary" onClick={() => window.location.reload()}>Try Another Lesson</button>
        </div>
      )}
    </div>
  );
}
