# GPT API Setup Instructions

## Database Setup

1. **Create the database table**

   Run the SQL file to create the items table:

   ```sql
   -- See database-setup.sql
   ```

   Or run:
   ```bash
   psql your_database < database-setup.sql
   ```

2. **Set up environment variables**

   Add to your `.env.local` file (or Vercel environment variables):

   ```
   # Required for API authentication
   GPT_API_KEY=yourlongrandomkeyhere
   
   # Vercel Postgres connection string (automatically provided if using Vercel)
   POSTGRES_URL=
   POSTGRES_PRISMA_URL=
   POSTGRES_URL_NON_POOLING=
   ```

## API Endpoints

### POST `/api/gpt/upsert`

Stores or updates an item in the database.

**Headers:**
- `Content-Type: application/json`
- `X-API-Key: your-api-key`

**Body:**
```json
{
  "type": "task|note|event|metric",
  "data": {
    "id": "optional-id",
    "title": "Any data you want to store",
    "content": "...",
    ...
  }
}
```

**Response:**
```json
{
  "ok": true
}
```

## Usage

1. **View the database:** Navigate to `/gpt-db` in your browser
2. **Test the API:** Use the viewer page or send POST requests to `/api/gpt/upsert`

## For Custom GPT

Configure your Custom GPT to use:

**OpenAPI Spec:**
```yaml
openapi: 3.1.0
info: {title: PersonalDB, version: "1.0"}
servers: [{url: https://brodiegroch.ca}]
components:
  securitySchemes:
    api_key:
      type: apiKey
      in: header
      name: X-API-Key
paths:
  /api/gpt/upsert:
    post:
      operationId: upsertItem
      security: [{api_key: []}]
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [type, data]
              properties:
                type: {type: string, enum: [task, note, event, metric]}
                data: {type: object, additionalProperties: true}
      responses:
        "200": {description: OK}
```

**Custom GPT Instructions:**
- Call `upsertItem` when the user wants to store something
- Confirm required fields (type and data)
- Never exceed 8kb payload
- Use header `X-API-Key: <your key>`
- The API will automatically generate an ID if not provided

