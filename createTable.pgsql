
CREATE TABLE poubel1 (
    nom_cours VARCHAR(200) NOT NULL,
    code_cours VARCHAR(20) UNIQUE NOT NULL,
    credits INTEGER CHECK (credits > 0),
    description TEXT
);