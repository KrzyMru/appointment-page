import "./base-dialog.css";
import { Dialog, DialogBackdrop } from "@headlessui/react";
import type { BaseDialogProps } from "./types";

const BaseDialog = (props: BaseDialogProps) => {
    const { isOpen, onClose, children } = { ...props }

    return (
        <Dialog 
            open={isOpen} 
            onClose={onClose} 
            transition
            className="dialog__container"
        >
            <DialogBackdrop className="dialog__backdrop" />
            <div className="dialog__wrapper">
                {children}
            </div>
        </Dialog>
    )
}

export default BaseDialog;