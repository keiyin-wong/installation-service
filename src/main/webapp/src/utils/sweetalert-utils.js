import Swal from "sweetalert2";

export var customSwal =  Swal.mixin({
    customClass: {
        confirmButton: "btn btn-primary ms-2",
        cancelButton: "btn btn-outline-secondary ms-2",
        denyButton: "btn btn-danger ms-2",
        inputLabel: "form-label"
    },
    buttonsStyling: false
});

export var customConfirmSwal = Swal.mixin({
    icon: "warning",
    title: "Are you sure?",
    text: `You won't be able to revert this!`,
    confirmButtonText: "Yes, delete it!",
    showCancelButton: true,
    allowOutsideClick: false,
    showCloseButton: true,
    customClass: {
        confirmButton: "btn btn-primary ms-2",
        cancelButton: "btn btn-outline-secondary ms-2",
        denyButton: "btn btn-danger ms-2",
        inputLabel: "form-label"
    },
    buttonsStyling: false
})

export var customSomethingWentWrongSwal = Swal.mixin({
    title: "Oops!",
    text: "Something went wrong",
    icon: "error",
    showCloseButton: true,
    allowOutsideClick: false,
    customClass: {
        confirmButton: "btn btn-primary ms-2",
        cancelButton: "btn btn-outline-secondary ms-2",
        denyButton: "btn btn-danger ms-2",
        inputLabel: "form-label"
    },
    buttonsStyling: false
});

export var customSuccessSwal = Swal.mixin({
    title: "Success",
    text: "Your request completed successfully",
    icon: "success",
    showCloseButton: true,
    allowOutsideClick: false,
    customClass: {
        confirmButton: "btn btn-primary ms-2",
        cancelButton: "btn btn-outline-secondary ms-2",
        denyButton: "btn btn-danger ms-2",
        inputLabel: "form-label"
    },
    buttonsStyling: false
})




export var customToast = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export var customSuccessToast = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    icon: "success",
    title: $("<p>").append(
        $("<span>").addClass("text-success").text("Success! "),
        "Your request completed successfully."
    ),
    background: "#d1e7dd"
})

export var customErrorToast = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    icon: "error",
    title: $("<p>").append(
        $("<span>").addClass("text-danger").text("Error! "),
        "An unexpected error occurred."
    ),
    background: "#f8d7da"
})