# Arquitetura

## Visao geral

O sistema foi implementado em TypeScript e organiza a logica principal em torno de salas, reservas, estrategias de prioridade e servicos de aplicacao.

Os principais componentes sao:

- `RoomService`: repositorio central de salas em memoria e ponto unico de acesso as salas cadastradas.
- `ReservationService`: servico responsavel por criar, modificar e cancelar reservas.
- `RoomFactory`: fabrica os diferentes tipos de sala.
- `ReservationStrategy`: define a politica de resolucao de conflitos.
- `Reservation`: entidade que representa uma reserva e permite notificacao de observadores.
- `User`: representa o usuario e tambem atua como observador de reservas.

## Fluxo principal

1. Uma sala e criada pelo `RoomService`, que delega a construcao concreta ao `RoomFactory`.
2. O `ReservationService` recebe uma tentativa de reserva.
3. A `ReservationStrategy` valida se a reserva pode ser aceita para a sala e data informadas.
4. Se a reserva for permitida, ela e adicionada na sala.
5. Eventos de criacao, substituicao, modificacao e cancelamento podem disparar notificacoes para os observadores.

## Organizacao em camadas

- `room/`: classes concretas e interface de salas.
- `service/`: servicos de aplicacao.
- `strategy/`: politicas de prioridade e conflito.
- `factory/`: criacao de objetos de sala.
- `observer/`: contrato dos observadores de reserva.
- `tests/`: testes automatizados com Vitest.
