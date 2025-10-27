import { sql } from '@vercel/postgres';

export const db = {
  items: {
    upsert: async ({ where, create, update }: any) => {
      const id = where?.id || create.id || update.id;
      
      if (!id) {
        throw new Error('id is required');
      }

      // Check if item exists
      const existing = await sql`
        SELECT id FROM items WHERE id = ${id}
      `;

      if (existing.rows.length > 0) {
        // Update existing item
        await sql`
          UPDATE items 
          SET type = ${create.type || update.type},
              data = ${JSON.stringify(create.data || update.data)},
              updated_at = NOW()
          WHERE id = ${id}
        `;
      } else {
        // Insert new item
        await sql`
          INSERT INTO items (id, type, data, updated_at)
          VALUES (${id}, ${create.type || update.type}, ${JSON.stringify(create.data || update.data)}, NOW())
        `;
      }
    },
    findMany: async () => {
      const result = await sql`
        SELECT * FROM items ORDER BY updated_at DESC
      `;
      return result.rows;
    },
    delete: async ({ where }: any) => {
      await sql`
        DELETE FROM items WHERE id = ${where.id}
      `;
    }
  }
};

