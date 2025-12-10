interface Appointment {
    id: string,
    customerName: string,
    date: string,
    start: string,
    end: string,
    service: "Consultation" | "Follow-up" | "Therapy",
    status: "pending" | "confirmed" | "cancelled",
    notes?: string,
}

interface AppointmentTableProps {
    appointments: Appointment[],
}

export type { Appointment, AppointmentTableProps }