
export default function ServiceTable(props) {


    // ================[ Jquery Elements ]====================

    let $table = <table />

    // ================[End of Jquery Elements ]===============



    let $component = (
        <div>
            <$table className="table w-100">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>English Description</th>
                        <th>Chinese Description</th>
                        <th>Price</th>
                        <th>Calculation Method</th>
                    </tr>
                </thead>
            </$table>
        </div>
    )


    return {
        $component
    }

}