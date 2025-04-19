
## 🔁 User Route Flow

```mermaid
graph TD
    A[Client Request to /users] --> B[user.routes.js]
    B --> C[user.controller.js]

    C -->|Validates user| D[user.model.js]
    C -->|Checks blacklist| E[blacklisttoken.model.js]

    B -->|Auth required| F[authMiddleWare.js]

    C -->|DB access| G[db.js]
    C -->|Publishes to queue| H[rabbit.js]

    subgraph Middleware
        F
    end

    subgraph Controller
        C
    end

    subgraph Models
        D
        E
    end

    subgraph Services
        H
    end

    subgraph Database
        G
    end
