import { useState } from "react";

import "./App.css";
import { getAIResponse } from "./api/gpt";
import { AIResponse } from "./types/type";

function App() {
  const [text, setText] = useState("");
  const [aiResponse, setAIResponse] = useState<AIResponse>();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAIButton = async () => {
    setIsLoading(true);
    try {
      const response = await getAIResponse({ prompt: text });
      setAIResponse(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">✨ AI 회고록</h1>

      <div className="input-container">
        <textarea value={text} onChange={handleInputText} placeholder="오늘의 회고를 작성해주세요" className="input-textarea" />
        <button onClick={handleClickAIButton} className="submit-button" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="spinner" />
            </>
          ) : (
            "AI 작성"
          )}
        </button>
      </div>

      {aiResponse && (
        <div className="response-container">
          <h2 className="response-title">
            {aiResponse.title} ({new Date().toLocaleDateString()})
          </h2>

          <div className="card">
            <h3>📝 요약</h3>
            <p>{aiResponse.summary}</p>
          </div>

          <div className="card">
            <h3>📖 감정 일기</h3>
            <p>{aiResponse.emotional_content}</p>
          </div>

          <div className="card">
            <h3>🔍 감정 분석</h3>
            <p>{aiResponse.emotional_result}</p>
          </div>

          <div className="card">
            <h3>💭 심리 분석</h3>
            <p>{aiResponse.analysis}</p>
          </div>

          <div className="card">
            <h3>🏃 실천 방안</h3>
            <ul>
              {aiResponse.action_list.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
