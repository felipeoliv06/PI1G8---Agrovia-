# Agrovia — Gestão Agrícola

Esta atualização sincroniza o repositório com a versão modular Fase 3.1 revisada e conecta o frontend ao projeto Supabase ativo.

## O que está incluído
- Autenticação Supabase: cadastro, login, logout e recuperação de senha.
- Cadastro, listagem e exclusão de propriedades.
- Módulos JavaScript separados por responsabilidade.
- Banco PostgreSQL com perfis, propriedades, culturas, talhões e safras.
- RLS por usuário e validações de integridade entre safras, talhões e culturas.
- Correções de inicialização da sessão, validação de área e tratamento de erros.

## Executar localmente
1. Instale Node.js.
2. Confira `js/config/env.js`. Ele usa somente a URL e a chave **publishable** do Supabase. Nunca coloque `service_role` ou `sb_secret` no navegador.
3. Execute `npx serve .` na raiz do projeto.
4. Abra o endereço local informado pelo servidor.

Não abra o arquivo com `file://`, pois a aplicação usa módulos ES.

## Verificações
`npm run check` verifica a sintaxe dos módulos JavaScript.

Os fluxos de cadastro/login e CRUD precisam de teste manual em navegador com uma conta de teste. O banco remoto foi verificado separadamente: cinco tabelas com RLS ativo, 18 políticas e sete triggers.

## Escopo atual
O frontend implementa autenticação e propriedades. As telas de culturas, talhões e safras ainda serão desenvolvidas; as tabelas e regras de segurança já existem no Supabase.

## Segurança
A chave publishable é própria para frontend e deve permanecer protegida por RLS. Nunca exponha chaves secretas ou service role.
