import { useState } from 'react';

type Detail = {
  mes: number;
  saldoInicial: string;
  parcela: string;
  juros: string;
  amortizacao: string;
  saldoFinal: string;
};

const CarFinanceCalculator = () => {
  const [valorCarro, setValorCarro] = useState(100000);
  const [entrada, setEntrada] = useState(50000);
  const [juros, setJuros] = useState(2.3);
  const [parcelas, setParcelas] = useState(36);
  const [resultado, setResultado] = useState('');
  const [detalhes, setDetalhes] = useState<Detail[]>([]);

  const calcularFinanciamento = () => {
    const valorFinanciado = valorCarro - entrada;
    const taxa = juros / 100;
    const n = parcelas;

    const parcela =
      taxa > 0
        ? (valorFinanciado * taxa) / (1 - Math.pow(1 + taxa, -n))
        : valorFinanciado / n;

    const detalhesTemp: Detail[] = [];
    let saldoDevedor = valorFinanciado;

    for (let mes = 1; mes <= n; mes++) {
      const jurosMes = saldoDevedor * taxa;
      const amortizacao = parcela - jurosMes;
      const novoSaldo = saldoDevedor - amortizacao;

      detalhesTemp.push({
        mes,
        saldoInicial: saldoDevedor.toFixed(2),
        parcela: parcela.toFixed(2),
        juros: jurosMes.toFixed(2),
        amortizacao: amortizacao.toFixed(2),
        saldoFinal: novoSaldo.toFixed(2),
      });

      saldoDevedor = novoSaldo;
    }

    const totalPago = parcela * n;
    const totalJuros = totalPago - valorFinanciado;

    setResultado(
      `Total pago: R$ ${totalPago.toFixed(2)} | Total de juros: R$ ${totalJuros.toFixed(2)}`,
    );
    setDetalhes(detalhesTemp);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-background text-foreground rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Calculadora de Financiamento
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          label="Valor do carro (R$):"
          value={valorCarro}
          onChange={(e) => setValorCarro(Number(e.target.value))}
        />
        <Input
          label="Entrada (R$):"
          value={entrada}
          onChange={(e) => setEntrada(Number(e.target.value))}
        />
        <Input
          label="Taxa de juros mensal (%):"
          value={juros}
          onChange={(e) => setJuros(Number(e.target.value))}
        />
        <Input
          label="Prazo (meses):"
          value={parcelas}
          onChange={(e) => setParcelas(Number(e.target.value))}
        />
      </div>

      <button
        onClick={calcularFinanciamento}
        className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary/90 transition"
      >
        Calcular
      </button>

      {resultado && (
        <h2 className="mt-6 text-xl font-bold text-center text-blue-600 dark:text-blue-400">
          {resultado}
        </h2>
      )}

      {detalhes.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full table-auto border border-border text-sm">
            <thead className="bg-muted dark:bg-zinc-800">
              <tr>
                <Th>Mês</Th>
                <Th>Saldo Inicial</Th>
                <Th>Parcela</Th>
                <Th>Juros</Th>
                <Th>Amortização</Th>
                <Th>Saldo Final</Th>
              </tr>
            </thead>
            <tbody>
              {detalhes.map((linha) => (
                <tr
                  key={linha.mes}
                  className="hover:bg-muted/50 dark:hover:bg-zinc-800/50 text-center"
                >
                  <Td>{linha.mes}</Td>
                  <Td>R$ {linha.saldoInicial}</Td>
                  <Td>R$ {linha.parcela}</Td>
                  <Td>R$ {linha.juros}</Td>
                  <Td>R$ {linha.amortizacao}</Td>
                  <Td>R$ {linha.saldoFinal}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-muted-foreground">
      {label}
    </label>
    <input
      type="number"
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-border rounded-md bg-muted dark:bg-zinc-800"
    />
  </div>
);

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-2 border">{children}</th>
);
const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="border px-4 py-2">{children}</td>
);

export default CarFinanceCalculator;
