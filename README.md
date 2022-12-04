[Home](./README.md)

<center>
  <h1>{ source code formatters}</h1>
</center>

# feat: pesquisar eslint, prettier, tslint, editorconfig para frontend [#6217](https://dev.azure.com/glok/Bibliotecas/_sprints/taskboard/Bibliotecas%20Team/Bibliotecas/Sprint%201?workitem=6217)

PoC sobre ESLint Prettier TSLint para frontend, com objetivo de tirar as dúvidas de programas e configurações para não acontecer conflitos e deixar o código mais padrão possível entre programadores.

1. [Prettier](./docs/1.prettier.md)
2. [ESLint](./docs/2.eslint.md)
3. [TSLint](./docs/3.tslint.md)
4. [EditorConfig](./docs/4.editorconfig.md)
5. [StyleLint](./docs/5.stylelint.md)

# Critérios de aceitação:

## TypeScript:

1. métodos e propriedades devem explicitar o **encapsulamento**
2. métodos e propriedades devem explicitar o **retorno**
3. ordenar propriedades **public**, **protected**, **private** e não precisa de **alfabética**
4. ordenar métodos **public**, **protected**, **private** e em ordem **alfabética**
5. nomes de propriedades deve ser:

- public: UpperCamelCase, lowerCamelCase
- protect: UpperCamelCase, lowerCamelCase
- private: \_lowerCamelCase

6. nome de métodos deve ser:

- public: lowerCamelCase
- protect: lowerCamelCase
- private: \_lowerCamelCase

7. nomes de parâmetros deve ser **pUpperCamelCase**
8. nomes de variáveis deve ser **xUpperCamelCase**
9. nomes de interfaces deve iniciar com I ex: **INomeClasse**
10. nomes de funções **top level** deve ser **lowerCamelCase**
11. **imports** deve de separado de dependências de terceiros
12. **imports** deve ser ordenado (ambos em ordem alfabética):

- sem escopo
- \* as algumaCoisa
- com escopo (dentro do braces deve ser em ordem **alfabética**)

|                            | Prettier | ESLint | TypeScript-EsLint | EditorConfig |
| -------------------------- | :------: | :----: | :---------------: | :----------: |
| formatar automático        |    ✅    |   🟡   |        🟡         |      🟡      |
| encapsulamento             |    ❌    |   ❌   |        ✅         |              |
| retorno explicit           |    ❌    |   ❌   |        ✅         |              |
| ordenar propriedades       |    ❌    |   ❌   |        ✅         |              |
| ordenar métodos            |    ❌    |   ❌   |        ✅         |              |
| nomes de propriedades      |    ❌    |   ❌   |        ✅         |              |
| nome de métodos            |    ❌    |   ❌   |        ✅         |              |
| nomes de parâmetros        |    ❌    |   ❌   |        ✅         |              |
| nomes de variáveis         |    ❌    |   ❌   |        ✅         |              |
| nomes de interfaces        |    ❌    |   ❌   |        ✅         |              |
| nomes de funções top level |    ❌    |   ❌   |        ✅         |              |
| imports separado           |    ❌    |   ❌   |        🟡         |              |
| imports ordenado           |    ❌    |   ❌   |        🟡         |              |
| array callback return      |    ❌    |   ✅   |        ❌         |              |
| inferrable-types           |    ❌    |   ❌   |        ✅         |              |

> **Informações:**
>
> - **ESLint** quando configurado com prettier, o eslint passa a usar o prettier como formatador.
> - **ESLint** não respeita 100% o imports, então foi feito algo aceitável veja em [EsLint sort-import](./docs/2.eslint.md#sort-imports).
> - **EditorConfig** não é concorrente dos outros pois somente mantém a codificação do arquivo, ex: UTF8 CRLF/LF com ou sem linha em branco no fim do arquivo.

## HTML:

1. mais de 3 attributes quebrar linha
2. attributes ordem alfabética

|                             | Prettier | EditorConfig |
| --------------------------- | :------: | :----------: |
| mais de 3 attributes        |    🟡    |      ❌      |
| attributes ordem alfabética |    ❌    |      ❌      |

> **Informações:**
>
> - **Prettier** formata HTML mas não consegue fazer somente quando é com mais de `3 attributes`, ele é configurado pela quantidade de colunas na linha.
> - **EditorConfig** não é concorrente dos outros

## Styles (sass, scss, less, css):

|                          | Prettier | EditorConfig | StyleLint |
| ------------------------ | :------: | :----------: | :-------: |
| deve formatar automático |    ✅    |      ❌      |    ✅     |
| suporte a rules          |    🟡    |      ❌      |    ✅     |

> **Informações:**
>
> - **Prettier** formata CSS mas não consegue fazer regras para isso uso o StyleLint.
> - **EditorConfig** não é concorrente dos outros

### Suporte a IntelliSense

Sobre esse assunto encontrei um extensão que consegue fazer, seque [link](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss)

# Conclusão:

Prettier e ESLint trabalham juntos, existe [conflitos](https://prettier.io/docs/en/install.html#eslint-and-other-linters) veja [comparison](https://prettier.io/docs/en/comparison.html). Para trabalhar com Angular o ideal foi seguir os passos:

- Remove as extensões VSCode:
  [vsc-organize-imports](https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-organize-imports),
  [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
- Instalar as extensões VSCode:
  [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template),
  [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  [StyleLint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- Instalar o angular
- Instalar o angular-eslint
- Instalar o prettier
- Instalar o editorconfig
- configurar arquivos do .vscode
- configurar arquivos do .editorconfig
- configurar arquivos do .eslintrc
- configurar arquivos do .prettierrc
- configurar arquivos do .stylelintrc

Consegui concluir um projeto em angular com uma estrutura bem definida e com padrões.
Sobre os imports não consegui forçar as regras, mas vou seguir o [style-guide-03-06](https://v2.angular.io/docs/ts/latest/guide/style-guide.html#!#03-06) do **Angular2** deixando uma linha vazia entre as importações de terceiros e as importações de aplicativo e quando o erro persistir desativo o eslint no arquivo corrente.

Segue um repositório com as definições no [text](https://github)
