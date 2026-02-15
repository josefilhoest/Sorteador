#!/usr/bin/env node
/**
 * Ferramenta para gerar ícones PNG para PWA (Node.js)
 * Usar se preferir: node gerar-icones.js
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// Tentar carregar Sharp (mais rápido) ou usar jimp
let sharp;
try {
    sharp = require('sharp');
    console.log('✅ Sharp encontrado!');
} catch (e) {
    console.log('⚠️ Sharp não instalado. Instalando...');
    require('child_process').execSync('npm install sharp', { stdio: 'inherit' });
    sharp = require('sharp');
}

async function gerarIcones(caminhoImagem) {
    try {
        if (!fs.existsSync(caminhoImagem)) {
            console.log(`❌ Erro: Arquivo '${caminhoImagem}' não encontrado!`);
            return false;
        }

        console.log(`📂 Abrindo imagem: ${caminhoImagem}\n`);

        const tamanhos = [
            { size: 192, nome: 'icon-192.png', desc: 'Ícone padrão 192x192' },
            { size: 512, nome: 'icon-512.png', desc: 'Ícone grande 512x512' },
            { size: 192, nome: 'icon-192-maskable.png', desc: 'Ícone maskable 192x192', maskable: true },
            { size: 512, nome: 'icon-512-maskable.png', desc: 'Ícone maskable 512x512', maskable: true }
        ];

        for (const config of tamanhos) {
            console.log(`🎨 Gerando ${config.desc}...`);

            let pipeline = sharp(caminhoImagem)
                .resize(config.size, config.size, {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                });

            if (config.maskable) {
                const padding = Math.floor(config.size * 0.1);
                pipeline = sharp({
                    create: {
                        width: config.size + padding * 2,
                        height: config.size + padding * 2,
                        channels: 4,
                        background: { r: 0, g: 0, b: 0, alpha: 0 }
                    }
                })
                    .composite([{
                        input: await pipeline.toBuffer(),
                        top: padding,
                        left: padding
                    }])
                    .resize(config.size, config.size);
            }

            await pipeline.toFile(config.nome);
            console.log(`✅ Salvo: ${config.nome}`);
        }

        console.log('\n' + '='.repeat(50));
        console.log('🎉 Todos os ícones foram gerados com sucesso!');
        console.log('='.repeat(50));
        console.log('\n💡 Próximos passos:');
        console.log('  1. Verifique se os arquivos estão na pasta do projeto');
        console.log('  2. Abra o index.html em um navegador Chrome/Edge');
        console.log('  3. Clique em "..." → "Instalar App"');
        console.log('  4. Seu PWA estará pronto! 🚀\n');

        return true;

    } catch (error) {
        console.error(`❌ Erro ao processar imagem: ${error.message}`);
        return false;
    }
}

// Procurar a imagem
const imagesPossiveis = ['./img/pngwing.com.png', './pngwing.com.png'];
let imagemEncontrada = null;

for (const caminho of imagesPossiveis) {
    if (fs.existsSync(caminho)) {
        imagemEncontrada = caminho;
        break;
    }
}

if (!imagemEncontrada) {
    console.log('❌ Imagem não encontrada!');
    console.log('\nProcurada em:');
    imagesPossiveis.forEach(c => console.log(`  ✗ ${c}`));
    console.log('\n💡 Dica: Coloque a imagem PNG na pasta img/');
    process.exit(1);
}

console.log(`🎯 Usando imagem: ${imagemEncontrada}\n`);
gerarIcones(imagemEncontrada).then(sucesso => {
    process.exit(sucesso ? 0 : 1);
});
