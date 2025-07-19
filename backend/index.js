const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Função utilitária para ler JSON local
function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

// Função mock de "análise IA" (substitua por chamada real à API Gemini se desejar)
async function analisarCurriculo(textoCV, cargoAlmejado, vagas, cursos) {
    // 1. Filtrar vagas relevantes
    const vagasRelevantes = vagas.filter(v => v.titulo_vaga.toLowerCase().includes(cargoAlmejado.toLowerCase()));
    // 2. Mock: extrair "competências" do CV (simplesmente pegar palavras-chave)
    const competenciasUsuario = [];
    if (textoCV.match(/node\.js/i)) competenciasUsuario.push('Node.js');
    if (textoCV.match(/docker/i)) competenciasUsuario.push('Docker');
    if (textoCV.match(/aws|azure/i)) competenciasUsuario.push('Cloud Computing (AWS/Azure)');
    if (textoCV.match(/git/i)) competenciasUsuario.push('Git');
    if (textoCV.match(/react/i)) competenciasUsuario.push('React.js');
    if (textoCV.match(/typescript/i)) competenciasUsuario.push('TypeScript');
    if (textoCV.match(/kubernetes/i)) competenciasUsuario.push('Containerização com Docker & Kubernetes');
    if (textoCV.match(/ci\/cd|jenkins|gitlab/i)) competenciasUsuario.push('CI/CD (Jenkins, GitLab)');
    if (textoCV.match(/comunica/i)) competenciasUsuario.push('Soft Skills: Comunicação');

    // 3. Mock: competências exigidas nas vagas relevantes
    const competenciasVagas = [];
    vagasRelevantes.forEach(vaga => {
        const desc = vaga.descricao_completa.toLowerCase();
        if (desc.includes('docker')) competenciasVagas.push('Docker');
        if (desc.includes('aws') || desc.includes('azure')) competenciasVagas.push('Cloud Computing (AWS/Azure)');
        if (desc.includes('git')) competenciasVagas.push('Git');
        if (desc.includes('react')) competenciasVagas.push('React.js');
        if (desc.includes('typescript')) competenciasVagas.push('TypeScript');
        if (desc.includes('kubernetes')) competenciasVagas.push('Containerização com Docker & Kubernetes');
        if (desc.includes('ci/cd') || desc.includes('jenkins') || desc.includes('gitlab')) competenciasVagas.push('CI/CD (Jenkins, GitLab)');
        if (desc.includes('comunica')) competenciasVagas.push('Soft Skills: Comunicação');
    });
    // 4. Pontos fortes e a desenvolver
    const pontosFortes = competenciasUsuario.filter(c => competenciasVagas.includes(c));
    const pontosDesenvolver = competenciasVagas.filter(c => !competenciasUsuario.includes(c));
    // 5. Enriquecer com cursos
    const planoAcao = pontosDesenvolver.map(comp => {
        const curso = cursos.find(c => c.competencia === comp);
        return {
            competencia: comp,
            cursos: curso ? curso.cursos : []
        };
    });
    return {
        cargoAlmejado,
        pontosFortes,
        pontosDesenvolver,
        planoAcao
    };
}

app.post('/analyze', upload.single('cv'), async (req, res) => {
    try {
        const cargoAlmejado = req.body.cargoAlmejado;
        if (!req.file || !cargoAlmejado) {
            return res.status(400).json({ error: 'Arquivo de currículo e cargoAlmejado são obrigatórios.' });
        }
        // Extrair texto do PDF
        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(dataBuffer);
        const textoCV = pdfData.text;
        // Carregar vagas e cursos
        const vagas = readJson(path.join(__dirname, 'vagas.json'));
        const cursos = readJson(path.join(__dirname, 'cursos.json'));
        // Analisar
        const resultado = await analisarCurriculo(textoCV, cargoAlmejado, vagas, cursos);
        // Limpar arquivo temporário
        fs.unlinkSync(req.file.path);
        res.json(resultado);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao processar análise.' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});
