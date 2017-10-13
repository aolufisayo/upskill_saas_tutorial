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
    submitBtn.val("processing").prop('disabled', true);
    //collect the credit card fields
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
        
    //use stripe js library to check for card errors.
    var error = false;
    
    //validate card number
    
    if (!Stripe.validateCardNumber(ccNum)){
      error = true
      alert("The credit card number appears to be invalid")
    }
    // validate cvc
    if (!Stripe.validateCVC(cvcNum)){
      error = true
      alert("The CVC number appears to be invalid")
    }
    //validate expiry 
    if (!Stripe.validateExpiry(expMonth, expYear)){
      error = true
      alert("The expiration date appears to be invalid")
    }
   
    if (error) {
      //if there are card errors , dont send to stripe
      submitBtn.prop("disabled", false).val("Sign up");
      
    } else {
      //send the card info to stripe
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month:expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    
    }
    
    return false   
  
  });
  //stripe will return a card token
  function stripeResponseHandler(status, response){
    var token = response.id
    
     //inject card token as hidden fields into form
    theForm.append($('<input type="hidden" name="user[stripe_card_token]"> ').val(token) );
    
    //submit form to our rails app.
    theForm.get(0).submit();
  }
 
 

})
