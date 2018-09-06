//make sure jquery is loaded
$(function () {
    //hide job role
    $('#other-title').css({"display": "none"})
    //set cursor to name on load
    $('#name').focus();
    //
    const shirtColors = $("#color").children();
    //hide payment option
    $('#credit-card').css({"display": "none"});
    $('#paypal').css({"display": "none"});
    $('#bitcoin').css({"display": "none"});

    /*
    //handle job role dropdown

    */
    //handle t-shirt dropdowns

    let filterTshirts = () => {
        let filterShirts = shirtColors.filter((index, data) => data.innerText.search("Puns") !== -1)
        filterShirts.each((index, shirt) => console.log(shirt.innerText))
    }
    /*
    //handle activities checkboxes

    //handle payment dropdown

    //handle credit card validation

    //handle all other validation
    */
    //handle submit
    $('#submit').on('click', (e) => {
        e.preventDefault();
        console.log(e.target.textContent);
        console.log(filterTshirts());
    });

    let random = () => Math.floor(Math.random() * 3 + 1);

});