import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import './Problem_Box.css';

const ProblemBox = ({ customClass, questionData, showExplanation = false, onAnswerChange, initialAnswer = '', isLastQuestion, onComplete, onTimeUpdate }) => {
  const [answer, setAnswer] = useState(initialAnswer);
  const [isRunning, setIsRunning] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setAnswer(initialAnswer); // 문제 변경 시 답 초기화
  }, [initialAnswer]);

  const handleInputChange = (event) => {
    const newAnswer = event.target.value;
    setAnswer(newAnswer);
    onAnswerChange(newAnswer);
  };

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          if (onTimeUpdate) onTimeUpdate(newTime); // 시간을 부모 컴포넌트로 전달
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer); // 컴포넌트가 언마운트되거나 isRunning이 false일 때 타이머를 정리
    }
  }, [isRunning, onTimeUpdate]);

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <Box className={`problemArea ${customClass}`}>
      <Box className="problemBox">
        <img
          src={questionData.text}
          alt="문제 이미지"
          className="questionImage"
        />
        
        {!showExplanation && (
          <Box mt={2} display="flex" alignItems="center" justifyContent="center">
            <TextField
              variant="outlined"
              placeholder="답을 입력하세요"
              size="small"
              className="answer-input"
              value={answer}
              onChange={handleInputChange}
            />
            {isLastQuestion && (
              <Button 
                variant="contained" 
                className="complete-button" 
                onClick={() => {
                  onComplete(); 
                  handleStop();
                }} 
                size="small" 
              >
                완료
              </Button>
            )}
          </Box>
        )}
      </Box>

      {showExplanation && (
        <Box className="explanationBox">
          <Typography variant="body2">설명: {questionData.explanation}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProblemBox;
