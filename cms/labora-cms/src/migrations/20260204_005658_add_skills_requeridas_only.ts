import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
    ALTER TABLE "projects" 
    ADD COLUMN IF NOT EXISTS "skills_requeridas" varchar;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
    ALTER TABLE "projects" 
    DROP COLUMN IF EXISTS "skills_requeridas";
  `)
}
