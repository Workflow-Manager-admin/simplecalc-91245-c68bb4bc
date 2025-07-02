# Supabase Integration for Simple Calculator App

## Supabase Project
- **Project Name:** simple_calculator_app
- **Supabase URL:** https://qlliwzcbmortndabvfda.supabase.co

## Table: `calculations`

A table to store user calculation history, enabling features like "previous calculations" or analytics.

| Column        | Type      | Description                               | Default               | Notes         |
|---------------|-----------|-------------------------------------------|-----------------------|--------------|
| id            | uuid      | Unique primary key                        | uuid_generate_v4()    | PK           |
| expression    | text      | Mathematical expression input by the user | —                     |              |
| result        | text      | Evaluated result of the calculation       | —                     |              |
| created_at    | timestamp | Timestamp of when the calculation occured | now()                 |              |

### Example Row

| id (uuid)       | expression           | result | created_at                |
|-----------------|---------------------|--------|---------------------------|
| b6d...c32       | 4 * (3 + 2) / 2     | 10     | 2024-04-21T15:16:00.123Z  |

## Usage
- The **calculations** table is intended to log each calculation performed via the frontend for history/auditing/future features.

## Auth/Access
- Table is currently public; adjust RLS policies as needed for user privacy.

---

## 📛 Resolving Supabase RLS (Row Level Security) INSERT Errors on 'calculations' Table

If you encounter a "Row Level Security (RLS) policy violation" when your app tries to insert into the `calculations` table, follow these steps:

### A. Option 1: **Disable RLS Entirely (Not for Production, Okay for Dev Only)**

1. Open [your Supabase dashboard](https://qlliwzcbmortndabvfda.supabase.co/project/qlliwzcbmortndabvfda/editor/table/calculations)
2. Go to the table list and find `calculations`.
3. Click its **"RLS"** toggle off (disable RLS).
4. Confirm the change.

**Now all users/services can insert, select, update, and delete freely from this table.**

---

### B. Option 2: **Add Permissive Insert Policy for Development**

1. Go to the Supabase dashboard → `calculations` table → "RLS Policies"
2. Click **"New Policy"**
3. Name it: `Allow insert for all (development)`
   - **Action:** `INSERT`
   - **Target roles:** `public` (or `*`)
   - **Expression:** Check the option for "Full access" or set the policy expression to: `true`
4. Save/apply the policy.

**This allows any INSERT request (from the frontend, backend, or API key) to succeed.**

---

### C. How to Test that it Works

1. Restart or redeploy your frontend, or reload the [React app](http://localhost:3000), and perform a calculation.
2. You should **no longer receive an RLS error**, and the calculation will be saved.
3. Check the Supabase dashboard → `calculations` table to verify new rows are added.
4. To confirm further, you can use the SQL editor:
   ```sql
   select * from public.calculations order by created_at desc limit 5;
   ```

---
**Important:**  
Do *not* leave RLS off or open policies in production! For production, always restrict data to only the intended users or service roles.

---

## Changelog
- 2024-07-02: Added RLS troubleshooting and resolution instructions.
- 2024-04-21: Table `calculations` created.

