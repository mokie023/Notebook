# Complete Route List

**API Base URL:** `http://localhost:8000/api/v1`

## Authentication Routes (4 endpoints)

```
POST   /auth/register              → Register a new user
POST   /auth/login                 → Login with email/password
GET    /auth/me                    → Get current user profile
POST   /auth/logout                → Logout current user
```

## Note Categories Routes (4 endpoints)

```
GET    /note-categories            → List all categories (user's own)
POST   /note-categories            → Create new category
PUT    /note-categories/{id}       → Update category
DELETE /note-categories/{id}       → Delete category
```

## Tags Routes (4 endpoints)

```
GET    /tags                       → List all tags (user's own, supports search)
POST   /tags                       → Create new tag
PUT    /tags/{id}                  → Update tag
DELETE /tags/{id}                  → Delete tag
```

## Notes Routes (5 endpoints)

```
GET    /notes                      → List notes (with search, filtering, pagination)
POST   /notes                      → Create new note
GET    /notes/{id}                 → Get single note with tags & category
PUT    /notes/{id}                 → Update note
DELETE /notes/{id}                 → Delete note
```

## Journals Routes (5 endpoints)

```
GET    /journals                   → List journals (with search, mood/date filtering)
POST   /journals                   → Create journal entry
GET    /journals/{id}              → Get single journal entry
PUT    /journals/{id}              → Update journal entry
DELETE /journals/{id}              → Delete journal entry
```

## Tasks Routes (5 endpoints)

```
GET    /tasks                      → List tasks (with status, priority, date filtering)
POST   /tasks                      → Create new task
GET    /tasks/{id}                 → Get single task with pomodoro sessions
PUT    /tasks/{id}                 → Update task (progress/status handling)
DELETE /tasks/{id}                 → Delete task
```

## Pomodoro Sessions Routes (6 endpoints)

```
GET    /pomodoro-sessions          → List sessions (with type, status, task filtering)
POST   /pomodoro-sessions          → Create new pomodoro session
GET    /pomodoro-sessions/{id}     → Get single session
PUT    /pomodoro-sessions/{id}     → Update session
DELETE /pomodoro-sessions/{id}     → Delete session
GET    /pomodoro-sessions-stats    → Get pomodoro statistics
```

## Dashboard Routes (1 endpoint)

```
GET    /dashboard/summary          → Get dashboard summary with stats & recent activity
```

---

## Total Routes: **34**

- **2 Public Routes** (register, login)
- **32 Protected Routes** (require auth:sanctum middleware)

---

## Filtering & Search Capabilities

### Notes
- `?search=text` - Search title/content
- `?category_id=N` - Filter by category
- `?tag=name` - Filter by tag
- `?is_pinned=true` - Filter pinned notes
- `?per_page=N&page=M` - Pagination

### Tasks
- `?search=text` - Search title/description
- `?status=pending|in_progress|completed` - Filter by status
- `?priority=low|medium|high` - Filter by priority
- `?overdue=true` - Show only overdue
- `?due_from=YYYY-MM-DD&due_to=YYYY-MM-DD` - Date range
- `?per_page=N&page=M` - Pagination

### Journals
- `?search=text` - Search title/entry
- `?mood=happy|sad|etc` - Filter by mood
- `?category=name` - Filter by category
- `?date_from=YYYY-MM-DD&date_to=YYYY-MM-DD` - Date range
- `?per_page=N&page=M` - Pagination

### Pomodoro Sessions
- `?session_type=focus|short_break|long_break` - Filter by type
- `?status=running|completed|cancelled` - Filter by status
- `?task_id=N` - Filter by task
- `?date_from=YYYY-MM-DD&date_to=YYYY-MM-DD` - Date range
- `?per_page=N&page=M` - Pagination

### Tags
- `?search=text` - Search tag name

---

## Response Structure (All Endpoints)

Every response follows this structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // The actual resource(s) or paginated data
  }
}
```

Or on error:

```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    // Validation errors if applicable
  }
}
```

---

## Status Codes

- **200** - OK (GET, PUT, PATCH, DELETE successful)
- **201** - Created (POST successful)
- **400** - Bad Request (validation failed)
- **401** - Unauthorized (missing/invalid token)
- **404** - Not Found (resource not found or doesn't belong to user)
- **422** - Unprocessable Entity (business logic error)

---

## Authentication Header Format

All protected endpoints require:

```
Authorization: Bearer YOUR_PLAIN_TEXT_TOKEN_HERE
```

Example:
```
Authorization: Bearer 1|abc123xyz...token
```

---

## Key Features by Module

### Auth Module
- ✅ Secure password hashing (Laravel default)
- ✅ Token-based authentication (Laravel Sanctum)
- ✅ Clean JSON responses
- ✅ User registration with validation
- ✅ Login with email/password
- ✅ Token revocation on logout

### Notes Module
- ✅ Full CRUD operations
- ✅ Category assignment (optional)
- ✅ Tag management (assign existing, create new)
- ✅ Pin/unpin notes
- ✅ Full-text search
- ✅ Filter by category or tag
- ✅ Automatic timestamps (created_at, updated_at)

### Categories Module
- ✅ Per-user categories
- ✅ Color coding support
- ✅ Automatic slug generation
- ✅ Prevent duplicate names per user

### Tags Module
- ✅ Per-user tags
- ✅ Many-to-many with notes
- ✅ Automatic slug generation
- ✅ Prevent duplicate names per user
- ✅ Search support

### Journals Module
- ✅ Full CRUD
- ✅ Mood tracking
- ✅ Category assignment
- ✅ Date-based entries
- ✅ Search and filtering
- ✅ Date range queries

### Tasks Module
- ✅ Full CRUD
- ✅ Priority levels (low, medium, high)
- ✅ Status tracking (pending, in_progress, completed)
- ✅ Progress percentage
- ✅ Auto-completion timestamp
- ✅ Due date support
- ✅ Filtering by multiple criteria
- ✅ Overdue task detection

### Pomodoro Sessions Module
- ✅ Full CRUD
- ✅ Session types (focus, short_break, long_break)
- ✅ Time tracking (planned vs actual minutes)
- ✅ Status tracking (running, completed, cancelled)
- ✅ Task association (optional)
- ✅ Date-based filtering
- ✅ Statistics endpoint (total focus time, sessions completed, etc.)
- ✅ Intelligent timestamp handling

### Dashboard Module
- ✅ Task statistics (total, pending, completed, overdue)
- ✅ Focus time this week
- ✅ Journal entries this week
- ✅ Recent notes (5 latest)
- ✅ Recent journals (5 latest)
- ✅ Recent activity feed (combined from all modules, 3 each)
- ✅ Optimized for frontend dashboard consumption

---

## Database Relationships

```
User (1) ────┬─────── (M) Note
             │ ├─── has many ─── (M) NoteCategory
             │ ├─ has many │       └─ belongsTo ─---- (1) User
             │ │           ├─── (M) Tag
             │ │           └─ belongsTo ─── (1) NoteCategory
             │ │
             │ ├─ has many ─── (M) Journal
             │ │                └─ belongsTo ─── (1) User
             │ │
             │ ├─ has many ─── (M) Task
             │ │                └─ belongsTo ─── (1) User
             │ │
             └─ has many ─── (M) PomodoroSession
                             ├─ belongsTo ─── (1) User
                             └─ belongsTo ─── (1) Task (nullable)

Note (M) ────── BelongsToMany ────── (M) Tag
                (via note_tag pivot table with timestamps)
```

---

## Frontend Integration Checklist

- [ ] Set base URL to `http://localhost:8000/api/v1`
- [ ] Store token from login/register in localStorage
- [ ] Add token to all request headers: `Authorization: Bearer {token}`
- [ ] Handle 401 responses (redirect to login)
- [ ] Handle validation errors (display field errors)
- [ ] Implement pagination for list views
- [ ] Implement filtering/search for notes, tasks, journals
- [ ] Show task progress with progress bar UI
- [ ] Track pomodoro sessions with timer UI
- [ ] Display dashboard statistics
- [ ] Implement tag management interface
- [ ] Implement note category management
- [ ] Show recent activity on dashboard

---

## Support Matrix

| Feature | Notes | Priority |
|---------|-------|----------|
| User Registration | Email validation, password confirmation required | HIGH |
| User Authentication | Bearer token, user isolation | HIGH |
| Notes | CRUD, rich search with tag/category filtering | HIGH |
| Tasks | Full tracking with progress, status, priority, due dates | HIGH |
| Pomodoro | Timer sessions, type support (focus/break), stats | MEDIUM |
| Journals | Mood/category tracking, date filtering | MEDIUM |
| Dashboard | Summary stats, recent activity feed | HIGH |
| Categories | Per-user organization system | MEDIUM |
| Tags | Auto-create, system-wide search | MEDIUM |

---

**Last Updated:** March 10, 2026  
**API Version:** v1  
**Status:** ✅ Production Ready
