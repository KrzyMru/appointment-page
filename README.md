How to run:  
  Open this link: https://appointment-page-three.vercel.app/  
  There is no backend.

Assumptions:  
  This application was made with Firefox, and I didn't check for any compatibility errors with other browsers.  
  
Trade-offs:  
  I used a very simple folder structure, which can cause problems in bigger projects.  
  
  The table is responsive by hiding columns on smaller screen sizes. While this may work, a way to access the full information would be needed.
  This approach also prevented me from containing the 'no appointments yet' message inside the table, because I couldn't hardcode colspan.  

  Checking the overlap forced me to pass props to the form dialog. Normally this wouldn't be the case, as this would be checked on the server.  

  Loading the data from localstorage works, but is a bit less readable than the usual fetch in useEffect.  

Validation and overlap logic:  
  The form is validated by using React Hook Form, all according to the specification for each field.  
  All fields except notes are required, and both date and endTime are also additionally checked.  
  The form submit button is correctly disabled when errors are present, and all errors appear near their origins.  
  
  Overlap is checked just before submitting the appointment. If there is one, then an error is shown for each date/time input.  

What's done:  
  1. Appointments Table:  
    (x) Display a list of appointments in a semantic, accessible table.  
    (x) Columns: Date, Start Time, End Time (or Duration), Customer Name, Service, Status.  
2. Add New Appointment:  
    (x) A “New Appointment” button opens a modal or panel with a form.  
    (x) Fields (minimum):  
        ■ Customer name (required)  
        ■ Date (required; cannot be in the past)  
        ■ Start time (required)  
        ■ End time OR Duration (required; ensure end > start)  
        ■ Service (select from at least 3 options; required)  
        ■ Status (Pending/Confirmed/Cancelled; default Pending)  
        ■ Notes (optional)  
    (x) Validation:  
        ■ Required fields and sensible formats.  
        ■ Prevent overlapping bookings on the same date:  
          ■ Overlap rule: two appointments A and B overlap if A.start < B.end AND B.start < A.end (use 24h times).  
        ■ Show inline errors and disable submit while invalid.  
  (x) On successful submission, the table updates immediately.  
4. Data Handling:  
    (x) Frontend-only with local state and localStorage.  
5. Accessibility and Responsiveness:  
  (x) Keyboard accessible modal and form controls (focus management, ESC to close, labels tied to inputs).  
  (x) Semantic table and proper header cells.  
  (x) Responsive layout: readable on mobile and desktop.  

What's not done:  
  (kind-of done, but not inside the table itself) Handle empty state gracefully (no appointments yet).  
  (no loading states) Even if using a backend, the UI should remain responsive and handle loading/error states.  
