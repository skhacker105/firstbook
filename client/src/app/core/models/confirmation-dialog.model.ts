export class ConfirmationDialogData {
    constructor(
        public message?: string,
        public okDisplay?: string,
        public cancelDisplay?: string
    ) {
        if (!this.message) this.message = 'Are you sure?';
        if (!this.okDisplay) this.okDisplay = 'Yes';
        if (!this.cancelDisplay) this.cancelDisplay = 'No';
    }

}