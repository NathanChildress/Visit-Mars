# Visit-Mars 
> This is just a fun little site that represents a martian lobby enticing Terrans to come and visit. While curious about us, they don't quite trust us to host any of their secret martian servers locally at the embassy. So they're attempting to send their data requests as generics back to martian lambda space to be sanitized then processed to keep their martian communications safe from terran snooping.

## Setup
For now, they've created a seperate config.js file to store their martian keys while they setup their tourism agency. To all future martian embassies being deployed make sure you place your martian API keys there.

## Goals
After the site is built I want to create an AWS API gateway and lambda function that will take API requests and break them out into seperate API requests, then collect them all and return the data in a single statement back to the site.

