/* global $, Stripe */
// Document ready 
$(document).on('turbolinks.load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  
  
    // Set stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));
  // when user clicks form submit button , 
  submitBtn.click(function(event){
  //we'll prevent default form submission behaviour.
    event.preventDefault();
    //collect the credit card fields
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
  //send the card info to stripe
  Stripe.createToken({
    number: ccNum,
    cvc: cvcNum,
    exp_month:expMonth,
    exp_year: expYear
  }, stripeResponseHandler)
  
  });
  //stripe will return a card token
  //inject card token as hidden fields into form
  //submit form to our rails app.

})
