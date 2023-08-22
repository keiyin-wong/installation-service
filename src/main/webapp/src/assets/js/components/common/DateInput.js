/**
 *
 * Create a single date input with date range picker
 *
 * @returns {*|jQuery}
 */
export default function DateInput() {
    let $input = $("<input>").prop({
        "readonly": true,
    });

    $input.ready(function () {
        $input.daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            autoApply: true,
            locale: {
                format: "DD-MM-YYYY",
                cancelLabel: 'Clear'
            }
        })
    })

    return $input;
}