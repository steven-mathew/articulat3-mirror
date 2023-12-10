# Meeting Minutes | Dec 7, 2023

>_**Note-taker:**_ Sarah
>
>_**Attendees:**_ Everyone! (Allen, Jasper, Max, Neeco, Sarah, Steven; Ashkan)

## Meeting Agenda
Intro
  - This will be a quick, wrap-up meeting

Go through contents in partner handoff email
  - Mention we will be sending our demo
  - Summary of all our latest implemented features
  - How to access our accounts (hand-off)
    - We won’t give Ashkan any credentials
    - Ashkan will provision it himself – using terraform files
    - DigitalOcean token will be needed and Google Cloud
      - Will need the workers
        - Started by shell script, remotely by ssh
      - Will be made automatic
      - We will provide documentation for all the steps

Demo Ashkan the latest features
- Progress thumbnail
  - Will change so it’s loading icon when there’s no image
  - Currently, we update every 50 steps 
  - Change sample array down to 128 
    - Now it takes 4 minutes
  - Had to lower a lot of the settings so we don’t run into OOM errors
  - Gallery will persist, it’s fully linked with the backend
 
Questions
- Are there others using our gpu?
  - `ps aux | grep pid`
- To see the user running it
- Just a workstation, not a server

         
## Summary
Actions Items:
- \[Jasper] Send hand-off email
- \[Steven] Update credential hand-off explanation in the README?

Meeting Summary
- Since we bought the domain, it can be refunded by Igor
  - Domain transfer may take time

What Went Well
- Partner is happy with our final product.
