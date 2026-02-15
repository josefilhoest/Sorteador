#!/usr/bin/env python3
"""
Ferramenta para gerar ícones PNG para PWA
Redimensiona uma imagem para os tamanhos necessários
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
    print("✅ Pillow encontrado!")
except ImportError:
    print("⚠️ Pillow não instalado. Instalando...")
    os.system("pip install Pillow")
    from PIL import Image, ImageOps

def gerar_icones(imagem_entrada, pasta_saida="."):
    """
    Gera os 4 ícones necessários para PWA
    
    Args:
        imagem_entrada (str): Caminho da imagem de entrada
        pasta_saida (str): Pasta onde salvar os ícones
    """
    
    # Verificar se arquivo existe
    if not os.path.exists(imagem_entrada):
        print(f"❌ Erro: Arquivo '{imagem_entrada}' não encontrado!")
        return False
    
    try:
        # Abrir imagem
        print(f"📂 Abrindo imagem: {imagem_entrada}")
        img = Image.open(imagem_entrada)
        
        # Converter para RGBA se necessário
        if img.mode != "RGBA":
            img = img.convert("RGBA")
        
        # Criar pasta de saída se não existir
        Path(pasta_saida).mkdir(parents=True, exist_ok=True)
        
        # Configuração dos ícones
        tamanhos = [
            {
                "size": (192, 192),
                "nome": "icon-192.png",
                "descricao": "Ícone padrão 192x192"
            },
            {
                "size": (512, 512),
                "nome": "icon-512.png",
                "descricao": "Ícone grande 512x512"
            },
            {
                "size": (192, 192),
                "nome": "icon-192-maskable.png",
                "descricao": "Ícone maskable 192x192",
                "maskable": True
            },
            {
                "size": (512, 512),
                "nome": "icon-512-maskable.png",
                "descricao": "Ícone maskable 512x512",
                "maskable": True
            }
        ]
        
        for config in tamanhos:
            print(f"\n🎨 Gerando {config['descricao']}...")
            
            # Redimensionar
            img_resized = img.resize(config["size"], Image.Resampling.LANCZOS)
            
            # Se for maskable, adicionar padding e fundo
            if config.get("maskable"):
                # Criar imagem maior com padding
                size = config["size"]
                padding = int(size[0] * 0.1)  # 10% de padding
                
                background = Image.new("RGBA", size, (0, 0, 0, 0))
                img_with_padding = Image.new("RGBA", (size[0] + padding*2, size[1] + padding*2), (0, 0, 0, 0))
                img_with_padding.paste(img_resized, (padding, padding), img_resized)
                img_with_padding = img_with_padding.resize(size, Image.Resampling.LANCZOS)
                img_resized = img_with_padding
            
            # Salvar
            caminho_saida = os.path.join(pasta_saida, config["nome"])
            img_resized.save(caminho_saida, "PNG", quality=95)
            print(f"✅ Salvo: {caminho_saida}")
        
        print("\n" + "="*50)
        print("🎉 Todos os ícones foram gerados com sucesso!")
        print("="*50)
        print("\n📋 Arquivos criados:")
        for config in tamanhos:
            print(f"  ✔ {config['nome']}")
        
        print("\n💡 Próximos passos:")
        print("  1. Verifique se os arquivos estão na pasta do projeto")
        print("  2. Abra o index.html em um navegador Chrome/Edge")
        print("  3. Clique em '...' → 'Instalar App'")
        print("  4. Seu PWA estará pronto! 🚀")
        
        return True
        
    except Exception as e:
        print(f"❌ Erro ao processar imagem: {e}")
        return False

if __name__ == "__main__":
    # Procurar a imagem do dado
    imagens_possiveis = [
        "./img/pngwing.com.png",
        "img/pngwing.com.png",
        "./pngwing.com.png"
    ]
    
    imagem_encontrada = None
    for caminho in imagens_possiveis:
        if os.path.exists(caminho):
            imagem_encontrada = caminho
            break
    
    if not imagem_encontrada:
        print("❌ Imagem não encontrada!")
        print("\nProcurando em:")
        for caminho in imagens_possiveis:
            print(f"  ✗ {caminho}")
        
        print("\n💡 Dica: Coloque uma imagem PNG chamada 'pngwing.com.png' na pasta 'img/'")
        sys.exit(1)
    
    print(f"🎯 Usando imagem: {imagem_encontrada}\n")
    sucesso = gerar_icones(imagem_encontrada)
    sys.exit(0 if sucesso else 1)
