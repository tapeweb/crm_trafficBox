-- ======================================
-- USERS TABLE (PostgreSQL-optimized)
-- ======================================
CREATE TABLE IF NOT EXISTS users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    token TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    password TEXT NOT NULL,

    gender TEXT NOT NULL
        CHECK (gender in ('Male', 'Female', 'Other')),

    email TEXT NOT NULL UNIQUE,
    age INT NOT NULL CHECK (age >= 16),

    role TEXT NOT NULL DEFAULT 'User'
        CHECK (role in ('User', 'Admin', 'Moderator')),

    balance INT NOT NULL DEFAULT 0 CHECK (balance >= 0),

    createdAt TIMESTAMP NOT NULL DEFAULT now(),
    updatedAt TIMESTAMP NOT NULL DEFAULT now()
);

-- Auto-update "updatedAt" on UPDATE
CREATE OR REPLACE FUNCTION setUsersUpdatedAt()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER triggerUsersUpdatedAt
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE setUsersUpdatedAt();

-- ======================================
-- OFFERS TABLE (PostgreSQL-optimized)
-- ======================================

CREATE TABLE IF NOT EXISTS offers (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    uid INT NOT NULL REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    name TEXT NOT NULL,
    description TEXT,

    price INT NOT NULL CHECK(price >= 0),
    value INT NOT NULL CHECK(value >= 0),

    createdAt TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS indexOffersUID ON offers(uid);