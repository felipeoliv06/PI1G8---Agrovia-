# Agrovia — Gestão Agrícola

Projeto de interface web para acompanhamento e gestão de uma propriedade agrícola.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Tailwind CSS (carregado por CDN)
- Chart.js (carregado por CDN)
- Font Awesome (carregado por CDN)

## Como executar

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` em um navegador.
3. Para uma experiência melhor durante o desenvolvimento, use a extensão Live Server no Visual Studio Code.

É necessário ter conexão com a internet para carregar as bibliotecas externas usadas por CDN.

## Estado atual

Esta versão é um protótipo de interface. O painel contém dados demonstrativos e o acesso/cadastro ainda não usa autenticação real nem banco de dados. Os dados exibidos não representam informações reais de uma fazenda.

## Estrutura

```text
agrovia/
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

## Próximas etapas

- Implementar autenticação segura.
- Integrar um banco de dados.
- Criar operações de cadastro, edição e exclusão para safras, lotes, despesas e máquinas.
- Integrar dados meteorológicos reais.
- Criar relatórios com dados cadastrados.

## Observação

Não coloque senhas, chaves de API ou dados pessoais no repositório. Quando serviços externos forem integrados, suas credenciais devem ficar em variáveis de ambiente no servidor, nunca expostas no JavaScript do navegador.
