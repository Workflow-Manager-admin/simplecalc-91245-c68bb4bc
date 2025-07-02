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

## Changelog
- 2024-04-21: Table `calculations` created.

