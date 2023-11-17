# Clean Architecture com Typescript
Este repositório é um exemplo de implementação da Arquitetura Limpa com Typescript.

![CleanArchitecture](https://user-images.githubusercontent.com/10949632/92665934-3390a380-f2de-11ea-8c63-5447e5773e2d.jpg)

O projeto está estruturado da seguinte forma:

- **adapters**: Contém todo o tipo de código que adapta as interfaces com a camada de infraestrutura e com as interfaces dos casos de uso.
- **entities**: Contém todas as regras de negócio da empresa. É representada por classes de domínio com as regras de negócio mais críticas.
- **infra**: Contém todas as bibliotecas, frameworks e drivers necessários para a aplicação.
- **shared**: Contém funções compartilhadas que podem ser reaproveitadas pelo sistema.
- **use-cases**: Contém todas as regras de negócio da aplicação. É encapsulada em módulos que contêm os interadores de casos de utilização e as respectivas portas (uma interface de gateway de casos de utilização específicos e/ou uma interface de apresentador de casos de utilização específicos)

### Criação do database

Se você não tem um banco de dados MySql para este exemplo, execute o comando abaixo para subir um container.

```
make database-setup
```

Execute o comando abaixo para iniciar ou parar o MySql

```
make database-up
make database-down
```

### Configurações iniciais

Execute o comando abaixo para preparar o container para a execução desse projeto. Nessa etapa de preparação será inicializados a rede, porta e o armazenamento (volume)

```
make build
```

Após ter criado o database será necessario executar algumas configurações, que pode ser migrations, seed e compilação.

```
make setup
```