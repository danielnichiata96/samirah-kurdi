Este diretório contém as imagens usadas pelos 3 cards da página inicial.

Por limitações do ambiente de edição aqui não movi os arquivos binários automaticamente. Para preservar histórico do git, execute no seu terminal (na raiz do projeto):

```zsh
# cria a pasta (se não existir)
mkdir -p public/images/cards

# move os arquivos e preserva histórico
git mv card_1.png public/images/cards/card_1.png
git mv card_2.png public/images/cards/card_2.png
git mv card_3.png public/images/cards/card_3.png

# commitando as mudanças
git commit -m "Move card images to public/images/cards and update paths"
```

Se você preferir copiar sem preservar histórico, use `mv` em vez de `git mv`.
