export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido.' });
  }

  try {
    const { nome, mensagem } = req.body || {};

    return res.status(200).json({
      sucesso: true,
      recebeu: { nome, mensagem }
    });
  } catch (erro) {
    return res.status(500).json({
      erro: erro.message || 'Erro interno'
    });
  }
}
