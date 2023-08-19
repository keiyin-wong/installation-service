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