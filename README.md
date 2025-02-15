## FIAP Tech-Challenge 8SOAT - Grupo 04 - Microsserviço de Usuários

### Introdução

Este microsserviço faz parte de um sistema de controle de pedidos para uma lanchonete em expansão. Ele é responsável exclusivamente pelo gerenciamento de usuários e clientes, garantindo um cadastro eficiente e uma busca otimizada utilizando Redis para melhorar a performance das consultas.

_Para visualizar a documentação geral do projeto, acesse este [repositório](https://github.com/8SOAT-G4-Tech-Challenge/tech-challenge-fiap-documentation)._

### Objetivo

Este serviço tem como objetivo gerenciar os usuários e clientes do sistema, permitindo a criação, atualização e recuperação de dados de maneira rápida e eficiente.

A partir dos dados fornecidos, este microsserviço:

- Gerencia os usuários do sistema, permitindo criação, atualização e listagem por ID e e-mail.
- Gerencia os clientes da lanchonete, que podem se identificar ao fazer um pedido, permitindo criação, atualização e listagem por ID e CPF.
- Utiliza o Redis como mecanismo de cache para otimizar buscas de clientes e agilizar a recuperação dos dados.

### Participantes

- Amanda Maschio - RM 357734
- Jackson Antunes - RM357311
- Lucas Accurcio - RM 357142
- Vanessa Freitas - RM 357999
- Winderson Santos - RM 357315
