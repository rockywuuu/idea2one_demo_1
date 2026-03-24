'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { mockQuizQuestions } from '@/mocks/quiz';
import { Button } from '@/components/ui/Button';

export default function QuizPage() {
  const router = useRouter();
  const setQuizResult = useAppStore((state) => state.setQuizResult);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = mockQuizQuestions[currentStep];

  const handleSelect = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionId });
  };

  const handleNext = () => {
    if (currentStep < mockQuizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const finishQuiz = () => {
    setIsSubmitting(true);
    
    // Calculate scores
    let beerScore = 0;
    let cocktailScore = 0;
    let wineScore = 0;

    mockQuizQuestions.forEach(q => {
      const selectedOptionId = answers[q.id];
      const selectedOption = q.options.find(o => o.id === selectedOptionId);
      if (selectedOption) {
        beerScore += selectedOption.scoreMapping.beer;
        cocktailScore += selectedOption.scoreMapping.cocktail;
        wineScore += selectedOption.scoreMapping.wine;
      }
    });

    // Determine preferred category
    let preferredCategory = 'beer';
    let maxScore = beerScore;
    if (cocktailScore > maxScore) {
      preferredCategory = 'cocktail';
      maxScore = cocktailScore;
    }
    if (wineScore > maxScore) {
      preferredCategory = 'wine';
      maxScore = wineScore;
    }

    setQuizResult({
      beer: beerScore,
      cocktail: cocktailScore,
      wine: wineScore,
      preferredCategory
    });

    // Simulate loading for better UX
    setTimeout(() => {
      router.push('/recommendations');
    }, 600);
  };

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">正在為您調配最佳推薦...</p>
      </div>
    );
  }

  return (
    <div className="p-4 pt-8 pb-32 max-w-md mx-auto h-full flex flex-col">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>題目 {currentStep + 1} / {mockQuizQuestions.length}</span>
          <span>{Math.round(((currentStep + 1) / mockQuizQuestions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 overflow-hidden">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentStep + 1) / mockQuizQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex-1 space-y-8">
        <h2 className="text-2xl font-bold leading-tight">
          {currentQuestion.text}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map(option => {
            const isSelected = answers[currentQuestion.id] === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  isSelected 
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 dark:border-indigo-400' 
                    : 'border-gray-200 hover:border-indigo-300 bg-white dark:bg-gray-800 dark:border-gray-700'
                }`}
              >
                <p className={`font-medium ${isSelected ? 'text-indigo-900 dark:text-indigo-100' : ''}`}>
                  {option.text}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4 mt-8 pt-4">
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={handlePrev}
        >
          {currentStep === 0 ? '返回' : '上一題'}
        </Button>
        <Button 
          className="flex-1" 
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
        >
          {currentStep === mockQuizQuestions.length - 1 ? '完成測驗' : '下一題'}
        </Button>
      </div>
    </div>
  );
}
