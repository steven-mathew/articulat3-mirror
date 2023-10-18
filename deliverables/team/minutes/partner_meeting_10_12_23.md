# Meeting Minutes | Oct 12, 2023

>_**Note-taker:**_ Neeco
>
>_**Attendees:**_ Neeco, Sarah, Steven; Ashkan

## Meeting Agenda
- Updates from Frontend team. 
  - Presented the high-fidelity prototype for Deliverable 2 features
  - Ashkan’s feedback:
    - Change the colour of input bar text (colour may blend with the right side of the gradient on smaller screens)
    - Right side of the logo fades into the background in light mode, more is contrast needed
- Updates from Backend team. 
  - Questions related to three-studio taking too long (20 mins to generate). Model trains on the prompt. We can’t use pretrained models because that model is only good at generating on the given prompt. Unsure about deployment.
  - Ashkan’s feedback:
    - Pretrained models don’t make sense in our case.
    - So we train at inference time using a faster model from threestudio (with less training steps).
    - Faster models exist and are being implemented by threestudio, will be added in coming months. 
    - Try reducing iterations to 1/10 of current value
    - Can be changed later

## Summary
Actions Items:
- \[Ashkan] written approval for 2 groups of 3
- \[Frontend] tweak gradient colours to add more contrast


Meeting Summary
- Received verbal approval from partner that he supports working in 2 groups of 3 (frontend, backend)

What Went Well
- Meeting time at 10 mins after the hour worked better.

What Didn't Go Well
- N/A for this week

