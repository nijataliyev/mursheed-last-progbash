$(document).ready(function () {
    // $('.select2MultipleDropDown').select2();
    // $('.select2DropDown').select2();
    var routeDetail = $('#routeDetail').DataTable({
        "processing": true, // for show progress bar
        "serverSide": true, // for process server side
        "filter": true, // this is for disable filter (search box)
        "orderMulti": false, // for disable multiple column at once
        "ordering": false,
        "ajax": "routes.txt",

        "columns": [
            {
                "data": "id",
                "class": "text-center pt-3",
            },
            {
                "data": "fromRoute",
                render: function (row) {
                    return readSelectData(row);
                }
            },
            {
                "data": "toRoute",
                render: function (row) {
                    return readSelectData(row);
                }
            },
            {
                "data": "price", 
                "class": "text-center pt-3 routePrice",
            },
            // icon deyisecek todo
            {
                "data": null,
                "className": 'details-control',
                "orderable": false,
                "defaultContent": ''
            }
        ],
        "order": [
            [1, 'asc']
        ],
        language: {
            paginate: {
                next: `<i style="color: #007BFF;" class="fas fa-arrow-right"></i>`,
                previous: `<i style="color: #007BFF;" class="fas fa-arrow-left"></i>`,
            }
        }
    });

//#region row Details
var detailRows = [];

$('#routeDetail tbody').on('click',
    'tr td.details-control',
    function () {

        var tr = $(this).closest('tr');
        var row = routeDetail.row(tr);
        var idx = $.inArray(tr.attr('id'), detailRows);

        if (row.child.isShown()) {
            tr.removeClass('details');
            row.child.hide();
            tr.removeClass('shown');
            // Remove from the 'open' array
            detailRows.splice(idx, 1);
        } else {
            tr.addClass('shown');
            tr.addClass('details');
            row.child(format2(row.data())).show();

            // Add to the 'open' array
            if (idx === -1) {
                detailRows.push(tr.attr('id'));
            }
        }
});

$('#btn-show-all-children').on('click',
    function () {
        // Enumerate all rows
        routeDetail.rows().every(function () {
            // If row has details collapsed
            if (!this.child.isShown()) {
                // Open this row
                this.child(format2(this.data())).show();
                $(this.node()).addClass('shown');
            }
        });
});

$('#btn-hide-all-children').on('click',
    function () {
        // Enumerate all rows
        routeDetail.rows().every(function () {
            // If row has details expanded
            if (this.child.isShown()) {
                // Collapse row details
                this.child.hide();
                $(this.node()).removeClass('shown');
            }
        });
});

routeDetail.on('draw',
    function () {
        $.each(detailRows,
            function (i, id) {
                $('#' + id + ' td.details-control').trigger('click');
            });
});
//#endregion
});

function format2(row) {

    var card = `<div>
                    <h4 class="header-title text-center header-title p-2">Route Info</h4>`,

        cardEnd = `</div>`,
        // route table
        routeInfoTable = `<textarea disabled class='routeInfoTextarea' rows='2' style="width: 100%; background-color: #F2F2F2;" >`,
        routeInfoTableEnd = `</textarea>`;


    // region table

    // table first row
    routeInfoTable+=`${row.info}`;
    routeInfoTable += routeInfoTableEnd;
    //#endregion DocDirection and DocDirectionDetails
    card += routeInfoTable;
    card += cardEnd;
    return card;
}
//#endregion
function readSelectData(row) {
    let selectStart = "<select disabled style='color:black' class='select2RouteDropDown formField routeSelect text-center'>"
    let selectEnd = "</select>";
    Array.prototype.forEach.call(row,
        function (item) {
            selectStart += `<option value="${item.id}">${item.name}</option>`;
        });
    selectStart += selectEnd;
    return selectStart;
}

