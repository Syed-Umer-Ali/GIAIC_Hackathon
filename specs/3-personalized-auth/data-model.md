# Data Model

## Database: Postgres (Neon)

### Table: `user` (Managed by Better Auth)

Extended schema with custom fields.

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | Text (UUID) | No | Primary Key |
| `email` | Text | No | User email |
| `emailVerified` | Boolean | No | Email status |
| `name` | Text | No | User full name |
| `createdAt` | Timestamp | No | Creation time |
| `updatedAt` | Timestamp | No | Update time |
| `image` | Text | Yes | Avatar URL |
| `proficiency` | Text | Yes | Enum: 'beginner', 'learner', 'pro' |
| `tech_background`| Text | Yes | e.g., 'Web Dev', 'Non-technical' |
| `preferred_language`| Text | Yes | e.g., 'Python', 'JavaScript' |

### Table: `session` (Managed by Better Auth)

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | Text | No | Session ID |
| `userId` | Text | No | FK to `user.id` |
| `token` | Text | No | Session Token (Cookie value) |
| `expiresAt` | Timestamp | No | Expiration time |
| `ipAddress` | Text | Yes | Client IP |
| `userAgent` | Text | Yes | Client User Agent |

### Table: `account` (Managed by Better Auth)
*Standard OAuth accounts table (Google, GitHub, etc.) - populated if we enable Social Login later.*

---

## Application Entities (Frontend State)

### `UserProfile`
```typescript
interface UserProfile {
  id: string;
  email: string;
  name: string;
  proficiency: 'beginner' | 'learner' | 'pro';
  tech_background: string;
  preferred_language: string;
}
```

### `PersonalizationState`
```typescript
interface PersonalizationState {
  isEnabled: boolean; // Is the toggle active?
  isLoading: boolean; // Is AI generating?
  content: string | null; // The personalized text
  error: string | null;
}
```
