# Microservices Architecture

Our application uses a microservices architecture with a gateway routing requests to three core services. These services communicate with each other through RabbitMQ.

## Architecture Diagram

```mermaid
graph TD
    %% Gateway receives requests
    A[Client Request] --> B[Gateway app.js]

    %% Gateway routes requests to respective services
    B --> C1[User Service]
    B --> C2[Captain Service]
    B --> C3[Ride Service]

    %% USER SERVICE FLOW
    C1 --> D1[user.routes.js]
    D1 --> E1[authMiddleWare.js]
    D1 --> F1[user.controller.js]
    F1 --> G1[user.model.js]
    F1 --> H1[blacklisttoken.model.js]
    F1 --> I1[db.js]
    F1 --> J1[rabbit.js]

    %% CAPTAIN SERVICE FLOW
    C2 --> D2[captain.routes.js]
    D2 --> E2[authMiddleWare.js]
    D2 --> F2[captain.controller.js]
    F2 --> G2[captain.model.js]
    F2 --> H2[blacklisttoken.model.js]
    F2 --> I2[db.js]
    F2 --> J2[rabbit.js]

    %% RIDE SERVICE FLOW
    C3 --> D3[ride.routes.js]
    D3 --> E3[auth.middleware.js]
    D3 --> F3[ride.controller.js]
    F3 --> G3[ride.model.js]
    F3 --> I3[db.js]
    F3 --> J3[rabbit.js]

    %% Inter-Service communication via RabbitMQ
    J1 --> Q[RabbitMQ Queue]
    J2 --> Q
    J3 --> Q

    %% Microservices consume RabbitMQ messages
    Q --> F1
    Q --> F2
    Q --> F3

    %% Subgraphs
    subgraph Gateway
        B
    end

    subgraph User_Service
        D1
        E1
        F1
        G1
        H1
        I1
        J1
    end

    subgraph Captain_Service
        D2
        E2
        F2
        G2
        H2
        I2
        J2
    end

    subgraph Ride_Service
        D3
        E3
        F3
        G3
        I3
        J3
    end

    subgraph RabbitMQ
        Q
    end
```

## Service Overview

- **Gateway Service**: Routes client requests to appropriate microservices
- **User Service**: Manages user authentication, profiles, and preferences
- **Captain Service**: Handles driver/captain management, availability, and profiles
- **Ride Service**: Processes ride requests, matching, tracking, and payments

## Communication

Services communicate with each other through:
- RESTful APIs for synchronous requests
- RabbitMQ message queue for asynchronous events
