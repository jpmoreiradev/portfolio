import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Copy } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const CpfGenerator = () => {
  const [cpf, setCpf] = useState('');
  const [cpfToValidate, setCpfToValidate] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const calculateCpfDigit = (cpfPartial: number[]): number => {
    const length = cpfPartial.length;
    let sum = 0;
    const multiplierStart = length + 1;

    for (let i = 0; i < length; i++) {
      sum += cpfPartial[i] * (multiplierStart - i);
    }

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const validateCpf = (cpf: string): boolean => {
    const cleanedCpf = cpf.replace(/[^\d]/g, '');

    if (cleanedCpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1{10}$/.test(cleanedCpf)) {
      return false;
    }

    const cpfDigits = cleanedCpf.split('').map(Number);
    const baseDigits = cpfDigits.slice(0, 9);
    const providedDigit1 = cpfDigits[9];
    const providedDigit2 = cpfDigits[10];

    const calculatedDigit1 = calculateCpfDigit(baseDigits);

    if (calculatedDigit1 !== providedDigit1) {
      return false;
    }

    const baseDigitsWithFirstVerifier = [...baseDigits, calculatedDigit1];
    const calculatedDigit2 = calculateCpfDigit(baseDigitsWithFirstVerifier);

    if (calculatedDigit2 !== providedDigit2) {
      return false;
    }

    return true;
  };

  const generateCpf = (formatted = false): string => {
    let generatedCpf;
    let isValid = false;

    while (!isValid) {
      const baseDigits = [];
      for (let i = 0; i < 9; i++) {
        baseDigits.push(Math.floor(Math.random() * 10));
      }

      const digit1 = calculateCpfDigit(baseDigits);
      const digitsWithFirstVerifier = [...baseDigits, digit1];
      const digit2 = calculateCpfDigit(digitsWithFirstVerifier);

      const rawCpf = [...baseDigits, digit1, digit2].join('');

      if (validateCpf(rawCpf)) {
        generatedCpf = rawCpf;
        isValid = true;
      }
    }

    if (formatted) {
      return generatedCpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4',
      );
    } else {
      return generatedCpf;
    }
  };

  const handleGenerateCpf = () => {
    setCpf(generateCpf(true));
  };

  const handleValidateCpf = () => {
    setIsValid(validateCpf(cpfToValidate));
  };

  const handleCopyToClipboard = () => {
    if (cpf) {
      navigator.clipboard
        .writeText(cpf)
        .then(() => {
          toast.success('CPF copiado para a área de transferência!');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
          toast.error('Falha ao copiar o CPF.');
        });
    } else {
      toast.warning('Gere um CPF antes de copiar.');
    }
  };

  const formatCpf = (value: string) => {
    const cleanedValue = value.replace(/[^\d]/g, '');
    const match = cleanedValue.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);

    if (!match) {
      return value;
    }

    let formatted = '';
    if (match[1]) {
      formatted += match[1];
    }
    if (match[2]) {
      formatted += `.${match[2]}`;
    }
    if (match[3]) {
      formatted += `.${match[3]}`;
    }
    if (match[4]) {
      formatted += `-${match[4]}`;
    }

    return formatted;
  };

  return (
    <div className="bg-background flex justify-center items-center pt-20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Gerador e Validador de CPF
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-center">
              Gerador de CPF
            </h3>

            <div className="grid grid-cols-12 gap-2 mt-2">
              <div className="relative col-span-9">
                <Input
                  readOnly
                  value={cpf}
                  placeholder="CPF Gerado"
                  className="text-center pr-10"
                />
                <Button
                  onClick={handleCopyToClipboard}
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <Button onClick={handleGenerateCpf} className="w-full col-span-3">
                Gerar
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-center">
              Validador de CPF
            </h3>

            <div className="grid grid-cols-12 gap-2 mt-2">
              <Input
                value={cpfToValidate}
                onChange={(e) => setCpfToValidate(formatCpf(e.target.value))}
                placeholder="Digite um CPF para validar"
                className="text-center col-span-9"
                maxLength={14}
              />

              <Button onClick={handleValidateCpf} className="w-full col-span-3">
                Validar
              </Button>
            </div>

            {isValid !== null && (
              <div className="mt-4">
                {isValid ? (
                  <Alert variant="default" className="text-center">
                    <AlertTitle>CPF Válido</AlertTitle>

                    <AlertDescription>
                      O CPF informado é válido.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive" className="text-center">
                    <AlertTitle>CPF Inválido</AlertTitle>

                    <AlertDescription>
                      O CPF informado é inválido.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CpfGenerator;
