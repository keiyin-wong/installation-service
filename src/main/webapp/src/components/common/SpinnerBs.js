export default function SpinnerBs () {
    return (
        $("<div>").addClass("d-flex justify-content-center").append(
            $("<div>").addClass("spinner-border")
                .attr("role", "status")
                .append(
                    $("<span>").addClass("visually-hidden").text("Loading...")
                )
        )
    )
}