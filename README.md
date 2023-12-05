# articulat3 - team 44
​
<p align="center">
<a href="https://www.159.203.51.70.sslip.io" target="_blank">
    <p align="center">
        <img src="deliverables/D1/assets/articulat3-logo.png" width="50%" />
    </p>
</a>
</p>
<p align="center">
    <a href="https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/blob/main/deliverables/D1/planning.md">Planning</a> •
    <a href="https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/blob/main/.github/CONTRIBUTING.md">Contributing</a> •
    <a href="https://www.159.203.51.70.sslip.io">Deployment</a> •
    <a href="https://drive.google.com/file/d/1mTnIVwE3vDY4EDY3yWKPebrQcNy2nvbl/view?usp=sharing">Video Presentation</a> •
    <a href="https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/files/13551103/D4.Presentation.Slides.pdf">Presentation Slides</a>
</p>
<br />

> [!NOTE]
> The deployment site's certificate is invalid, so you must click to the Advanced section and proceed to enter articulat3. We reached our limit of 5 LetsEncrypt certificate requests per week while testing.

## What is articulat3?

[articulate](https://www.159.203.51.70.sslip.io">articulat3) is an easy-to-use web application for 3D content creation based on a user-given text prompt. It features a "Gallery" page of existing 3D creations that can be browsed for inspiration and a "Create" page to easily generate a 3D graphic from text input. The product is a convenient, open-source solution for content creators, video game developers, and designers to quickly grab customized 3D graphics for their products.

## Partner Intro

### Primary Contact

> Ashkan Mirzaei (ashkan@cs.toronto.edu), PhD student

### Partner Organization

[Toronto Intelligent Systems Lab](https://tisl.cs.toronto.edu/) is a collaborative space for computer scientists and creative thinkers to envision the future of algorithms for robotic intelligence. The lab is located at the University of Toronto, where teams work on broad applications related to intelligent systems, led by Igor Gilitschenski. Ashkan Mirzaei is specifically interested in content creation with 3D objects. In collaboration with Toronto Intelligent Systems Lab and Ashkan, articulat3 contributes to the shared goal of making 3D object generation as accessible as possible to the general public.

## Key Features and Use Cases

### 📢 _An input bar to enter a prompt and generate new 3D content_

  Users can type a prompt that describes the 3D graphic they desire. Entering the prompt immediately starts the generation process and presents the user with the finalized 3D graphic once the process is complete. 
  
  Generating 3D objects is perfect for content creators who want to save time, as opposed to the alternative of having to learn complex 3D programs. [See User Story #1](./deliverables/D1/planning.md/#story-1)
  
  In the future, a suggested extension is to show the object generation progress by displaying a continuously updating thumbnail and/or a progress bar. For now, the user is notified that the object is being generated with a loading animation, followed by a toast upon completion. [See User Story #2](./deliverables/D1/planning.md/#story-2).

### 🖼️ _A searchable gallery featuring previously generated objects_

  Users can browse through all previously generated 3D objects by any user on articulat3. This gallery is also searchable, allowing users to filter their browsing to their immediate needs and only display items similar to their search query.

  Content creators can benefit from other users' creations for inspiration when making their own content. [See User Story #3](./deliverables/D1/planning.md/#story-3)

### 📁 _An interactable panel of 3D objects and an option to export the image and object​ files_

  Users can click on 3D objects (their own, or other users' objects) and engage with them in an interactive panel. They can export the object's thumbnail image (.png), model file (.obj), material file (.mtl), and texture file (.jpg) depending on their needs.

  Video game designers will benefit from the interactive object canvas, allowing them to effortlessly inspect an asset from various angles and zoom levels. [See User Story #4](./deliverables/D1/planning.md/#story-4)

  Hardware creators can also use their 3D object immediately with the ability to quickly export the object as various file types. [See User Story #5](./deliverables/D1/planning.md/#story-5)

## How to Use articulat3

### Creating a New 3D Graphic

If you are looking to create a new 3D object, follow these steps:
1. Go to [articulat3](https://www.159.203.51.70.sslip.io). Please note that the certificate is invalid so you must click to the Advanced section and proceed, to enter the web app.
2. You’ll be welcomed to the Create page. Here, enter a description of the 3D graphic you desire in the input bar. For example, if you need a 3D graphic of a hamburger, type “A juicy hamburger”. Be as descriptive as you'd like.

<img width="1436" alt="Screenshot 2023-11-19 at 5 41 34 PM" src="https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/assets/60327675/033841a5-1385-4fff-a65d-cde683a0c8bd">

3. Once you’re ready, press `Enter` or click the Create button.

<img width="1436" alt="Screenshot 2023-11-19 at 5 41 59 PM" src="https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/assets/60327675/1380daf4-c15a-440c-89f9-85b8bd157c71">

4. You’ll need to wait a couple of minutes (~12 minutes for our current model) to completely generate your 3D graphic. While we're hard at work, you’ll see a loading animation.

<img width="1436" alt="Screenshot 2023-11-19 at 5 44 02 PM" src="https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/assets/60327675/e4065782-e928-4bcf-8629-e003ed13d633">

5. Once the object is finished generating, your custom 3D object will appear in the interactive panel. Now you have your 3D object!

<img width="1436" alt="Screenshot 2023-11-19 at 5 46 16 PM" src="https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/assets/60327675/a2dde9f0-b01a-491e-a237-3301c71f3991">


### Searching for 3D Inspiration

If you are looking to gather inspiration or search for existing 3D graphics, follow these steps:
1. Go to [articulat3](https://www.159.203.51.70.sslip.io/gallery) if you haven’t already.
2. Click on the Gallery tab in the top navigation bar. This will take you to the Gallery page.

<img width="1436" alt="Screenshot 2023-11-19 at 5 41 34 PM copy" src="https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/assets/60327675/d1cd655e-1004-4ba7-a4f7-25331abe49ad">

3. Looking for something specific? Use the Search bar to narrow down the objects. Or just scroll through Gallery page for any kind of inspiration, by browsing all the previously generated 3D objects imagined by other users.

<img width="1436" alt="Screenshot 2023-11-19 at 6 08 51 PM" src="https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/assets/60327675/f75b7d24-bbb1-433d-b8bf-123815797a72">
<img width="1436" alt="Screenshot 2023-11-19 at 6 08 57 PM" src="https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/assets/60327675/9e1b980c-6ec6-40e8-9bfb-1a2dc24ed0de">

### Interacting with a 3D Object and Exporting

After generating a 3D object, if you are looking to interact with the object or export the object files, follow these steps:
1. Continuing from Step 4 in [Creating a New 3D Graphic](#creating-a-new-3d-graphic), click the download icon on the top right of the object card.

<img width="1436" alt="Screenshot 2023-11-19 at 5 46 51 PM" src="https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/assets/60327675/a4601759-267d-48e9-b6fe-480c8bf73d06">

2. This opens a dropdown menu revealing options to export the 3D object's files.

<img width="1436" alt="Screenshot 2023-11-19 at 6 02 47 PM" src="https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/assets/60327675/7b421fd9-5e02-4b66-b76d-28fa87cc81fe">

3. You can rotate or zoom in/out of your generated object inside the object card.

<img width="1436" alt="Screenshot 2023-11-19 at 6 03 56 PM" src="https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/assets/60327675/86c5fa2b-6b18-4555-94d8-36ec84e12ede">
</p>

<br />

## Development Requirements
<!-- >* What are the technical requirements for a developer to set up on their machine or server (e.g. OS, libraries, etc.)?
 >* Briefly describe instructions for setting up and running the application. You should address this part like how one would expect a README doc of real-world deployed application would be.
 >* You can see this [example](https://github.com/alichtman/shallow-backup#readme) to get started. -->

### Installation

In order to set up your local environment, follow these steps:
1. Clone the repo

```bash
git clone git@github.com:csc301-2023-fall/project-44-toronto-intelligence-m.git
```

2. Install [Nix](https://nixos.org/download)

```bash
sh <(curl -L https://nixos.org/nix/install) --daemon
mkdir -p ~/.config/nix && echo "experimental-features = nix-command flakes" >> ~/.config/nix/nix.conf
```

3. Run Nix

```bash
nix develop
```

### Usage

For the following commands, ensure you are running Nix, as shown [above](#installation). Also, ensure the following commands are running in separate terminals.

Starting the client:
```bash
cd client
pnpm install
pnpm run dev
```

The following environment variables need to be exported.
```bash
export TEMPORAL_SERVER_HOST_PORT=
export GOOGLE_APPLICATION_CREDENTIALS=
export GCS_BUCKET_NAME=
```

Starting the server:
```bash
PORT=8080 go run cmd/main.go
```

### Testing

When running tests, ensure you are running Nix (as shown [above](#installation)).

Frontend testing:
```bash
# pnpm run test will ask you to install jsdom. Install and re-run the tests
pnpm run test
```

Backend testing:
```bash
go test ./...
```

## Deployment and Github Workflow
<!-- >* Describe your Git/GitHub workflow. Essentially, we want to understand how your team members share codebase, avoid conflicts and deploys the application.​
>* Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
>* If applicable, specify any naming conventions or standards you decide to adopt.
>* Describe your overall deployment process from writing code to viewing a live application
>* What deployment tool(s) are you using? And how?
>* Don't forget to briefly justify why you chose this workflow or particular aspects of it!
-->

#### Pull Requests
We tracked our progress on issues and feature stories on [Github Projects](https://github.com/orgs/csc301-2023-fall/projects/3). Please make sure to read the [Contributing Guide](https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/blob/main/.github/CONTRIBUTING.md) before making a pull request!

#### Deployment Tools

> [!WARNING]
> These instructions will be updated in D5. In our video presentation, we showed a demo of DigitalOcean deployment. The steps will be similar and fully automated. We will also automate the process of starting workers further through Terraform as well and include CD. 

This application is composed of a frontend, backend, and task cluster. Both the frontend and backend are hosted on DigitalOcean while the task workers are hosted on UofT GPU nodes.

We use terraform to provision the resources we need on Google Cloud. 

We will also be using Hashicorp Vault as an extension to seal our secrets.

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

> [!NOTE]
> To proceed with the following steps, you will need a server with access to an NVIDIA GPU. Please install the necessary NVIDIA and CUDA drivers required by [MVDream-threestudio](https://github.com/bytedance/MVDream-threestudio).

Now, `ssh` into the GPU server and clone both this repo and [MVDream-threestudio](https://github.com/bytedance/MVDream-threestudio):

```bash
git clone git@github.com:csc301-2023-fall/project-44-toronto-intelligence-m.git
git clone git@github.com:bytedance/MVDream-threestudio.git
```

We use [Singularity](https://docs.sylabs.io/) to install all the necessary dependencies on your machine. [Singularity](https://docs.sylabs.io/) is an alternative to docker that is rootless and usually installed on HPC clusters.

```bash
cd project-44-toronto-intelligence-m/temporal
singularity shell --writable --nv out
singularity shell --fakeroot --writable --nv --network "host" out
```

You can run the temporal server and the workers. Using tmux or another preferred method, start the following two processes:

```bash
~/.temporalio/bin/temporal server start-dev
```

and

```bash
cd project-44-toronto-intelligence-m
~/.local/go/bin/go run temporal/worker/main.go
```

#### Our Github Workflow

## Coding Standards and Guidelines

For our Typescript code, we used [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) rules similar to those of [Shopify](https://github.com/Shopify/web-configs/tree/main)’s.

For our Go code, we followed the standards from [Mattermost](https://developers.mattermost.com/contribute/more-info/server/style-guide/). The rust code is checked by [Clippy](https://github.com/rust-lang/rust-clippy).

A pre-commit hook lints all parts of the project. We also use CI to build and test.

## Licenses
​Licensed under MIT license ([LICENSE-MIT](LICENSE) or http://opensource.org/licenses/MIT) because it is permissive and allows anyone to distribute and use the code for any purpose. Our TISL partner’s future plans for this product are to be determined, making the MIT license the most suitable license to use as of now.

<!-- Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, shall be licensed as in the README, without any additional terms or conditions. -->
