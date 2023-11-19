
# 44 Corndogs

- [Q1. What worked well](#q1-what-worked-well)
- [Q2. What did not work well](#q2-what-did-not-work-well)
- [Q3(a). Planned changes](#q3a-planned-changes)
- [Q3(b). Integration & Next steps](#q3b-integration--next-steps)
- [Q4. How was your product demo?](#q4-how-was-your-product-demo)

## Iteration 1 - Review & Retrospect

 * When: 11-09-2023
 * Where: Online (Google Meets)

## Process - Reflection


#### Q1. What worked well

1. The Kanban Framework

   **Supporting Argument**: Choosing to work with Kanban as opposed to Agile or Scrum was fitting for our team for several reasons. Kanban made it easy to know what everyone was working on at any time, clear what had highest priority to be picked up next, and less restricting (due to the lack of 2-week sprints) for our differing schedules.

   **Process Artifact**: [This board](https://github.com/orgs/csc301-2023-fall/projects/3/views/1) shows how our tickets were organized in Kanban style. We had a “Todo” column that contained a bank of tickets in order from highest to lowest priority. We would also assign the top few tickets to specific people. Otherwise, anyone who finished their current ticket knew to pick up the next assignee-free ticket in that column.

1. Having at least 1 approval for every PR

   **Supporting Argument**: We required that we would always have at least 1 approval from someone else on the team for every PR. This was a very helpful process we followed because people could gain insight on most of the work being pushed and ensure that we were always pushing high-quality code. Additionally, everyone gained experience with reviewing code and learning good coding practices from each other.

   **Process Artifact**: For example, [this PR](https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/pull/35) shows how having at least one reviewer allowed us to catch mistakes and make sure the UI was high-quality. 

1. Frequent frontend/backend sync ups

   **Supporting Argument**: We had short meetings between at least 1 member of each sub-team, occurring every 2-3 days to update the other sub-team on progress, next steps, and issues. These were similar to “standup” meetings but more casual and ad-hoc. These were very helpful for highlighting major issues early – such as the additional backend work due to unexpected self-deployment, which resulted in delays. In this case, both sub-teams agreed that we needed an extension and were able to notify the CSC301 TA early on. 


#### Q2. What did not work well

1. Github Board 

   **Supporting Argument**: The Github Board was surprisingly more restricting or convoluted in its usage. For example, we could assign only one person per ticket given our Github permissions and we had to add a new column and name it “Epics” ourselves to group issues into epics.

   **Process Artifact**: Because we were already heavily using Github for our project, we set up [our board](https://github.com/orgs/csc301-2023-fall/projects/3/views/1) to use to the best of our abilities. 

1. Pair Programming

   **Supporting Argument**: Initially, when we were grappling with unfamiliar technologies, pair programming served as an effective means of knowledge transfer and skill development. However, as we became more adept in those technologies, it started to impede our progress as team members found it challenging to work at their individual paces. Some tasks required more focus and uninterrupted concentration, and the constant collaboration hindered the productivity of team members in such scenarios. This issue became apparent through the team's decreased velocity and individual team members’ expressed frustration with the inefficiency and ineffectiveness of pair programming. This observation is supported by our retrospective notes and team discussions, highlighting the consensus that the initial benefits of pair programming did not scale well as our team's expertise grew. For example, pair programming initially worked well while we were learning the basics for Temporal  workflows/activities and planning and setting up our Temporal server. But as we gained a basic understanding, it became inefficient to collaborate on integrating more specific functionalities, like sending the generated files through heartbeats or bug fixes for sending multiple jobs through workers.



#### Q3(a). Planned changes

1. Shifting from Pair Programming to Solo Coding + Peer Reviews

   **Supporting Argument**: To address the inefficiencies stemming from prolonged pair programming, we are planning to shift towards a more individualized task assignment approach. This change is driven by the need for increased flexibility in our workflow and the lack of need for heavy knowledge transfers. By assigning more individual tasks for independent work and simply completing peer reviews after completion, we believe we can better cater to the diverse work preferences and strengths of our team. This approach will also enable us to streamline our workflow and increase overall productivity and efficiency. Our decision is supported by insights from team retrospectives and feedback sessions, where team members expressed a desire for a more flexible working structure that accommodates both collaborative and individual work. Additionally, we anticipate that this change will allow us to leverage the specialized skills of each team member more effectively, contributing to a more efficient and adaptable team dynamic.

_Note about the Github Board_: Since the majority of tickets are complete, it is unfeasible to migrate the tickets to another project management system like Trello or JIRA. For D4 and D5, we will continue to use Github Projects.


#### Q3(b). Integration & Next steps
Briefly explain how you integrated the previously developed individuals components as one product (i.e. How did you be combine the code from 3 sub-repos previously created) and if/how the assignment was helpful or not helpful.

 * Keep this very short (1-3 lines).


## Product - Review

#### Q4. How was your product demo?

**Preparation**: Referring to our list of tickets and recent commits, we compiled a list of features to demo. Then we arranged the features to have a smooth flow of steps that highlight our implemented features.

**Demo Features**: We were able to demo the following features to our partner.
- Functionality in the Create page using mock data
   - ObjectCard component
   - Toast component (which currently only functions on a timer)
   - Download DropdownMenu component
   - AlertDialog component
   - Design tweaks
       - Removed the subtitle
       - Addressed the placeholder text contrast issue mentioned in a previous meeting
       - Preventing users to enter an empty string prompt
- Functionality in the Gallery page using mock data
   - ObjectWaterfall grid view
   - Opening an ObjectCard component (reused from Create page) from GalleryCard
   - SearchBar component
   - CTAButton component
- Dark mode

**Partner Feedback**: Our partner accepted most features and gave some feedback and ideas for new or updated features.
- Allow users to view the last 2 previously created 3D objects
- Persist the Create page
- Enlarge and show the prompt of a GalleryCard when hovering
- Implement similarity search in our Gallery page

**Lessons**: We were able to figure out a good list of next steps and lessons learned from this demo.
- From the product perspective:
   - We are ready to integrate with the backend to replace the use of mock data
   - We must implement the partner’s feedback features in our next iteration
- From the process perspective:
   - We shouldn’t just list features, but assemble them in a typical user flow so the audience understands when they’ll be used
   - When planning to type something long as part of the demo (like in a text input), copy the text ahead of time to the clipboard to quickly paste during the demo

