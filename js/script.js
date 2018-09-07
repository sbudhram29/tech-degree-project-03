//make sure jquery is loaded
$(function () {
    //hide job role
    $('#other-title').css({"display": "none"})
    //set cursor to name on load
    $('#name').focus();
    //
    const shirtColors = $("#color").children();
    const heartUnicode = '\u2665';
    //hide payment option
    $('#credit-card').css({"display": "none"});
    $('#paypal').css({"display": "none"});
    $('#bitcoin').css({"display": "none"});

    /*
    //handle job role dropdown

    */
    //handle t-shirt dropdowns

    const deselect = () => {
        shirtColors.each((index, opt) => opt.selected = false);
    };
    const hide = () => {
        shirtColors.map((index, data) => data.style.display = "none");
    };

    const filterTshirts = (filterBy) => {
        deselect();
        hide();

        let searchWord;
        switch(filterBy){
            case 'js puns':
            searchWord = "Puns";
            break;
            case 'heart js':
            searchWord = heartUnicode;
            break;
            default:
            return
        }

        let filterShirts = shirtColors.filter((index, data) => data.innerText.search(searchWord) !== -1)
        filterShirts[0].selected = true;
        filterShirts.each((index, shirt) => shirt.style.display = "");
    }

    $('#design').on('change', (e) => {
        filterTshirts(e.target.value);
    });
    /*
    //handle activities checkboxes
    //handle payment dropdown

    //handle credit card validation

    //handle all other validation
    */
    //handle submit
    $('#submit').on('click', (e) => {
        e.preventDefault();
        filterTshirts(heartUnicode);
    });

    let random = () => Math.floor(Math.random() * 3 + 1);

});