# 🎨 Gerador de Ícones PWA - Dev Sorteador

## 📖 Como Usar

Existem **3 formas** de gerar os ícones necessários:

---

## ✅ Opção 1: Python (Recomendado - Mais Rápido)

### Pré-requisito:
- Python 3.6+ instalado

### Executar:
```bash
python gerar-icones.py
```

**Ou no VS Code:**
- Abra o terminal integrado
- Cole o comando acima
- Pressione Enter

---

## ✅ Opção 2: Node.js

### Pré-requisito:
- Node.js instalado

### Executar:
```bash
node gerar-icones.js
```

---

## ✅ Opção 3: Online (Sem Instalação)

Abra `gerar-icones.html` no seu navegador (arquivo vem incluído).

---

## 📁 O que os Scripts Fazem

1. Encontram automaticamente a imagem `img/pngwing.com.png`
2. Criam 4 ícones PNG:
   - `icon-192.png` - Ícone padrão 192x192
   - `icon-512.png` - Ícone grande 512x512
   - `icon-192-maskable.png` - Para displays com notch
   - `icon-512-maskable.png` - Para displays com notch

---

## 🚀 Próximos Passos

Depois de gerar os ícones:

1. Abra `index.html` em um navegador (Chrome, Edge, Firefox)
2. Clique em "..." (três pontos)
3. Selecione "Instalar App"
4. Seu PWA estará pronto! 📱

---

## 💡 Dicas

- Os ícones aparecem na tela inicial do celular
- O app funciona offline
- Carrega muito rápido (funciona em cache)
- Não precisa de App Store!

---

## ❓ Problemas?

**Script não encontra a imagem:**
- Certifique-se que `img/pngwing.com.png` existe
- Ou coloque uma imagem PNG de outro nome em qualquer lugar

**Erro de permissão:**
- No Windows: Execute como Administrador
- No Mac/Linux: Use `chmod +x gerar-icones.py`

---

Feito com ❤️ para Dev Sorteador
