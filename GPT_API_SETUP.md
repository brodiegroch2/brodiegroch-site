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

2. **Generate a secure API key**

   Use one of these methods to generate a high-entropy key:

   ```bash
   # macOS/Linux - base64url (recommended)
   openssl rand -base64 32 | tr '+/' '-_' | tr -d '='

   # macOS/Linux - hex
   openssl rand -hex 32

   # Node
   node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
   ```

3. **Set up environment variables**

   **For Local Development** (`.env.local`):
   ```
   GPT_API_KEY=your-generated-key-here
   POSTGRES_URL=your-local-postgres-url (optional for local)
   ```

   **For Vercel** (Dashboard):
   - Go to: Project → Settings → Environment Variables
   - Add:
     - **Key:** `GPT_API_KEY`
     - **Value:** Your generated key from step 2
     - **Scope:** Production (and Preview/Development if needed)
   - Click "Save"
   - **Redeploy** your project

   **Note:** Vercel Postgres connection strings are automatically provided when you create a database in the Vercel dashboard.

4. **Set up the database**

   If using **Vercel Postgres**:
   - Go to: Project → Storage → Create Database → Postgres
   - After creation, use the SQL Editor to run `database-setup.sql`
   
   If using **local Postgres**:
   ```bash
   psql your_database < database-setup.sql
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

**Setting up Custom GPT Action:**

1. In the Custom GPT builder, add a new Action
2. Select "Import from OpenAPI URL" or paste the spec from above
3. Configure Authentication:
   - **Auth type:** API Key
   - **Header name:** `X-API-Key`
   - **Secret value:** Your generated key (from `.env.local` or Vercel)
4. Set the server URL to your domain (e.g., `https://brodiegroch.ca`)
5. Save and test

## Security Best Practices

### Key Rotation

To rotate your API key safely:

1. **Add new key** in Vercel:
   - Key: `GPT_API_KEY_NEXT`
   - Value: `new-generated-key`

2. **Update code** to accept either key temporarily:
   ```typescript
   const validKey = (key === process.env.GPT_API_KEY) || 
                    (key === process.env.GPT_API_KEY_NEXT);
   ```

3. **Update Custom GPT** to use new key

4. **Remove old key** and redeploy

### Best Practices

- ✅ Generate 32+ byte keys with high entropy
- ✅ Use one key per environment (prod/dev)
- ✅ Never commit keys to git (use `.env.local`)
- ✅ Log key usage (not the secret itself)
- ✅ Rotate keys regularly
- ✅ Use HTTPS only (already enforced on Vercel)

### Testing Locally

After setting up your key in `.env.local`, restart your dev server:

```bash
# Stop current server
# Then restart
npm run dev
```

Test the endpoint:
```bash
curl -i -X POST http://localhost:3000/api/gpt/upsert \
  -H 'Content-Type: application/json' \
  -H 'X-API-Key: YOUR_KEY' \
  -d '{"type":"task","data":{"title":"Test"}}'
```

