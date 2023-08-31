import SpinnerBs from "../components/common/SpinnerBs";

/**
 *
 * @param e - event
 * @param {boolean} processing - boolean indicating whether the table is processing
 * @param {number} col - number of columns
 */
export function jqueryDatatableProcessingFunction(e, processing, col) {
    let $table = $(e.currentTarget);

    let spinner = $("<tr>").append(
        $("<td>").attr("colspan", col).append(
            $("<div>").css("overflow-y", "hidden").append(
                SpinnerBs()
            )
        )
    );
    if (processing) {
        $table.find("tbody").empty().append(spinner);
    } else {
        spinner.remove();
    }
}

/**
 *
 * @param e - event
 * @param col - number of columns
 */
export function jqueryDatatablePreXhrProcessing(e, col) {
    let $table = $(e.currentTarget);
    let $tbody = $table.find("tbody");
    let spinner = $("<tr>").append(
        $("<td>").attr("colspan", col).append(
            $("<div>").css("overflow-y", "hidden").append(
                SpinnerBs()
            )
        )
    );
    $tbody.empty().append(spinner);
}

export let jqueryValidateClassOptions = {
    errorClass: "invalid-feedback",
    errorElement: "div",
    highlight: function (input) {
        $(input).addClass('is-invalid');
    },
    unhighlight: function (input) {
        $(input).removeClass('is-invalid');
    },
    errorPlacement: function (error, element) {
        error.insertAfter(element);
    },
}

export let jqueryValidateTooltipOptions = {
    errorClass: "invalid-tooltip",
    errorElement: "div",
    highlight: function (input) {
        $(input).addClass('is-invalid');
    },
    unhighlight: function (input) {
        $(input).removeClass('is-invalid');
    },
    errorPlacement: function (error, element) {
        error.insertAfter(element);
    },
}

export let jqueryValidateTooltipOptionsWithSelect2 = {
    ...jqueryValidateClassOptions,
    errorPlacement: function (error, element) {
        // If select2, handle the problem
        if (element.hasClass("select2-hidden-accessible")) {
            error.insertAfter(element.next(".select2-container"));
        } else {
            error.insertAfter(element);
        }
    },
}