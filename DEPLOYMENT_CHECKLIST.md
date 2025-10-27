# GPT API Deployment Checklist

## ✅ Current Status

- [x] API route created: `/api/gpt/upsert`
- [x] Database utility created: `src/lib/db.ts`
- [x] Viewer page created: `/gpt-db`
- [x] Selftest endpoint: `/api/gpt/selftest`
- [x] Documentation updated: `GPT_API_SETUP.md`
- [x] API key generated locally: `zKN1J9UAHYVP5RriCcSQvxbBV6jZkuc3zFk3mqxdzsE`
- [ ] ⚠️ DATABASE NOT CONFIGURED - Need Vercel Postgres or local setup
- [ ] ⚠️ ENV VAR NOT SET IN VERCEL - Need to add `GPT_API_KEY`

## 🚀 Deployment Steps

### Step 1: Add API Key to Vercel

1. Go to: [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `brodiegroch-site`
3. Go to: **Settings** → **Environment Variables**
4. Click **Add New**
5. Fill in:
   - **Key:** `GPT_API_KEY`
   - **Value:** `zKN1J9UAHYVP5RriCcSQvxbBV6jZkuc3zFk3mqxdzsE`
   - **Environment:** Production (and Preview/Development if desired)
6. Click **Save**

### Step 2: Create Database in Vercel

1. In your Vercel project dashboard
2. Go to: **Storage** → **Create Database** → **Postgres**
3. Wait for database to be created
4. After creation, environment variables will be auto-added:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`  
   - `POSTGRES_URL_NON_POOLING`

### Step 3: Set Up Database Tables

1. In Vercel dashboard → **Storage** → Your database
2. Click **SQL Editor** tab
3. Run this SQL (or paste contents of `database-setup.sql`):

```sql
CREATE TABLE IF NOT EXISTS items (
  id text PRIMARY KEY,
  type text NOT NULL,
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_items_type ON items(type);
CREATE INDEX IF NOT EXISTS idx_items_updated_at ON items(updated_at);
```

### Step 4: Redeploy

1. Go to: **Deployments** tab
2. Click the latest deployment (or "Redeploy")
3. Confirm the deployment uses the new env vars

### Step 5: Verify Deployment

Test the API:

```bash
export URL=https://brodiegroch.ca
export KEY=zKN1J9UAHYVP5RriCcSQvxbBV6jZkuc3zFk3mqxdzsE

# Test 1: Route exists
curl -i $URL/api/gpt/upsert

# Test 2: Auth (expect 401)
curl -i -X POST $URL/api/gpt/upsert -H 'Content-Type: application/json' -d '{}'

# Test 3: Full request (expect 200)
curl -i -X POST $URL/api/gpt/upsert \
  -H 'Content-Type: application/json' \
  -H "X-API-Key: $KEY" \
  -d '{"type":"task","data":{"id":"t-001","title":"Deployment Test"}}'

# Test 4: Selftest
curl $URL/api/gpt/selftest -H "X-API-Key: $KEY" | jq
```

Expected response from selftest:
```json
{
  "ok": true,
  "key": true,
  "db": true,
  "envKeyLoaded": true
}
```

### Step 6: Configure Custom GPT

1. Open your Custom GPT in ChatGPT
2. Click **Configure** → **Actions**
3. Add Action → **Import from OpenAPI URL**
4. Paste this OpenAPI spec:

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

5. Configure Authentication:
   - **Auth type:** API Key
   - **Header name:** `X-API-Key`
   - **Secret value:** `zKN1J9UAHYVP5RriCcSQvxbBV6jZkuc3zFk3mqxdzsE`
6. Click **Save**

## 📊 Monitor

- **View database:** `/gpt-db` on your site
- **Vercel logs:** Dashboard → Project → Logs
- **Database usage:** Dashboard → Storage → Your DB

## 🔐 Security Notes

- ✅ API key stored in Vercel env vars (not in code)
- ✅ Only accessible via HTTPS
- ✅ Requires authentication header
- ⚠️ Remember to add key to Custom GPT Action
- ⚠️ Never commit `.env.local` to git

## 🐛 Troubleshooting

If you see errors:

1. **"missing_connection_string"** → Database not created yet (do Step 2)
2. **401 Unauthorized** → Key not set in Vercel env vars (do Step 1)
3. **500 Server Error** → Check Vercel logs for details
4. **404 Not Found** → Redeploy after adding env vars

Check logs:
- Vercel Dashboard → Project → Deployments → [latest] → Functions tab

