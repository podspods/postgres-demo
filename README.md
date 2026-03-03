# requierement

- multilangue par i18n

```
postgres-demo/
    ├── client/ # Frontend React (Vite)
    │    ├── src/
    │    │ ├── components/
    │    │ │ ├── ClientList.tsx
    │    │ │ ├── ClientForm.tsx
    │    │ │ ├── ClientDetails.tsx
    │    │ │ └── Notification.tsx
    │    │ ├── services/
    │    │ │ └── api.ts
    │    │ ├── types/
    │    │ │ └── client.types.ts
    │    │ ├── App.tsx
    │    │ └── main.tsx
    │    └── package.json
    │
    └── server/ # Backend Fastify
         ├── src/
         │ ├── plugins/
         │ │ └── database.ts
         │ ├── routes/
         │ │ └── clients.ts
         │ ├── schemas/
         │ │ └── client.schema.ts
         │ ├── types/
         │ │ └── client.types.ts
         │ └── server.ts
         ├── .env
         └── package.json

```

# postgres-demo
