import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [appState, setAppState] = useState("upload"); // 'upload', 'loading', 'results', 'error'
  const [file, setFile] = useState(null);
  const [cargo, setCargo] = useState("");
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState("");
  const [fileNameDisplay, setFileNameDisplay] = useState("Clique para fazer o upload do seu currículo");

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setFileNameDisplay(f ? f.name : "Clique para fazer o upload do seu currículo");
  };

  const handleAnalyze = async () => {
    if (!file || !cargo) {
      setError("Por favor, faça o upload do seu currículo e insira o cargo desejado.");
      return;
    }
    setAppState("loading");
    setError("");
    try {
      const formData = new FormData();
      formData.append("cv", file);
      formData.append("cargoAlmejado", cargo);
      const res = await axios.post("http://localhost:4000/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAnalysisData(res.data);
      setAppState("results");
    } catch (err) {
      setError("Erro ao analisar currículo. Tente novamente.");
      setAppState("error");
    }
  };

  const handleRestart = () => {
    setAppState("upload");
    setFile(null);
    setCargo("");
    setAnalysisData(null);
    setError("");
    setFileNameDisplay("Clique para fazer o upload do seu currículo");
  };

  // Passos de loading animado
  const steps = [
    "Lendo seu currículo...",
    "Analisando o mercado de trabalho...",
    "Identificando suas competências-chave...",
    "Cruzando dados e identificando lacunas...",
    "Gerando seu roadmap personalizado..."
  ];
  const [currentStep, setCurrentStep] = useState(0);
  React.useEffect(() => {
    if (appState === "loading") {
      setCurrentStep(0);
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setCurrentStep(step);
        if (step >= steps.length) {
          clearInterval(interval);
          setTimeout(() => {
            setAppState("results");
          }, 1000);
        }
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [appState]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto">
        {/* Tela 1: Upload */}
        {appState === "upload" && (
          <div id="upload-screen" className="text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">IMPULSO</h1>
            <p className="text-xl md:text-2xl mt-2 font-light text-slate-300">Seu próximo passo de carreira, desenhado por IA.</p>
            <div className="mt-12 max-w-2xl mx-auto">
              <div className="mb-6">
                <label htmlFor="cv-upload"
                  className="file-upload-label cursor-pointer p-8 rounded-lg flex flex-col items-center justify-center">
                  <i className="fa-solid fa-file-arrow-up text-4xl text-slate-400 mb-4"></i>
                  <span id="file-name-display" className={`text-lg ${file ? "accent-cyan" : "text-slate-300"}`}>{fileNameDisplay}</span>
                  <span className="text-sm text-slate-500 mt-1">(PDF ou DOCX)</span>
                  <input type="file" id="cv-upload" className="hidden" accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFileChange} />
                </label>
              </div>
              <div className="mb-6">
                <input type="text" id="cargo-alvo"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-lg text-center focus:ring-2 focus:ring-accent-cyan focus:outline-none"
                  placeholder="Digite seu cargo alvo (ex: Desenvolvedor Sênior)"
                  value={cargo} onChange={e => setCargo(e.target.value)} />
              </div>
              <button id="analyze-btn"
                className="w-full bg-accent-cyan text-slate-900 font-bold text-xl py-4 rounded-lg hover:bg-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAnalyze}>
                Analisar Carreira
              </button>
              {error && <div className="mt-4 text-red-400">{error}</div>}
            </div>
          </div>
        )}
        {/* Tela 2: Análise em Progresso */}
        {appState === "loading" && (
          <div id="loading-screen" className="text-center">
            <div className="loader w-16 h-16 rounded-full border-4 border-slate-700 mx-auto"></div>
            <h2 className="text-3xl font-bold mt-8">Analisando seu perfil...</h2>
            <p className="text-lg text-slate-400">Nossa IA está conectando os pontos. Isso pode levar alguns segundos.</p>
            <div id="loading-steps" className="mt-12 text-left max-w-md mx-auto space-y-4">
              {steps.map((text, idx) => (
                <div key={idx} className={`step-item flex items-center text-slate-400 transition-all duration-500${currentStep > idx ? " active" : ""}`}>
                  <div className={`step-circle w-8 h-8 rounded-full border-2 ${currentStep > idx ? "border-accent-cyan text-accent-cyan" : "border-slate-600"} flex items-center justify-center mr-4`}>
                    <i className={`fa-solid ${currentStep > idx ? "fa-check" : "fa-hourglass-half"}`}></i>
                  </div>
                  <span className={`step-text text-lg${currentStep > idx ? " text-slate-100" : ""}`}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Tela 3: Resultados */}
        {appState === "results" && analysisData && (
          <div id="results-screen">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-black">Seu Roadmap de Carreira</h1>
              <p className="text-xl text-slate-300 mt-2">Análise para o cargo de: <span id="resultado-cargo" className="font-bold accent-cyan">{analysisData.cargoAlmejado}</span></p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Coluna da Esquerda: Pontos Fortes e a Desenvolver */}
              <div className="space-y-8">
                {/* Card Pontos Fortes */}
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-green-400 mb-4"><i className="fa-solid fa-check-circle mr-2"></i>Seus Pontos Fortes</h3>
                  <ul id="pontos-fortes-lista" className="space-y-2 text-lg">
                    {analysisData.pontosFortes.length === 0 && <li>Nenhum ponto forte identificado.</li>}
                    {analysisData.pontosFortes.map((skill, i) => (
                      <li key={i}><i className="fa-solid fa-star text-green-400 mr-3"></i>{skill}</li>
                    ))}
                  </ul>
                </div>
                {/* Card Oportunidades */}
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4"><i className="fa-solid fa-star mr-2"></i>Oportunidades de Desenvolvimento</h3>
                  <ul id="oportunidades-lista" className="space-y-3 text-lg">
                    {analysisData.pontosDesenvolver.length === 0 && <li>Nenhuma oportunidade identificada.</li>}
                    {analysisData.pontosDesenvolver.map((skill, i) => (
                      <li key={i}>
                        <span className="font-bold">{skill}</span>
                        {/* Aqui pode-se adicionar badges de importância se desejado */}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Coluna da Direita: Plano de Ação */}
              <div className="glass-card p-6 rounded-xl bg-slate-800">
                <h3 className="text-2xl font-bold accent-cyan mb-4"><i className="fa-solid fa-graduation-cap mr-2"></i>Plano de Ação Sugerido</h3>
                <div id="plano-acao-lista" className="space-y-6">
                  {analysisData.planoAcao.length === 0 && <div>Nenhum curso sugerido.</div>}
                  {analysisData.planoAcao.map((item, i) => (
                    <div key={i} className="border-l-4 border-accent-cyan pl-4">
                      <h4 className="text-xl font-bold">{item.competencia}</h4>
                      {item.cursos.length === 0 ? (
                        <p className="text-slate-300 mt-1">Nenhum curso encontrado.</p>
                      ) : (
                        <div className="mt-3">
                          {item.cursos.map((curso, j) => (
                            <a key={j} href={curso.url} target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-700 hover:bg-slate-600 text-accent-cyan font-bold py-2 px-4 rounded-lg transition-all mb-2">
                              <i className="fa-solid fa-book-open-reader mr-2"></i>Ver curso: {curso.nome} ({curso.plataforma})
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <button id="restart-btn"
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold text-lg py-3 px-8 rounded-lg transition-all"
                onClick={handleRestart}>
                Analisar Outro Cargo
              </button>
            </div>
          </div>
        )}
        {/* Tela de erro */}
        {appState === "error" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-400">Erro ao processar análise</h2>
            <p className="text-lg text-slate-400">{error}</p>
            <button onClick={handleRestart} className="mt-6 bg-slate-700 hover:bg-slate-600 text-white font-bold text-lg py-3 px-8 rounded-lg transition-all">Tentar Novamente</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
