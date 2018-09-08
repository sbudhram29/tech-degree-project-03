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

    const isConflictingTime = (name) => {
        let time = activityInfo[name].time;
        activities.map((i, item) => {
            if (item.firstChild.name !== name) {
                if (activityInfo[item.firstChild.name].time === time) {
                    let conflictingRef = $(`input[name="${item.firstChild.name}"]`);
                    let isDisabled = conflictingRef.prop("disabled");
                    conflictingRef.attr("disabled", !isDisabled);
                }
            }
        })
    };

    $(":checkbox").on('click', (e) => {
        let name = e.target.name;
        if (e.target.checked) {
            conferenceTotalCost += parseInt(activityInfo[name].cost, 10);
            isConflictingTime(name);
        } else {
            conferenceTotalCost -= parseInt(activityInfo[name].cost, 10);
            isConflictingTime(name);
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

    /*
    Validation
    */

    $('#name').on('blur', () => {
        validateName();
    });

    $('#other-title').on('blur', () => {
        validateOtherTitle();
    });

    $('#mail').on('blur', () => {
        validateEmail();
    });

    $('#cc-num').on('blur', () => {
        vaildateCC();
    });

    $('#zip').on('blur', () => {
        validateZip();
    });

    $('#cvv').on('blur', () => {
        validateCVV();
    });

    $('#submit').on('click', () => {
        validateEmail();
        validateName();
        if ($('#title').val() === 'other') {
            validateOtherTitle();
        }
        if ($('#payment').val() === 'credit-card') {
            vaildateCC();
            validateZip();
            validateCVV();
        }
    });
    //hide payment methods on load
    paymentMethods.hide();
    /**/
    //hide job role
    otherTitle.hide();
});

const validateName = () => {
    if ($('#name').val() === '') {
        $('#name').addClass('invalid');
    } else {
        $('#name').removeClass('invalid');
    }
};

const validateOtherTitle = () => {
    if ($('#other-title').val() === '') {
        $('#other-title').addClass('invalid');
    } else {
        $('#other-title').removeClass('invalid');
    }
};

function validateCVV() {
    if ($('#cvv').val() === '') {
        $('#cvv').addClass('invalid');
    } else if ($('#cvv').val().length !== 3) {
        $('#cvv').addClass('invalid');
    } else if (isNaN($('#cvv').val())) {
        $('#cvv').addClass('invalid');
    } else {
        $('#cvv').removeClass('invalid');
    }
}

function validateZip() {
    if ($('#zip').val() === '') {
        $('#zip').addClass('invalid');
    } else if ($('#zip').val().length !== 5) {
        $('#zip').addClass('invalid');
    } else if (isNaN($('#zip').val())) {
        $('#zip').addClass('invalid');
    } else {
        $('#zip').removeClass('invalid');
    }
}

function vaildateCC() {
    if ($('#cc-num').val() === '') {
        $('#cc-num').addClass('invalid');
    } else if ($('#cc-num').val().length < 13 || $('#cc-num').val().length > 16) {
        $('#cc-num').addClass('invalid');
    } else if (isNaN($('#cc-num').val())) {
        $('#cc-num').addClass('invalid');
    } else {
        $('#cc-num').removeClass('invalid');
    }
}

function validateEmail() {
    if ($('#mail').val() === '') {
        $('#mail').addClass('invalid');
    } else if ($('#mail').val().search('@') === -1) {
        $('#mail').addClass('invalid');
    } else {
        $('#mail').removeClass('invalid');
    }
}
