class ContactMailer < ActionMailer::Base
  default to: 'juliematheson@yandex.com'
  
  def contact_email(name, email, comments)
    @name = name
    @email = email
    @comments = comments
    
    mail(from: email, subject: 'contact form message')
    
  end
end