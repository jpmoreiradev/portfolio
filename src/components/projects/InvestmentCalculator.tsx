import React, { useState } from 'react';

type Detail = {
  mes: number;
  rendimentoBruto: string;
  ir: string;
  rendimentoLiquido: string;
  aporte: string;
  saldo: string;
};

const InvestmentCalculator = () => {
  const [capital, setCapital] = useState(1000);
  const [aporte, setAporte] = useState(200);
  const [taxa, setTaxa] = useState(1);
  const [periodo, setPeriodo] = useState(12);
  const [imposto, setImposto] = useState(22.5);
  const [resultado, setResultado] = useState('');
  const [detalhes, setDetalhes] = useState<Detail[]>([]);

  const calcularInvestimento = () => {
    let saldo = capital;
    const detalhesTemp = [];

    for (let mes = 1; mes <= periodo; mes++) {
      const rendimentoBruto = saldo * (taxa / 100);
      const ir = rendimentoBruto * (imposto / 100);
      const rendimentoLiquido = rendimentoBruto - ir;
      saldo += rendimentoLiquido + aporte;

      detalhesTemp.push({
        mes,
        rendimentoBruto: rendimentoBruto.toFixed(2),
        ir: ir.toFixed(2),
        rendimentoLiquido: rendimentoLiquido.toFixed(2),
        aporte: aporte.toFixed(2),
        saldo: saldo.toFixed(2),
      });
    }

    setResultado(`Saldo final: R$ ${saldo.toFixed(2)}`);
    setDetalhes(detalhesTemp);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-background text-foreground rounded-xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Calculadora de Investimento
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">
            Capital Inicial (R$):
          </label>
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-md bg-muted dark:bg-zinc-800"
          />
        </div>

        <div>
          <label
            htmlFor="aporte_mensal"
            className="block text-sm font-medium mb-1 text-muted-foreground"
          >
            {' '}
            Aporte Mensal (R$):
          </label>
          <input
            type="number"
            value={aporte}
            onChange={(e) => setAporte(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-md bg-muted dark:bg-zinc-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">
            Taxa de Juros (% ao mês):
          </label>
          <input
            type="number"
            value={taxa}
            onChange={(e) => setTaxa(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-md bg-muted dark:bg-zinc-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">
            Período (meses):
          </label>
          <input
            type="number"
            value={periodo}
            onChange={(e) => setPeriodo(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-md bg-muted dark:bg-zinc-800"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-muted-foreground">
            Imposto (% sobre rendimento):
          </label>
          <input
            type="number"
            value={imposto}
            onChange={(e) => setImposto(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-md bg-muted dark:bg-zinc-800"
          />
        </div>
      </div>

      <button
        onClick={calcularInvestimento}
        className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary/90 transition"
      >
        Calcular
      </button>

      {resultado && (
        <h2 className="mt-6 text-xl font-bold text-center text-green-600 dark:text-green-400">
          {resultado}
        </h2>
      )}

      {detalhes.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full table-auto border border-border text-sm">
            <thead className="bg-muted dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-2 border">Mês</th>
                <th className="px-4 py-2 border">Rendimento Bruto</th>
                <th className="px-4 py-2 border">IR</th>
                <th className="px-4 py-2 border">Rendimento Líquido</th>
                <th className="px-4 py-2 border">Aporte</th>
                <th className="px-4 py-2 border">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {detalhes.map((linha) => (
                <tr
                  key={linha.mes}
                  className="hover:bg-muted/50 dark:hover:bg-zinc-800/50 text-center"
                >
                  <td className="border px-4 py-2">{linha.mes}</td>
                  <td className="border px-4 py-2">
                    R$ {linha.rendimentoBruto}
                  </td>
                  <td className="border px-4 py-2">R$ {linha.ir}</td>
                  <td className="border px-4 py-2">
                    R$ {linha.rendimentoLiquido}
                  </td>
                  <td className="border px-4 py-2">R$ {linha.aporte}</td>
                  <td className="border px-4 py-2">R$ {linha.saldo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InvestmentCalculator;
