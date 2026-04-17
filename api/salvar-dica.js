import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido.' });
  }

  try {
    const body = req.body;

    if (!body) {
      return res.status(400).json({ erro: 'Body vazio' });
    }

    const { nome, mensagem } = body;

    if (!nome || !mensagem) {
      return res.status(400).json({
        erro: 'Nome e mensagem são obrigatórios.'
      });
    }

    const nomeSeguro = nome.replace(/[^a-zA-Z0-9]/g, '_');

    const arquivo = `Dicas_Noivos/${nomeSeguro}_${Date.now()}.txt`;

    const conteudo = `Nome: ${nome}
Dica: ${mensagem}
`;

    await put(arquivo, conteudo, {
      access: 'public'
    });

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Dica salva!'
    });

  } catch (erro) {
    console.error("ERRO REAL:", erro);

    return res.status(500).json({
      erro: erro.message
    });
  }
}
