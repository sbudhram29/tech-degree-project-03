//make sure jquery is loaded
$(function () {
    //set cursor to name on load
    $('#name').focus();
    //
    const shirtColors = $("#color").children();

    const paymentMethods = $('#payment')
        .parent()
        .children()
        .filter((index, data) => data.id !== 'payment' && data.id !== '');

    const activities = $('.activities')
        .children()
        .filter((i, data) => data.firstChild.name);

    const otherTitle = $('#other-title');

    const heartUnicode = '\u2665';
    let conferenceTotalCost = 0;

    // add total to bottom of activities
    activities
        .parent()
        .append(`<label id="total">Total: $${conferenceTotalCost}</label>`);
    /*
    //handle job role dropdown
    */

    const activityInfo = {};
    activities.each((index, data) => {

        let name = data.firstChild.name;
        let reCost = /\$(.*?)/;
        let reTime = /\— (.*?)\,/;
        let cost = data
            .innerText
            .split('$');

        let time = data
            .innerText
            .match(reTime);

        activityInfo[name] = {
            name,
            time: (time)
                ? time[1]
                : null,
            cost: cost[1]
        };
    });

    $(":checkbox").on('click', (e) => {
        if (e.target.checked) {
            conferenceTotalCost += parseInt(activityInfo[e.target.name].cost, 10);
        } else {
            conferenceTotalCost -= parseInt(activityInfo[e.target.name].cost, 10);
        }
        $("#total").html(`Total: $${conferenceTotalCost}`);
    });

    //handle t-shirt dropdowns
    const filterBy = (searchWord) => shirtColors.filter((index, data) => data.innerText.search(searchWord) !== -1);

    const filterTshirts = (data) => {

        let shirts;
        switch (data) {
            case 'js puns':
                shirts = filterBy("Puns");
                break;
            case 'heart js':
                shirts = filterBy(heartUnicode);
                break;
            default:
                return
        }

        shirts[0].selected = true;
        shirts.show();
    }

    // t-shirt event handler
    $('#design').on('change', (e) => {
        shirtColors.removeAttr('selected');
        shirtColors.hide();
        filterTshirts(e.target.value);
    });
    // payment event handler
    $('#payment').on('change', (e) => {
        paymentMethods.hide();
        $('#payment')
            .parent()
            .children()
            .filter((index, data) => data.id === e.target.value)
            .show();
    });
    // job event handler
    $('#title').on('change', (e) => {
        (e.target.value === 'other')
            ? otherTitle.show()
            : otherTitle.hide()
    });
    /*
    //handle activities checkboxes
    //handle credit card validation

    //handle all other validation
    */
    //handle submit
    $('#submit').on('click', (e) => {
        e.preventDefault();
        filterTshirts(heartUnicode);
    });

    //hide payment methods on load
    paymentMethods.hide();
    /**/
    //hide job role
    otherTitle.hide();
});