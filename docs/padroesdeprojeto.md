# Padroes de Projeto Utilizados

## Factory

O padrao Factory e aplicado em `src/factory/RoomFactory.ts`.

Objetivo no projeto:

- centralizar a criacao das salas;
- evitar que o restante do sistema conheca diretamente os detalhes das classes concretas;
- facilitar a criacao dos tipos `IndividualRoom`, `GroupRoom` e `LabRoom`.

## Strategy

O padrao Strategy e aplicado em `src/strategy/`.

Objetivo no projeto:

- permitir trocar a politica de resolucao de conflitos de reserva;
- manter o fluxo de verificacao desacoplado da regra concreta.

Implementacoes atuais:

- `ArrivalPriority`: mantem a primeira reserva existente.
- `TeacherPriority`: concede prioridade para usuarios docentes.

## Singleton

O padrao Singleton e aplicado em `src/service/RoomService.ts`.

Objetivo no projeto:

- garantir um unico repositorio de salas em memoria;
- permitir que diferentes partes do sistema consultem e atualizem o mesmo conjunto de salas.

## Observer

O padrao Observer e aplicado em `src/Reservation.ts`, `src/observer/ReservationObserver.ts` e `src/User.ts`.

Objetivo no projeto:

- permitir que usuarios sejam notificados quando a reserva sofrer alteracoes;
- desacoplar a logica de notificacao do restante do fluxo de reserva.

Eventos atualmente utilizados:

- `CREATED`
- `REPLACED`
- `MODIFIED`
- `CANCELLED`

## Template Method

O projeto tambem utiliza uma estrutura de Template Method em `src/strategy/ReservationStrategy.ts`.

Objetivo no projeto:

- definir um fluxo base de verificacao de reservas;
- delegar apenas a resolucao do conflito para as subclasses concretas.
