# Cumprimento dos Requisitos

Este documento relaciona os requisitos do exercicio com as partes correspondentes do projeto.

## RF-01 Listar salas disponiveis em um intervalo de datas

Implementacao principal:

- `src/service/RoomService.ts`
- metodo `listAvailableRooms(startDate, endDate)`

Teste relacionado:

- `src/tests/Availability.test.ts`

## RF-02 Permitir que um usuario crie, modifique ou cancele uma reserva

Implementacao principal:

- `src/service/ReservationService.ts`
- metodos `create`, `modify` e `cancel`

Testes relacionados:

- `src/tests/ReservationService.test.ts`

## RF-03 Detectar e impedir colisoes de horario

Implementacao principal:

- `src/strategy/ReservationStrategy.ts`
- `src/strategy/ArrivalPriority.ts`
- `src/strategy/TeacherPriority.ts`
- metodos `addReservation` nas classes de sala

Teste relacionado:

- `src/tests/Priority.test.ts`

## RF-04 Enviar notificacao imediata aos envolvidos quando uma reserva for alterada ou cancelada

Implementacao principal:

- `src/Reservation.ts`
- `src/observer/ReservationObserver.ts`
- `src/User.ts`
- `src/service/ReservationService.ts`

Observacao:

- as notificacoes sao realizadas por meio de eventos disparados durante criacao, substituicao, modificacao e cancelamento.

## RF-05 Disponibilizar relatorio diario com as reservas confirmadas de cada sala

Implementacao principal:

- `src/service/RoomService.ts`
- metodo `generateDailyReservationsReport(date)`

Teste relacionado:

- `src/tests/DailyReport.test.ts`
