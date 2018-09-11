//make sure jquery is loaded
$(function () {
    //set cursor to name on load
    $('#name').focus();
    //add default color message
    $('#color').before('<span id="color-message">Please select a T-shirt theme</span>');
    //store ref to variable
    const shirtColors = $("#color").children();

    const paymentMethods = $('#payment')
        .parent()
        .children()
        .filter((index, data) => data.id !== 'payment' && data.id !== '');

    const activities = $('.activities')
        .children()
        .filter((i, data) => data.firstChild.name);

    const otherTitle = $('#other-title');

    //create local variables
    const heartUnicode = '\u2665';
    //total cost
    let conferenceTotalCost = 0;
    //registration counter
    let registeredActivities = 0;

    // add total to bottom of activities
    activities
        .parent()
        .append(`<label id="total">Total: $${conferenceTotalCost}</label>`);

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

    //check for any conflicting time
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

    //handle checkbox
    $(":checkbox").on('click', (e) => {
        let name = e.target.name;
        if (e.target.checked) {
            conferenceTotalCost += parseInt(activityInfo[name].cost, 10);
            registeredActivities += 1;
            isConflictingTime(name);
        } else {
            conferenceTotalCost -= parseInt(activityInfo[name].cost, 10);
            registeredActivities -= 1;
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
                $('#color').hide();
                $('#color-message').show();
                return
        }

        shirts[0].selected = true;
        shirts.show();
    }

    // t-shirt event handler
    $('#design').on('change', (e) => {
        $('#color-message').hide();
        $('#color').show();
        shirtColors.removeAttr('selected');
        shirtColors.hide();
        filterTshirts(e.target.value);
    });

    // payment event handler
    $('#payment').on('change', (e) => {
        paymentMethods.hide();
        //remove credit errors if payment type changes
        removeError('cc');
        removeError('zip');
        removeError('cvv');
        showSelectPayment(e.target.value);
    });

    // job event handler
    $('#title').on('change', (e) => {
        //remove othter title error on change
        removeError('other-title');
        (e.target.value === 'other')
            ? otherTitle.show()
            : otherTitle.hide()
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

    $('#mail').on('keyup', () => {
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

    $('#submit').on('click', (e) => {
        e.preventDefault();
        validateActivities(registeredActivities);
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

        if (!errors.length) {
            location.reload();
        }
    });
    //hide payment methods on load
    paymentMethods.hide();
    $('#payment').children()[1].selected = true;
    showSelectPayment('credit-card');
    //hide job role
    shirtColors.hide();
    $('#color').hide();
    shirtColors[0].selected = true;
    //hide other title
    otherTitle.hide();
});

let errors = [];

function removeError(errorName) {
    let index = errors.indexOf(errorName);
    if (index > -1) {
        errors.splice(index, 1);
    }
}
/*
Name Validation
*/

function validateName() {
    $('#name').removeClass('invalid');
    $('#nameError').remove();
    removeError('name');

    if ($('#name').val() === '') {
        $('#name').addClass('invalid');
        $('#name').before('<span id="nameError" class="error">Required</span>');

        errors.push('name');
    }
};

/*
Other Title Validation
*/

function validateOtherTitle() {
    $('#other-title').removeClass('invalid');
    removeError('other-title');
    if ($('#other-title').val() === '') {
        $('#other-title').addClass('invalid');
        errors.push('other-title');
    }
};

/*
handle payment selection
*/

function showSelectPayment(type) {
    $('#payment')
        .parent()
        .children()
        .filter((index, data) => data.id === type)
        .show();
}

/*
credit card validation
*/

function validateCVV() {
    $('#cvv').removeClass('invalid');

    removeError('cvv');
    if ($('#cvv').val() === '') {
        $('#cvv').addClass('invalid');
        errors.push('cvv');
    } else if ($('#cvv').val().length !== 3) {
        $('#cvv').addClass('invalid');
        errors.push('cvv');
    } else if (isNaN($('#cvv').val())) {
        $('#cvv').addClass('invalid');
        errors.push('cvv');
    }
}

function validateZip() {
    $('#zip').removeClass('invalid');

    removeError('zip');
    if ($('#zip').val() === '') {
        $('#zip').addClass('invalid');
        errors.push('zip');
    } else if ($('#zip').val().length !== 5) {
        $('#zip').addClass('invalid');
        errors.push('zip');
    } else if (isNaN($('#zip').val())) {
        $('#zip').addClass('invalid');
        errors.push('zip');
    }
}

function vaildateCC() {
    $('#cc-num').removeClass('invalid');

    removeError('cc');
    if ($('#cc-num').val() === '') {
        $('#cc-num').addClass('invalid');
        errors.push('cc');
    } else if ($('#cc-num').val().length < 13 || $('#cc-num').val().length > 16) {
        $('#cc-num').addClass('invalid');
        errors.push('cc');
    } else if (isNaN($('#cc-num').val())) {
        $('#cc-num').addClass('invalid');
        errors.push('cc');
    }
}

/*
Email validation
*/

function validateEmail() {
    $('#mail').removeClass('invalid');
    $('#mail').removeClass('valid');
    $('#mailError').remove();
    removeError('email');
    if ($('#mail').val() === '') {
        $('#mail').addClass('invalid');
        errors.push('email');
        $('#mail').before('<span id="mailError" class="error">Required</span>');
    } else if ($('#mail').val().search('@') === -1) {
        $('#mail').addClass('invalid');
        errors.push('email');
        $('#mail').before('<span id="mailError" class="error">Please end a full email jdoe@example.com</spa' +
                'n>');
    } else {
        $('#mail').addClass('valid');
    }
}

/*
Activitives Validation
*/

function validateActivities(numberOfActivities) {
    $('#activityError').remove();
    removeError('activity');
    if (!numberOfActivities) {
        errors.push('activity');
        $('.activities')
            .find('legend')
            .after('<span id="activityError" class="error">Please select at least 1 activity</span>');
    }
}