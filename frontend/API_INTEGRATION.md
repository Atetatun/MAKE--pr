# API Integration Layer - Fahri

Issue #9: [Task] Fahri - API Integration & Data Fetching

## Overview

This implementation provides a complete API integration layer for the PortoCraft frontend, connecting to the backend API endpoints with proper error handling, loading states, and validation.

## Structure

```
frontend/src/
├── services/           # API service layer
│   ├── api.js         # Axios client with interceptors
│   ├── authService.js # Authentication operations
│   ├── cvService.js   # CV CRUD operations
│   ├── aiService.js   # AI Auto-Write integration
│   ├── exportService.js # PDF/JSON export
│   └── index.js       # Barrel export
├── hooks/             # Custom React hooks
│   ├── useAuth.js     # Auth operations hook
│   ├── useCV.js       # CV CRUD hook with auto-save
│   ├── useAI.js       # AI generation hook
│   ├── useExport.js   # Export hook
│   └── index.js       # Barrel export
├── store/             # Zustand stores
│   ├── authStore.js   # Auth state management
│   ├── cvStore.js     # CV data management (existing)
│   └── uiStore.js     # UI state management (existing)
├── utils/             # Utility functions
│   ├── errorHandler.js # API error handling
│   ├── validation.js   # Input validation
│   ├── format.js       # Data formatting
│   └── index.js        # Barrel export
└── tests/
    └── apiTest.js     # API integration tests
```

## Features Implemented

### ✅ Auth Flow (signup/login)
- `authService`: Login, signup, logout operations
- `useAuth` hook: Auth operations with loading states
- `authStore`: Persistent auth state with Zustand
- Token management in localStorage
- Automatic auth header injection via axios interceptor

### ✅ CV CRUD (create, read, update, delete)
- `cvService`: Full CRUD operations
- `useCV` hook: CV operations with loading states
- Auto-save functionality with 30-second interval
- Integration with existing `cvStore`

### ✅ AI Auto-Write Integration
- `aiService`: AI text generation for all sections
- `useAI` hook: Generate experience, skills, summary, projects, education
- Support for 3-option response format
- Error handling for rate limits and API failures

### ✅ PDF Export Functionality
- `exportService`: PDF and JSON export
- `useExport` hook: Export with loading states
- File download handling
- Optional email delivery support

### ✅ Error Handling & Validation
- Global error interceptor in axios
- Custom `APIError` class
- Input validation for all forms
- User-friendly error messages
- Automatic 401 redirect to login

### ✅ Loading States
- Per-operation loading states in hooks
- Global loading state via `uiStore`
- Loading messages for user feedback

### ✅ Test Coverage
- Comprehensive API test suite in `apiTest.js`
- Tests for all services
- Console-based testing via `window.testAPI`

## Usage Examples

### Authentication

```javascript
import { useAuth } from '@/hooks';

function LoginPage() {
  const { login, loading, error } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      const result = await login(credentials);
      console.log('Logged in:', result.user);
      // Redirect to dashboard
    } catch (err) {
      console.error('Login failed:', err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Form fields */}
      {loading && <Spinner />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </form>
  );
}
```

### CV Operations

```javascript
import { useCV } from '@/hooks';
import { useCVStore } from '@/store/cvStore';

function CVBuilder({ cvId }) {
  const { saveProgress, loading } = useCV();
  const { cvData } = useCVStore();

  // Auto-save setup
  useEffect(() => {
    const cleanup = setupAutoSave(cvId, 30000); // 30 seconds
    return cleanup;
  }, [cvId]);

  const handleSave = async () => {
    try {
      await saveProgress(cvId);
      console.log('Saved!');
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <div>
      {/* CV form */}
      <button onClick={handleSave} disabled={loading}>
        Save
      </button>
    </div>
  );
}
```

### AI Auto-Write

```javascript
import { useAI } from '@/hooks';

function ExperienceSection() {
  const { generateExperience, loading, options } = useAI();

  const handleGenerate = async () => {
    try {
      const aiOptions = await generateExperience({
        position: 'Senior Developer',
        company: 'Tech Corp',
        duration: '2020-2023',
        achievements: 'Led team, improved performance',
      });

      // Display 3 options for user to pick
      console.log('Options:', aiOptions);
    } catch (err) {
      console.error('AI generation failed:', err);
    }
  };

  return (
    <div>
      <button onClick={handleGenerate} disabled={loading}>
        Generate with AI
      </button>
      {loading && <Spinner message="Generating..." />}
      {options.map((opt, i) => (
        <OptionCard key={i} text={opt} />
      ))}
    </div>
  );
}
```

### PDF Export

```javascript
import { useExport } from '@/hooks';

function ExportButton({ cvId }) {
  const { exportPDF, loading } = useExport();

  const handleExport = async () => {
    try {
      await exportPDF(cvId, 'my-cv.pdf');
      console.log('PDF downloaded!');
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  return (
    <button onClick={handleExport} disabled={loading}>
      {loading ? 'Exporting...' : 'Export PDF'}
    </button>
  );
}
```

## Configuration

### Environment Variables

Create `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_ENV=development
```

### Backend API Endpoints

The integration assumes these backend endpoints (already implemented by Riski):

- `POST /api/auth/signup` - User signup
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/cvs` - List all CVs
- `GET /api/cvs/:id` - Get CV by ID
- `POST /api/cvs` - Create new CV
- `PUT /api/cvs/:id` - Update CV
- `POST /api/cvs/:id/save-progress` - Auto-save
- `DELETE /api/cvs/:id` - Delete CV
- `POST /api/ai/generate` - AI text generation
- `POST /api/export/pdf` - Export as PDF
- `POST /api/export/json` - Export as JSON

## Testing

### Manual Testing (Browser Console)

```javascript
// Run all tests
await window.testAPI.runAllTests();

// Test individual services
await window.testAPI.testAuth();
await window.testAPI.testCV();
await window.testAPI.testAI();
await window.testAPI.testExport(cvId);
```

### Integration Testing

1. Start backend: `cd .. && npm start` (port 3000)
2. Start frontend: `npm run dev` (port 3000 with proxy)
3. Open browser console
4. Run: `await window.testAPI.runAllTests()`

## Error Handling

All services include comprehensive error handling:

- **401 Unauthorized**: Auto-redirect to login
- **403 Forbidden**: Permission denied message
- **404 Not Found**: Resource not found
- **429 Rate Limited**: Retry message
- **500 Server Error**: Generic error message
- **Network errors**: No response message

Errors are propagated to hooks and can be displayed in UI via the `error` state.

## Auto-Save Feature

The `useCV` hook includes an auto-save setup function:

```javascript
const cleanup = setupAutoSave(cvId, 30000); // Save every 30 seconds
```

- Only saves when `isDirty` flag is true (data changed)
- Silent background saves
- Console log confirmation
- Returns cleanup function for useEffect

## Validation

Input validation utilities in `utils/validation.js`:

- Email format validation
- Password strength validation (min 8 chars, letter + number)
- Required field validation
- Login/signup credential validation
- AI input validation

## Next Steps

### Integration with Existing Pages

1. **Landing Page**: Add signup/login forms using `useAuth`
2. **Dashboard Page**: Load CV list using `useCV.listCVs()`
3. **CV Builder Page**: 
   - Load CV with `useCV.getCV(id)`
   - Save with `useCV.saveProgress(id)`
   - Setup auto-save
4. **Add AI modal**: Use `useAI` hooks for generation
5. **Export button**: Use `useExport.exportPDF()`

### Component Updates Needed

- Create `LoginForm` component
- Create `SignupForm` component
- Create `AIGenerateModal` component
- Update `CVBuilderPage` to load/save CV
- Update `DashboardPage` to list CVs

## Dependencies

All dependencies already in `package.json`:

- `axios`: ^1.6.0 (HTTP client)
- `zustand`: ^4.4.6 (State management)
- `react-hook-form`: ^7.48.0 (Form handling)

## References

- **Backend API**: `/src/routes/` (auth.js, cvs.js, ai.js, export.js)
- **PRD**: `/docs/prd.md` (Features 4.2, 4.3, 4.5)
- **Plan**: `/docs/plan.md` (Fahri Week 1-8 tasks)
- **Issue**: #9 on GitHub

---

**Status**: ✅ Complete - Ready for integration with UI components

**Author**: Fahri  
**Date**: 2026-11-03  
**Issue**: #9
