# Sistema de Reserva de Salas

## Visão geral

Este projeto é uma aplicação simples desenvolvida em **TypeScript** com foco no estudo de **Programação Orientada a Objetos** e **Padrões de Projeto**.

O sistema permite criar diferentes tipos de salas, registrar reservas e aplicar estratégias de prioridade para resolver conflitos quando duas reservas são solicitadas para a mesma sala na mesma data.

## Estrutura principal do projeto

```txt
src/
├── factory/
│   └── RoomFactory.ts
├── room/
│   ├── Room.ts
│   ├── IndividualRoom.ts
│   ├── GroupRoom.ts
│   └── LabRoom.ts
├── service/
│   └── RoomService.ts
├── strategy/
│   ├── ReservationStrategy.ts
│   ├── ArrivalPriority.ts
│   └── TeacherPriority.ts
├── tests/
│   ├── Reservation.test.ts
│   ├── Room.test.ts
│   └── Priority.test.ts
├── Reservation.ts
└── User.ts
```

## Testes automatizados

O projeto possui testes para validar:

- criação de reservas;
- acesso aos dados da reserva;
- impressão das reservas das salas;
- criação e uso de diferentes tipos de sala;
- funcionamento da estratégia de prioridade por chegada;
- funcionamento da estratégia de prioridade para docentes;
- substituição de reserva quando a estratégia permite.

## Padrões de projeto utilizados

### Factory

Utilizado na classe `RoomFactory`, responsável por centralizar a criação dos diferentes tipos de salas.

### Singleton

Utilizado na classe `RoomService`, garantindo uma única instância responsável pelo gerenciamento das salas.

### Strategy

Utilizado nas classes de prioridade de reserva, permitindo trocar a regra de resolução de conflito sem alterar o restante do sistema.

### Template Method

Utilizado na classe abstrata `ReservationStrategy`, que define o fluxo geral de verificação de reserva e deixa a regra específica de conflito para as subclasses.

## Como rodar via CLI

Se desejar testar o sistema usando o terminal, basta rodar os seguintes comandos:

- npm install
- npm start

O menu aparecerá e você poderá testar o que quiser.

## Autores

- Lucas de Oliveira Kwok - 163919
- Vinicius Henrique Dos Santos - 178163
