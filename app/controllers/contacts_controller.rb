class ContactsController < ApplicationController
  # get request to /contact-us
  # show new contact form
  def new
    @contact = Contact.new
  end
  
  # post request /contacts
  def create
    # mass assignment of form fields into contact object
    @contact = Contact.new(contact_params)
    # save the contact object to the database
    if @contact.save
      # store form fields via parameters into variables
      name = params[:contact][:name]
      email = params[:contact][:email]
      comments = params[:contact][:comments]
      # plug variables into contact mailer
      # email method and send email
      ContactMailer.contact_email(name, email, comments).deliver
      # store success message in flash hash
      # and redirect to new action
      flash[:success] = "Message Sent"
      redirect_to contact_us_path 
    else
      # if contact object doesnt save
      # store errors in flash hash
      # and redirect to the new action
      flash[:danger] = @contact.errors.full_messages.join(", ")
      redirect_to contact_us_path
    end
  end
  
  private
    # to collect data from form we need to use
    # strong parameters and whitelist the form fields
    def contact_params
      params.require(:contact).permit(:name, :email, :comments)
    end
      
 
end