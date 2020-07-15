# Visit-Mars 
> This is just a fun little site that represents a martian lobby enticing Terrans to come and visit. While curious about us, they don't quite trust us to host any of their secret martian servers locally at the embassy. So they're attempting to send their data requests as generics back to martian lambda space to be sanitized then processed to keep their martian communications safe from terran snooping.


# Technology used
- HTML
- CSS
- Bootstrap
- JavaScript
- jQuery
- AWS API Gateway
- AWS Lambda

# Setup
For now, they've created a seperate config.js file to store their martian keys while they setup their tourism agency. To all future martian embassies being deployed make sure you place your martian API keys there.

# AWS API gateway Setup
In order to make the AWS API proxy work. There are a few steps. CORS errors are pretty easy to run into trying to set things up. The best advice I can give is that when creating your AWS API Gateway, you need to create your 200 response headers before deploying your api to gateway. Using the CORS enable option or attempting to modify an existing API gateway won't necessarily get it working. [Test-Cors](http://client.cors-api.appspot.com/client) is a great site to test your gateway while you're setting up.


# Future Goals
Develop a booking ticket where visitors can click a 'reserve spot' on one of the upcoming launches. Developing some little svg animations on the ticket when reserved to offer some whimsy. The local celebrities twitter column should be collapsible when another celebrity is selected. This is probably more doable using the twitter API and loading the data myself than attempting to maintain space with the twitter widget.

