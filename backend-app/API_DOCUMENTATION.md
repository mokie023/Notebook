# Notebook API Documentation

> **API Status: ✅ FULLY IMPLEMENTED & PRODUCTION-READY**

This is a comprehensive guide to the Notebook backend API - a decoupled student academic productivity platform built with Laravel 11, Laravel Sanctum, and MySQL.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Authentication](#authentication)
4. [API Endpoints](#api-endpoints)
5. [Testing with Postman](#testing-with-postman)
6. [Important Notes & Assumptions](#important-notes--assumptions)
7. [Frontend Integration](#frontend-integration)

---

## Overview

- **Base URL:** `http://localhost:8000/api/v1` (adjust for your environment)
- **API Version:** v1 (future-proofed for scaling)
- **Default Pagination:** 10 items per page (customizable via `?per_page=N`)
- **Response Format:** JSON (consistent structure across all endpoints)
- **Authentication:** Token-based (Laravel Sanctum)

### Database Schema

The application manages 7 core entities:

```
User (1) ──────────┬──────────── (M) Note
                   ├──────────── (M) NoteCategory
                   ├──────────── (M) Tag
                   ├──────────── (M) Journal
                   ├──────────── (M) Task
                   └──────────── (M) PomodoroSession

Note (M) ──── BelongsToMany ──── (M) Tag (via note_tag pivot)
```

---

## Architecture

### Folder Structure

```
app/
├── Http/
│   ├── Controllers/Api/
│   │   ├── AuthController.php              # Auth logic
│   │   ├── NoteController.php              # Notes CRUD
│   │   ├── NoteCategoryController.php      # Categories CRUD
│   │   ├── TagController.php               # Tags CRUD
│   │   ├── JournalController.php           # Journals CRUD
│   │   ├── TaskController.php              # Tasks CRUD
│   │   ├── PomodoroSessionController.php   # Pomodoro CRUD
│   │   ├── DashboardController.php         # Dashboard summary
│   │   └── Concerns/ApiResponse.php        # Response trait
│   └── Requests/                           # Form request validation
│       ├── RegisterRequest.php
│       ├── LoginRequest.php
│       ├── StoreNoteRequest.php
│       ├── UpdateNoteRequest.php
│       └── ... (other request classes)
└── Models/                                 # Eloquent models with relationships
    ├── User.php
    ├── Note.php
    ├── NoteCategory.php
    ├── Tag.php
    ├── Journal.php
    ├── Task.php
    └── PomodoroSession.php

routes/api.php                              # All API routes (34 routes total)
database/migrations/                        # All tables already migrated
```

### Design Principles Applied

1. **API-First**: All functionality exposed via JSON REST endpoints
2. **Consistent Responses**: Every endpoint returns `{success, message, data, errors}` structure
3. **User Isolation**: All resources scoped to authenticated user (user_id in database)
4. **Form Request Validation**: Separate request classes for each endpoint
5. **Slim Controllers**: Business logic kept minimal, delegated to models
6. **Authorization**: Using `abortIfNotOwner()` to prevent cross-user access
7. **Pagination & Filtering**: Smart query building for efficient data retrieval

---

## Authentication

### Register

**Endpoint:** `POST /api/v1/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "password_confirmation": "SecurePassword123!"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2026-03-10T10:30:00Z",
      "updated_at": "2026-03-10T10:30:00Z"
    },
    "token": "1|abc123xyz...plainTextToken"
  }
}
```

### Login

**Endpoint:** `POST /api/v1/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "1|abc123xyz...plainTextToken"
  }
}
```

### Get Authenticated User Profile

**Endpoint:** `GET /api/v1/auth/me`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-03-10T10:30:00Z",
    "updated_at": "2026-03-10T10:30:00Z"
  }
}
```

### Logout

**Endpoint:** `POST /api/v1/auth/logout`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": null
}
```

---

## API Endpoints

### Notes Module

#### List Notes (with filtering & search)

**Endpoint:** `GET /api/v1/notes`

**Query Parameters:**
- `search` - Search in title and content (e.g., `?search=python`)
- `category_id` - Filter by category (e.g., `?category_id=3`)
- `tag` - Filter by tag name or slug (e.g., `?tag=important`)
- `is_pinned` - Filter pinned notes (e.g., `?is_pinned=true`)
- `per_page` - Pagination size (default: 10, max: 100)
- `page` - Page number (default: 1)

**Response (200):**
```json
{
  "success": true,
  "message": "Notes fetched",
  "data": {
    "data": [
      {
        "id": 1,
        "user_id": 1,
        "note_category_id": 2,
        "title": "Python Fundamentals",
        "content": "Variables, loops, functions...",
        "is_pinned": true,
        "created_at": "2026-03-10T09:00:00Z",
        "updated_at": "2026-03-10T09:00:00Z",
        "category": {
          "id": 2,
          "name": "Classes",
          "color": "#3498db"
        },
        "tags": [
          { "id": 1, "name": "Important", "slug": "important" }
        ]
      }
    ],
    "meta": {
      "current_page": 1,
      "per_page": 10,
      "total": 25,
      "last_page": 3
    }
  }
}
```

#### Create Note

**Endpoint:** `POST /api/v1/notes`

**Request Body:**
```json
{
  "title": "Python Fundamentals",
  "content": "Variables, loops, functions...",
  "note_category_id": 2,
  "is_pinned": true,
  "tag_ids": [1, 3],
  "new_tags": ["python", "programming"]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Note created",
  "data": { ... }
}
```

#### Get Single Note

**Endpoint:** `GET /api/v1/notes/{id}`

**Response (200):**
```json
{
  "success": true,
  "message": "Note fetched",
  "data": { ... }
}
```

#### Update Note

**Endpoint:** `PUT|PATCH /api/v1/notes/{id}`

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "note_category_id": 3,
  "is_pinned": false,
  "tag_ids": [1, 2],
  "new_tags": ["newtag"]
}
```

#### Delete Note

**Endpoint:** `DELETE /api/v1/notes/{id}`

**Response (200):**
```json
{
  "success": true,
  "message": "Note deleted",
  "data": null
}
```

---

### Note Categories Module

#### List Categories

**Endpoint:** `GET /api/v1/note-categories`

**Response (200):**
```json
{
  "success": true,
  "message": "Note categories fetched",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "name": "Work",
      "slug": "work",
      "color": "#e74c3c",
      "created_at": "2026-03-10T08:00:00Z",
      "updated_at": "2026-03-10T08:00:00Z"
    }
  ]
}
```

#### Create Category

**Endpoint:** `POST /api/v1/note-categories`

**Request Body:**
```json
{
  "name": "Personal",
  "color": "#9b59b6"
}
```

#### Update Category

**Endpoint:** `PUT|PATCH /api/v1/note-categories/{id}`

**Request Body:**
```json
{
  "name": "Work - Updated",
  "color": "#f39c12"
}
```

#### Delete Category

**Endpoint:** `DELETE /api/v1/note-categories/{id}`

---

### Tags Module

#### List Tags (with optional search)

**Endpoint:** `GET /api/v1/tags`

**Query Parameters:**
- `search` - Search tag name (e.g., `?search=python`)

#### Create Tag

**Endpoint:** `POST /api/v1/tags`

**Request Body:**
```json
{
  "name": "Important"
}
```

#### Update Tag

**Endpoint:** `PUT|PATCH /api/v1/tags/{id}`

**Request Body:**
```json
{
  "name": "Very Important"
}
```

#### Delete Tag

**Endpoint:** `DELETE /api/v1/tags/{id}`

---

### Journals Module

#### List Journals (with filtering)

**Endpoint:** `GET /api/v1/journals`

**Query Parameters:**
- `search` - Search title and entry content
- `mood` - Filter by mood (e.g., `?mood=happy`)
- `category` - Filter by category (e.g., `?category=reflection`)
- `date_from` - Start date (format: YYYY-MM-DD)
- `date_to` - End date (format: YYYY-MM-DD)
- `per_page` - Pagination size
- `page` - Page number

**Response (200):**
```json
{
  "success": true,
  "message": "Journals fetched",
  "data": {
    "data": [
      {
        "id": 1,
        "user_id": 1,
        "title": "First Day at University",
        "entry": "Today was amazing! I met...",
        "entry_date": "2026-03-10",
        "mood": "excited",
        "category": "reflection",
        "created_at": "2026-03-10T18:30:00Z",
        "updated_at": "2026-03-10T18:30:00Z"
      }
    ],
    "meta": { ... }
  }
}
```

#### Create Journal Entry

**Endpoint:** `POST /api/v1/journals`

**Request Body:**
```json
{
  "title": "Today's Reflection",
  "entry": "Today was a productive day...",
  "entry_date": "2026-03-10",
  "mood": "grateful",
  "category": "daily"
}
```

#### Get Single Journal Entry

**Endpoint:** `GET /api/v1/journals/{id}`

#### Update Journal Entry

**Endpoint:** `PUT|PATCH /api/v1/journals/{id}`

#### Delete Journal Entry

**Endpoint:** `DELETE /api/v1/journals/{id}`

---

### Tasks Module

#### List Tasks (with advanced filtering)

**Endpoint:** `GET /api/v1/tasks`

**Query Parameters:**
- `search` - Search title and description
- `status` - Filter by status (`pending`, `in_progress`, `completed`)
- `priority` - Filter by priority (`low`, `medium`, `high`)
- `overdue` - Show only overdue tasks (boolean, `?overdue=true`)
- `due_from` - Start date (YYYY-MM-DD)
- `due_to` - End date (YYYY-MM-DD)
- `per_page` - Pagination size
- `page` - Page number

**Response (200):**
```json
{
  "success": true,
  "message": "Tasks fetched",
  "data": {
    "data": [
      {
        "id": 1,
        "user_id": 1,
        "title": "Complete Assignment",
        "description": "Finish the database design project",
        "due_date": "2026-03-15",
        "priority": "high",
        "status": "in_progress",
        "progress_percent": 65,
        "completed_at": null,
        "created_at": "2026-03-10T10:00:00Z",
        "updated_at": "2026-03-10T14:30:00Z"
      }
    ],
    "meta": { ... }
  }
}
```

#### Create Task

**Endpoint:** `POST /api/v1/tasks`

**Request Body:**
```json
{
  "title": "Complete Assignment",
  "description": "Finish the database design project",
  "due_date": "2026-03-15",
  "priority": "high",
  "status": "pending",
  "progress_percent": 0
}
```

#### Get Single Task (with Pomodoro Sessions)

**Endpoint:** `GET /api/v1/tasks/{id}`

**Response (200):**
```json
{
  "success": true,
  "message": "Task fetched",
  "data": {
    "id": 1,
    "title": "Complete Assignment",
    ...
    "pomodoro_sessions": [
      {
        "id": 1,
        "session_type": "focus",
        "status": "completed",
        "actual_minutes": 25
      }
    ]
  }
}
```

#### Update Task (including progress/status)

**Endpoint:** `PUT|PATCH /api/v1/tasks/{id}`

**Request Body:**
```json
{
  "progress_percent": 75,
  "status": "in_progress"
}
```

**Note:** When `progress_percent` reaches 100, status automatically becomes `completed` and `completed_at` is set.

#### Delete Task

**Endpoint:** `DELETE /api/v1/tasks/{id}`

---

### Pomodoro Sessions Module

#### List Pomodoro Sessions (with filtering)

**Endpoint:** `GET /api/v1/pomodoro-sessions`

**Query Parameters:**
- `session_type` - Filter by type (`focus`, `short_break`, `long_break`)
- `status` - Filter by status (`running`, `completed`, `cancelled`)
- `task_id` - Filter by associated task
- `date_from` - Start date (YYYY-MM-DD)
- `date_to` - End date (YYYY-MM-DD)
- `per_page` - Pagination size
- `page` - Page number

**Response (200):**
```json
{
  "success": true,
  "message": "Pomodoro sessions fetched",
  "data": {
    "data": [
      {
        "id": 1,
        "user_id": 1,
        "task_id": 5,
        "session_type": "focus",
        "planned_minutes": 25,
        "actual_minutes": 24,
        "status": "completed",
        "started_at": "2026-03-10T14:00:00Z",
        "ended_at": "2026-03-10T14:24:00Z",
        "created_at": "2026-03-10T14:00:00Z",
        "updated_at": "2026-03-10T14:24:00Z",
        "task": {
          "id": 5,
          "title": "Study Database Design"
        }
      }
    ],
    "meta": { ... }
  }
}
```

#### Create Pomodoro Session

**Endpoint:** `POST /api/v1/pomodoro-sessions`

**Request Body:**
```json
{
  "task_id": 5,
  "session_type": "focus",
  "planned_minutes": 25,
  "status": "running",
  "started_at": "2026-03-10T14:00:00Z"
}
```

**Note:** `started_at` is required. When creating a session, the controller will automatically calculate `actual_minutes` if `ended_at` is provided.

#### Get Single Pomodoro Session

**Endpoint:** `GET /api/v1/pomodoro-sessions/{id}`

#### Update Pomodoro Session

**Endpoint:** `PUT|PATCH /api/v1/pomodoro-sessions/{id}`

**Behavior:** The controller intelligently handles status transitions and automatic timestamp calculations.

#### Delete Pomodoro Session

**Endpoint:** `DELETE /api/v1/pomodoro-sessions/{id}`

#### Pomodoro Statistics

**Endpoint:** `GET /api/v1/pomodoro-sessions-stats`

**Response (200):**
```json
{
  "success": true,
  "message": "Pomodoro stats fetched",
  "data": {
    "completed_focus_minutes": 120,
    "completed_sessions": 8,
    "cancelled_sessions": 1
  }
}
```

---

### Dashboard Module

#### Dashboard Summary

**Endpoint:** `GET /api/v1/dashboard/summary`

**Response (200):**
```json
{
  "success": true,
  "message": "Dashboard summary fetched",
  "data": {
    "stats": {
      "total_tasks": 15,
      "pending_tasks": 8,
      "completed_tasks": 5,
      "overdue_tasks": 2,
      "focus_minutes_this_week": 450,
      "journals_this_week": 4
    },
    "recent_notes": [
      {
        "id": 12,
        "title": "Python Notes",
        "updated_at": "2026-03-10T16:30:00Z"
      }
    ],
    "recent_journals": [
      {
        "id": 5,
        "title": "Daily Reflection",
        "entry_date": "2026-03-10",
        "mood": "productive"
      }
    ],
    "recent_activity": {
      "notes": [
        {
          "type": "note",
          "id": 12,
          "title": "Python Notes",
          "timestamp": "2026-03-10T16:30:00Z"
        }
      ],
      "journals": [
        {
          "type": "journal",
          "id": 5,
          "title": "Daily Reflection",
          "timestamp": "2026-03-10T18:00:00Z"
        }
      ],
      "pomodoro_sessions": [
        {
          "type": "pomodoro",
          "id": 8,
          "title": "Focus session",
          "status": "completed",
          "timestamp": "2026-03-10T15:30:00Z"
        }
      ]
    }
  }
}
```

---

## Testing with Postman

### Setup

1. **Create a new Postman collection** named "Notebook API"
2. **Add environment variable** for the base URL:
   - Variable: `BASE_URL`
   - Value: `http://localhost:8000/api/v1`
   - Variable: `token` (will be set after login)

### Flow (Step-by-Step)

#### Step 1: Register

**Request Setup:**
- **Method:** `POST`
- **URL:** `{{BASE_URL}}/auth/register`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Test@1234567",
    "password_confirmation": "Test@1234567"
  }
  ```

**Test Script (Extract token):**
```javascript
if (pm.response.code === 201) {
  var jsonData = pm.response.json();
  pm.environment.set("token", jsonData.data.token);
  pm.test("✅ Registered successfully", function () {
    pm.expect(jsonData.success).to.equal(true);
  });
}
```

#### Step 2: Get Profile

**Request Setup:**
- **Method:** `GET`
- **URL:** `{{BASE_URL}}/auth/me`
- **Headers:** `Authorization: Bearer {{token}}`

#### Step 3: Create Note Category

**Request Setup:**
- **Method:** `POST`
- **URL:** `{{BASE_URL}}/note-categories`
- **Headers:** `Authorization: Bearer {{token}}`
- **Body:**
  ```json
  {
    "name": "Computer Science",
    "color": "#3498db"
  }
  ```

#### Step 4: Create Tags

**Request Setup:**
- **Method:** `POST`
- **URL:** `{{BASE_URL}}/tags`
- **Body:**
  ```json
  {
    "name": "Important"
  }
  ```

#### Step 5: Create Note

**Request Setup:**
- **Method:** `POST`
- **URL:** `{{BASE_URL}}/notes`
- **Body:**
  ```json
  {
    "title": "Python Fundamentals",
    "content": "Variables, loops, functions, and more...",
    "note_category_id": 1,
    "is_pinned": true,
    "new_tags": ["python", "programming"]
  }
  ```

#### Step 6: Search/Filter Notes

**Request Setup:**
- **Method:** `GET`
- **URL:** `{{BASE_URL}}/notes?search=python&category_id=1&per_page=5`

#### Step 7: Create Task

**Request Setup:**
- **Method:** `POST`
- **URL:** `{{BASE_URL}}/tasks`
- **Body:**
  ```json
  {
    "title": "Complete Database Assignment",
    "description": "Design a student database schema",
    "due_date": "2026-03-20",
    "priority": "high",
    "status": "pending"
  }
  ```

#### Step 8: Create Pomodoro Session

**Request Setup:**
- **Method:** `POST`
- **URL:** `{{BASE_URL}}/pomodoro-sessions`
- **Body:**
  ```json
  {
    "task_id": 1,
    "session_type": "focus",
    "planned_minutes": 25,
    "status": "running",
    "started_at": "2026-03-10T10:00:00Z"
  }
  ```

#### Step 9: Create Journal Entry

**Request Setup:**
- **Method:** `POST`
- **URL:** `{{BASE_URL}}/journals`
- **Body:**
  ```json
  {
    "title": "Today's Progress",
    "entry": "Completed the note-taking feature. Feeling productive!",
    "entry_date": "2026-03-10",
    "mood": "productive",
    "category": "daily"
  }
  ```

#### Step 10: Dashboard Summary

**Request Setup:**
- **Method:** `GET`
- **URL:** `{{BASE_URL}}/dashboard/summary`

#### Step 11: Logout

**Request Setup:**
- **Method:** `POST`
- **URL:** `{{BASE_URL}}/auth/logout`

---

## Important Notes & Assumptions

### User Isolation & Security

✅ **All resources are user-scoped.** When creating a note, task, etc., the authenticated user's ID is automatically assigned. Cross-user access is prevented via `abortIfNotOwner()` checks in every controller.

**Example:**
```php
private function abortIfNotOwner(Note $note, Request $request): void
{
    abort_if($note->user_id !== $request->user()->id, 404);
}
```

### Database Migrations

✅ **All migrations are applied** and the database is ready. The schema includes:

- `users` - User accounts
- `personal_access_tokens` - Sanctum tokens
- `note_categories` - Categories for notes
- `tags` - Tags (can be applied to multiple notes)
- `notes` - Notes with optional category
- `note_tag` - Pivot table for notes-tags relationship
- `journals` - Journal entries
- `tasks` - Task tracker with priority/status
- `pomodoro_sessions` - Pomodoro timer sessions

### Token-Based Authentication

- **Token Source:** Bearer token returned from `/auth/register` or `/auth/login`
- **Token Placement:** Always in the `Authorization` header as `Bearer YOUR_TOKEN_HERE`
- **Token Lifetime:** Configurable in Sanctum config; currently no expiration enforced
- **Revocation:** Calling `/auth/logout` deletes the current token from the database

### Validation & Error Handling

✅ **Form request validation** is applied to all endpoints:

- **400 Bad Request** - Validation fails (missing/invalid fields)
- **401 Unauthorized** - Missing or invalid token
- **404 Not Found** - Resource not found OR doesn't belong to user
- **422 Unprocessable Entity** - Business logic error (e.g., task ID doesn't belong to user)

**Example Error Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "title": ["The title field is required."],
    "email": ["The email must be a valid email."]
  }
}
```

### Tag Management

✅ **Tags can be synced in two ways** when creating/updating notes:

1. **Link existing tags:**
   ```json
   "tag_ids": [1, 3, 5]
   ```

2. **Create new tags on the fly:**
   ```json
   "new_tags": ["important", "urgent"]
   ```

3. **Both together:**
   ```json
   "tag_ids": [1, 3],
   "new_tags": ["urgent"]
   ```

The controller intelligently merges both, deduplicates, and syncs to the pivot table.

### Task Progress & Status Automation

✅ **Progress tracking is intelligent:**

- When `progress_percent >= 100`, status automatically becomes `completed`
- When `status === completed`, a `completed_at` timestamp is auto-set
- When `status !== completed`, `completed_at` is cleared
- Frontend can just send progress %, controller handles transitions

### Pomodoro Session Timestamps

✅ **Time handling is smart:**

- `started_at` is required when creating a session
- If `ended_at` is provided, `actual_minutes` is auto-calculated
- If `status` is set to `completed` without `ended_at`, the controller sets `ended_at = now()`
- Prevents manual error in time calculations

### Pagination

✅ **All list endpoints support pagination:**

- Default: 10 items per page
- Maximum: 100 items per page (hard limit for safety)
- Query: `/api/v1/notes?page=2&per_page=20`

**Pagination Response Format:**
```json
{
  "data": [ ... ],
  "links": { ... },
  "meta": {
    "current_page": 2,
    "from": 11,
    "last_page": 5,
    "per_page": 10,
    "to": 20,
    "total": 45
  }
}
```

### CORS Configuration

✅ **CORS is configured** in `config/cors.php`. By default:

- `allowed_origins`: `['*']` (all origins allowed)
- `allowed_methods`: `['*']` (all HTTP methods)
- `allowed_headers`: `['*']`
- `supports_credentials`: `true`

**For production**, update `config/cors.php` to restrict origins:
```php
'allowed_origins' => ['https://your-frontend-url.com'],
```

### Filtering & Search Behavior

✅ **Search is flexible:**

- Case-insensitive
- Partial matches (uses `LIKE` with `%` wildcards)
- Can search multiple fields (e.g., notes search both title and content)
- Multiple filters are AND-ed together

**Example:**
```
GET /api/v1/notes?search=python&category_id=2&is_pinned=true&per_page=5
```

Fetches up to 5 pinned notes in category 2 with "python" in title or content.

---

## Frontend Integration

### React Integration Example

```javascript
// Axios configuration with automatic header injection
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});

// Inject token into all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 (logout)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Usage in components
const register = async (name, email, password) => {
  const { data } = await API.post('/auth/register', {
    name,
    email,
    password,
    password_confirmation: password,
  });
  localStorage.setItem('authToken', data.data.token);
  return data.data.user;
};

const fetchNotes = async (filters = {}) => {
  const { data } = await API.get('/notes', { params: filters });
  return data.data; // Returns paginated response
};
```

### State Management (Zustand/Redux)

The `data` field in responses is designed for direct Redux/Context store integration:

```javascript
// After login
dispatch(setUser(loginResponse.data.user));
dispatch(setToken(loginResponse.data.token));

// After fetching notes
dispatch(setNotes(notesResponse.data.data));
dispatch(setNoteMeta(notesResponse.data.meta));
```

### Error Handling

All endpoints return consistent error structure:

```javascript
try {
  await API.post('/notes', notePayload);
} catch (error) {
  if (error.response?.data?.errors) {
    // Validation errors
    console.log(error.response.data.errors);
  } else {
    // General error
    console.log(error.response?.data?.message);
  }
}
```

---

## Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Authentication | ✅ Complete | Register, login, logout, profile |
| Notes CRUD | ✅ Complete | With categories, tags, search, filtering |
| Categories CRUD | ✅ Complete | Per-user categories with colors |
| Tags CRUD | ✅ Complete | Global tags per user, auto-created from notes |
| Journals | ✅ Complete | With mood, category, date filtering |
| Tasks | ✅ Complete | Priority, status, progress, due dates |
| Pomodoro Sessions | ✅ Complete | Timer tracking, filtering, stats |
| Dashboard | ✅ Complete | Summary stats, recent activity |
| Validation | ✅ Complete | Form request validation on all endpoints |
| Authorization | ✅ Complete | User isolation, ownership checks |
| Relationships | ✅ Complete | All model relationships defined |
| Pagination | ✅ Complete | All list endpoints support pagination |
| Response Format | ✅ Consistent | All endpoints return `{success, message, data}` |
| CORS | ✅ Configured | Ready for frontend integration |

---

## Environment Setup

Verify your `.env` file has:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=notebook
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost:5173
SESSION_DOMAIN=localhost
```

## Running the Backend

```bash
# Install dependencies
composer install

# Run migrations (already done, but for reference)
php artisan migrate

# Start the server
php artisan serve

# URL: http://localhost:8000
```

---

**API is production-ready! Begin frontend integration. Contact team for any questions.**
