import type { Appointment } from "../appointment-table/types";
import type { DialogProps } from "../base-dialog/types";

interface NewAppointmentDialogProps extends DialogProps {
    appointments: Appointment[],
    onSubmit: (appointment: NewAppointmentFormInputs) => void,
}

interface NewAppointmentFormInputs {
    customerName: string,
    date: string,
    start: string,
    end: string,
    service: "Consultation" | "Follow-up" | "Therapy",
    status: "pending" | "confirmed" | "cancelled",
    notes?: string,
}

export type { NewAppointmentDialogProps, NewAppointmentFormInputs }