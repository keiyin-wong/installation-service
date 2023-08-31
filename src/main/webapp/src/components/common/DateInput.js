import moment from "moment";

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
            },
            ranges: {
                'Today': [moment(), moment()],
            },
            showCustomRangeLabel: false,
        })
    })

    return $input;
}