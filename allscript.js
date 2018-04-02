var Request = new XMLHttpRequest();

Request.open(
    "get",
    "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97",
    true
);

var JasonDataParse;
var TravelData;
Request.onload = function() {
    JasonDataParse = JSON.parse(Request.responseText);
    TravelData = JasonDataParse.result.records;
    console.log(JasonDataParse);
    console.log(TravelData);
    datadidload();
};
Request.send(null);

function datadidload() {
    var area = document.querySelector("#areaId");
    var HotArea = document.querySelector(".HotArea_btn");
    var list = document.querySelector(".list");
    var SelectZoneName = document.querySelector(".SelectareaZone");
    console.log(SelectZoneName);
    var temp = [];
    var options = "";
    selcetArea = [{
        Zone: "--請選擇行政區--"
    }];
    var data = selcetArea.concat(TravelData);
    for (var i = 0; i < data.length; i++) {
        if (temp.indexOf(data[i].Zone) < 0) {
            temp.push(data[i].Zone);
            options +=
                '<option value = "' +
                data[i].Zone +
                '" > ' +
                data[i].Zone +
                "</option>";
        }
    }
    area.innerHTML = options;

    function updateData(e) {
        var select = e.target.value;
        var HotAreaClick = e.target.innerHTML;
        var str = "";
        for (var i = 1; i < data.length; i++) {
            if (select == data[i].Zone || HotAreaClick == data[i].Zone) {
                str +=
                    "<li>" +
                    '<div class="ListBox">' +
                    '<img class="ListAreaImg" src="' +
                    data[i].Picture1 +
                    '" >' +
                    '<div class="AreaImg_Picdescribe">' +
                    '<div class="Picdescribe">' +
                    data[i].Picdescribe1 +
                    "</div>" +
                    '<div class="Zone">' +
                    data[i].Zone +
                    "</div>" +
                    "</div>" +
                    "<div>" +
                    '<img class="Listicon" src="icons_clock.png">' +
                    data[i].Opentime +
                    "</div>" +
                    "<div>" +
                    '<img class="Listicon" src="icons_pin.png">' +
                    data[i].Add +
                    "</div>" +
                    "<div>" +
                    '<img class="Listicon" src="icons_phone.png">' +
                    data[i].Tel +
                    "</div>" +
                    "</div>" +
                    "</li > ";
            }
            SelectZoneName.innerHTML = select || HotAreaClick;
        }
        console.log(list.innerHTML);
        list.innerHTML = str;
    }
    area.addEventListener("change", updateData, false);
    HotArea.addEventListener("click", updateData, false);
}