import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Copy } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}\'|:<>?,./';

    let charPool = lowercaseChars;
    if (includeUppercase) charPool += uppercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      newPassword += charPool[randomIndex];
    }
    setPassword(newPassword);
  };

  const handleCopyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
        .then(() => {
          toast.success('Senha copiada para a área de transferência!');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          toast.error('Falha ao copiar a senha.');
        });
    } else {
      toast.warning('Gere uma senha antes de copiar.');
    }
  };

  return (
    <div className="p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Gerador de Senha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Input
              readOnly
              value={password}
              placeholder="Sua senha segura"
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

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="length" className="font-medium">
                Comprimento da Senha: {length}
              </label>
              <Slider
                id="length"
                min={6}
                max={32}
                step={1}
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
                className="w-1/2"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={(checked) => setIncludeUppercase(Boolean(checked))} />
              <label htmlFor="uppercase" className="font-medium">Incluir Letras Maiúsculas</label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={(checked) => setIncludeNumbers(Boolean(checked))} />
              <label htmlFor="numbers" className="font-medium">Incluir Números</label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={(checked) => setIncludeSymbols(Boolean(checked))} />
              <label htmlFor="symbols" className="font-medium">Incluir Símbolos</label>
            </div>
          </div>

          <Button onClick={generatePassword} className="w-full">
            Gerar Senha
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGenerator;
