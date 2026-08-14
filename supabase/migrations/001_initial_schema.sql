SQL
create extension if not exists "uuid-ossp";

create table if not exists company_settings (
    id uuid primary key default gen_random_uuid(),
    company_name text not null default 'Optimization Logistics +',
    ruc text not null default '20000000001',
    address text not null default 'Lima, Perú',
    default_currency text not null default 'PEN',
    default_language text not null default 'es',
    logo_url text,
    updated_at timestamptz default now()
);

create table if not exists clients (
    id uuid primary key default gen_random_uuid(),
    client_code text unique not null,
    name text not null,
    address text,
    tax_id text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_clients_code on clients (client_code);
create index if not exists idx_clients_name on clients using gin (to_tsvector('spanish', name));

create sequence if not exists invoice_number_seq start 1;
create sequence if not exists client_code_seq start 1;

create table if not exists invoices (
    id uuid primary key default gen_random_uuid(),
    invoice_number text unique not null,
    client_id uuid not null references clients(id),
    language text not null default 'es',
    currency text not null default 'PEN',
    issue_date date not null,
    subtotal numeric(12,2) not null,
    tax_rate numeric(5,2) not null default 18.00,
    tax_amount numeric(12,2) not null,
    total numeric(12,2) not null,
    status text not null default 'draft',
    pdf_url text,
    created_at timestamptz default now()
);

create index if not exists idx_invoices_client on invoices (client_id);
create index if not exists idx_invoices_date on invoices (issue_date desc);
create index if not exists idx_invoices_number on invoices (invoice_number);

create table if not exists invoice_items (
    id uuid primary key default gen_random_uuid(),
    invoice_id uuid not null references invoices(id) on delete cascade,
    description text not null,
    details text,
    quantity numeric(10,2) not null,
    unit_price numeric(12,2) not null,
    line_total numeric(12,2) not null,
    sort_order integer not null
);

create index if not exists idx_items_invoice on invoice_items (invoice_id);