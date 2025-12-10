import "./appointment-table.css";
import type { AppointmentTableProps } from "./types";

const AppointmentTable = (props: AppointmentTableProps) => {
    const { appointments } = { ...props }

    return (
        <table className="appointment__table">
            <caption>Appointments</caption>
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Service</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.date}</td>
                            <td>{appointment.start}</td>
                            <td>{appointment.end}</td>
                            <td>{appointment.customerName}</td>
                            <td>{appointment.service}</td>
                            <td>{appointment.status}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default AppointmentTable;