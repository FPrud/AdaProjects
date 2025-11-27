CREATE TABLE promotions (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    beginning DATE NOT NULL
);

INSERT INTO promotions (name, beginning) VALUES
('Fatoumata Kébé', '2024-09-01'),
('Frances Spence', '2025-01-01'),
('Frida Kahlo', '2025-05-01'),
('Grace Hopper', '2025-09-01');