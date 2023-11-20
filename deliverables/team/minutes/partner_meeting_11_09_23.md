# Meeting Minutes | Nov 9, 2023

>_**Note-taker:**_ Steven Mathew, Neeco Fabian
>
> _**Attendees:**_ Steven Mathew, Neeco Fabian

## Meeting Agenda
### Demo and Updates
#### Frontend progress from localhost
- Create page
  - Design tweaks - addressed the placeholder text contrast issue
  - ObjectCard with Download dropdown
  - Toast
  - Modal
- Gallery page
  - Waterfall
  - Search
  - GalleryCard to ObjectCard (reused)
- Next steps
  - Connecting to backend - using mock data currently

#### Backend progress
- Together we spent more than a week to figure out how we can deploy threestudio on UofT’s HPC cluster. We followed the instructions on threestudio and encountered several issues. In particular, the PyTorch version does not match with the CUDA toolkit installed on the system (and NVIDIA driver issues). We faced several issues, where one package was conflicting with another. After we resolved one dependency issue, another would pop up. We were stuck on this for days and all of us made efforts to make this work. Further, as non-root users, we had to install or build packages locally. Spack helped with this. Further, at one point, we had to build gcc from scratch (takes 3 hours normally but we parallelized the install and it took 30 minutes).
- Following days of effort, we found Singularity is installed on these machines. Singularity is a container platform designed for HPC environments that doesn’t require root privileges, unlike Docker, which is not present on these machines. I created a def file which defines all the dependencies that are needed to run threestudio. After several builds and iterations of the singularity file (each taking up to 30 minutes since the pip dependencies could not be cached properly), we were finally in a sandboxed environment where we could run threestudio. We ran threestudio. We got an error. What was it this time? CUDA was not available. So most likely, the sandbox didn’t have access to the GPU. After some searching and rebuilding again and again, we found the “—nv” flag for starting up the sandbox. Then after another run, we encountered permission issues on file writing. This was easy to fix, we just had to add a “—writable” flag and finally, we got threestudio running in a reproducible sandboxed build environment. Now, we had to export the object but ran into a dependency issue related to CUDA which required changing the version of xformers to 0.0.20 and finally everything was running.
- We all learned that dependency management in inconsistent environments is a huge pain and we quickly realized how valuable using Nix was in our project as we couldn’t use Nix on TISL machines.
- We have our cluster running on Digital Ocean and our Temporal.io (task queue) server runs there. Our ingress is publicly available and was serving the task queue (without TLS) to the broader internet. We got our task queue working where a client could send a task and the worker on UofT’s HPC cluster could happily run it. Then all of a sudden, UofT couldn’t reach the task queue. This was strange so we all tried sending requests to the server from our own machines in different networks and had workers running locally. They could all connect to the queue. This resulted in 2 more days of effort so we decided on an alternative solution: we could run everything on UofT servers and reverse proxy (via ngrok) the HTTP server to the public internet. Ashkan agreed with this solution as it’s free and gives him more flexibility later on to decide on different deployment solutions since it’s an MVP.
- We also setup the jobs for our orchestration solution called Nomad which is similar to Kubernetes but much easier. It’s an excellent solution for smaller companies who want to scale without all the complications that come with Kubernetes so we decided to jump start that for Ashkan.
Mention extension request due to the self-deployment tasks taking more time than expected


         
## Summary
Actions Items:
- Frontend - implement suggestions where feasible
- Backend - contact [REDACTED] if facing issues

Meeting Summary
- Frontend Suggestions from Ashkan:
  - In Create page, retain a maximum of 3 generated objects for the current user (nice-to-have)
    - Display them side by side
    - ​​Retain previous generations in a row of 3, discard as new objects are generated
    - When you hover over an item, it enlargens slightly
  - In Gallery page,
    - On GalleryCard hover: enlarge the card
    - Implement similarity search for gallery objects
- Backend
  - Steven: TISL workstation connection worked a few days ago, having issues now
  - Ashkan: Could be version issue with something installed?
  - S: Firewall is working as intended and everything running on same configuration. May be due to an automatic process on UofT end that blocks us
  - A: Many people use these for high-volume tasks. Contact [redacted], an IT staffer at UTM [redacted email] if needed.
  - S: Might be possible to deploy everything on UofT machines, frontend can use reverse proxy
  - A: Agreed, as it’s free and gives flexibility later when choosing deployment solutions
  - S: We're using Temporal logic - heartbeats send updates of the workers. Will make it easy to use our service in the future
  - Ashkan: Keep generations < 1000 if needed, 500 generation to keep gen time minimal


What Went Well
- Ashkan appreciates the site’s simple design and extensible work from backend
