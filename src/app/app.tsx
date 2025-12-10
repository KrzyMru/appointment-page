import './app.css';
import AppointmentTable from './components/appointment-table/appointment-table';
import initialAppointments from "./appointments-mock.json";
import { useEffect, useState } from 'react';
import type { Appointment } from './components/appointment-table/types';
import NewAppointmentDialog from './components/new-appointment-dialog/new-appointment-dialog';
import type { NewAppointmentFormInputs } from './components/new-appointment-dialog/types';

const App = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const item = localStorage.getItem('appointments');
      const parsedItem: Appointment[] = item ? JSON.parse(item) : initialAppointments;
      return parsedItem;
    } catch {
      return initialAppointments as Appointment[];
    }
  });
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleAddAppointment = (appointment: NewAppointmentFormInputs) => {
    setAppointments([...appointments, {...appointment, id: appointment.date+appointment.start+appointment.end}]);
  }

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  return (
    <main>
      <button
        title='Book appointment'
        onClick={() => setShowDialog(true)}
      >
        + Book Appointment
      </button>
      <AppointmentTable appointments={appointments} />
      <NewAppointmentDialog 
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onSubmit={handleAddAppointment}
        appointments={appointments}
      />
    </main>
  )
}

export default App;
