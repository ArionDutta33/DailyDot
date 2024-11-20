CREATE TABLE todos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for the todo
    project_id UUID NOT NULL,                      -- Foreign key referencing the project
    user_id UUID NOT NULL,                         -- Foreign key referencing the user
    title VARCHAR(255) NOT NULL,                   -- Todo title
    is_completed BOOLEAN DEFAULT FALSE,            -- Completion status
    created_at TIMESTAMP DEFAULT NOW(),            -- Record creation timestamp
    due_date TIMESTAMP,                            -- Optional due date for the todo
    FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE, -- Cascade deletion with project
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE -- Cascade deletion with user
);
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for the project
    user_id UUID NOT NULL,                         -- Foreign key referencing the user
    name VARCHAR(100) NOT NULL,                    -- Project name
    description TEXT,                              -- Optional project description
    created_at TIMESTAMP DEFAULT NOW(),            -- Record creation timestamp
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE -- Cascade deletion with user
);
