# TODO: Fix and Improve NotesState.js and Notes.js

- [ ] Edit src/context/notes/NotesState.js: Replace hardcoded auth token with localStorage.getItem('token')
- [ ] Edit src/components/Notes.js: Add useNavigate import and redirect to /login if no token
- [ ] Add error handling for fetch failures in NotesState.js
- [ ] Add error handling for getNotes in Notes.js
- [ ] Optionally add loading state in Notes.js
