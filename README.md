# CRUD Frontend

## 🔨 Detalhes para execução do projeto:

1. Entrar no diretório onde o projeto será clonado;
2. Abrir o Git Bash;
3. Executar "git clone https://github.com/marcinhuk/CrudFrontendPortfolio.git";
4. Executar "cd ./CrudFrontendPortfolio";
5. Executar "npm install";
6. Criar a pasta "environments" dentro de "/src";
6. Criar os arquivos abaixo dentro da pasta "/src/environments":
	- environments.dv.ts
	- environments.pd.ts
7. Dentro de cada arquivo criar as constantes abaixo:

```javascript
	export const API_URL    = 'http://localhost:3099'
	export const AVATAR_URL = 'http://localhost:3099/avatars/'
	export const USULOG     = 'login_default_na_tela_de_login'
	export const USUSEN     = 'senha_default_na_tela_de_login'
```

8. Executar "npm start".