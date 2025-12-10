import "./new-appointment-dialog.css";
import { DialogPanel } from "@headlessui/react";
import BaseDialog from "../base-dialog/base-dialog";
import { useForm } from "react-hook-form";
import type { NewAppointmentDialogProps, NewAppointmentFormInputs } from "./types";

const NewAppointmentDialog = (props: NewAppointmentDialogProps) => {
    const { isOpen, onClose, onSubmit, appointments } = { ...props }
    const { 
        register, handleSubmit, watch, setError, formState: { errors },
    } = useForm<NewAppointmentFormInputs>();

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const startTime = watch('start');

    const onSubmitForm = (appointment: NewAppointmentFormInputs) => {
        if(checkOverlap(appointment)) {
            setError('date', {
                type: 'manual',
                message: 'An appointment can\'t overlap with others in time',
            });
            setError('start', {
                type: 'manual',
                message: 'An appointment can\'t overlap with others in time',
            });
            setError('end', {
                type: 'manual',
                message: 'An appointment can\'t overlap with others in time',
            });
        }
        else {
            onSubmit(appointment);
            onClose();
        }
    }

    const checkOverlap = (A: NewAppointmentFormInputs): boolean => {
        if(appointments.some((B) => A.date === B.date && A.start < B.end && B.start < A.end))
            return true;
        return false;
    }

    const anyErrors = errors.customerName || errors.date || errors.end || errors.notes || errors.service || errors.start || errors.status 
        ? true : false;

    return (
        <BaseDialog
            isOpen={isOpen}
            onClose={onClose}
        >
            <DialogPanel className="appointment__panel">
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="appointment__field">
                        <label htmlFor="customerNameId" className="appointment__label">Customer Name</label>
                        <input 
                            id="customerNameId"
                            type="text"
                            {...register("customerName", { required: { value: true, message: 'This field is required' } })} 
                            className="appointment__input"
                        />
                        {
                            errors.customerName && 
                            <span className="appointment__error">{errors.customerName.message}</span>
                        }
                    </div>
                    <div className="appointment__field">
                        <label htmlFor="dateId" className="appointment__label">Date</label>
                        <input 
                            id="dateId"
                            type="date"
                            {...register("date", { 
                                required: { value: true, message: 'This field is required' },
                                min: { value: timeNow, message: 'You can\'t book an appointment in the past' } 
                            })} 
                            className="appointment__input"
                        />
                        {
                            errors.date && 
                            <span className="appointment__error">{errors.date.message}</span>
                        }
                    </div>
                    <div className="appointment__field">
                        <label htmlFor="startId" className="appointment__label">Start Time</label>
                        <input 
                            id="startId"
                            type="time"
                            {...register("start", { required: { value: true, message: 'This field is required' } })} 
                            className="appointment__input"
                        />
                        {
                            errors.start && 
                            <span className="appointment__error">{errors.start.message}</span>
                        }
                    </div>
                    <div className="appointment__field">
                        <label htmlFor="endId" className="appointment__label">End Time</label>
                        <input 
                            id="endId"
                            type="time"
                            {...register("end", { 
                                required: { value: true, message: 'This field is required' },
                                validate: (value) => value > startTime || 'An appointment can\'t end before it begins',
                            })}
                            className="appointment__input"
                        />
                        {
                            errors.end && 
                            <span className="appointment__error">{errors.end.message}</span>
                        }
                    </div>
                    <div className="appointment__field">
                        <label htmlFor="serviceId" className="appointment__label">Service</label>
                        <select
                            id="serviceId"
                            defaultValue="Consultation"
                            {...register("service", { required: { value: true, message: 'This field is required' } })} 
                        >
                            <option value="Consultation">Consultation</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Therapy">Therapy</option>
                        </select>
                        {
                            errors.service && 
                            <span className="appointment__error">{errors.service.message}</span>
                        }
                    </div>
                    <div className="appointment__field">
                        <label htmlFor="statusId" className="appointment__label">Service</label>
                        <select
                            id="statusId"
                            defaultValue="pending"
                            {...register("status", { required: { value: true, message: 'This field is required' } })} 
                        >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        {
                            errors.status && 
                            <span className="appointment__error">{errors.status.message}</span>
                        }
                    </div>
                    <div className="appointment__field">
                        <label htmlFor="notesId" className="appointment__label">Notes</label>
                        <textarea 
                            id="notesId"
                            {...register("notes")} 
                        />
                        {
                            errors.notes && 
                            <span className="appointment__error">{errors.notes.message}</span>
                        }
                    </div>
                    <button 
                        type="submit" 
                        title="Book this appointment"
                        className={`appointment__submit ${anyErrors ? 'appointment__submit--disabled' : ''}`}
                        disabled={anyErrors}
                    >
                        Book this appointment
                    </button>
                </form>
            </DialogPanel>
        </BaseDialog>
    );
}

export default NewAppointmentDialog;