-- Data structure
-- 
-- let listOfTasks = [
--   {
--     name: 'Mow the lawn', // string or VARCHAR
--     isCompleted: true     // BOOLEAN
--   }
-- ]

-- DROP TABLE "tasks";

CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(256) NOT NULL,				-- required
	"isComplete" BOOLEAN DEFAULT FALSE
);

-- Sample Data
INSERT INTO "tasks" ("name", "isComplete") 
VALUES
	('Mow the lawn', TRUE),
	('Wash the dishes', FALSE),
	('Grocery shopping', TRUE);