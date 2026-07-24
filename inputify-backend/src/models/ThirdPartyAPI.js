// CREATE TABLE third_party_apis (
//   id uuid primary key,
//   api_name text,
//   description text,
//   is_enabled boolean default false,
//   created_at timestamp default now(),
//   updated_at timestamp default now()
// );

// CREATE TABLE api_credentials (
//   id uuid primary key,
//   api_id uuid references third_party_apis(id),
//   credential_key text,
//   credential_value text,
//   is_secret boolean default false,
//   created_at timestamp default now(),
//   updated_at timestamp default now()
// );
