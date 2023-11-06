# Sub-Team 1: Frontend

View the D2 Sub-Team 1 Report [here](https://github.com/csc301-2023-fall/deliverable-2-44-1-chungh42-fabiann1-maijaspe/blob/main/deliverables/D2/deliverable-2-sub-team-1.md).

## Instructions

Click [here](https://deliverable-2-44-1-chungh42-fabiann1-maijaspe-2pvj7o1hy.vercel.app/) to see our static website live.

You’ll be immediately welcomed to the “Create” page that we have designed. On this page, you may do the following:

- Enter a prompt in the input bar and click the “Create” button to generate a 3D object reflecting your prompt. As explained in the sections above, the web application created by this sub-team for D2 is the UI with a “fake” backend; for now, you will be seeing the same GIF of a 3D graphic of a dog and a boy upon generation, regardless of your entered prompt.
- Click on the “Gallery” link in the header to go to our "Gallery" page. For now, this will lead you to an empty page which will be completed in future deliverables.
- Click on the logo in the header which to lead you to this github repo. This behaviour will be updated in future deliverables if we are working on other repositories.
- Click the toggle button in the header to toggle the theme of the site.

### Unit Testing

We have basic unit tests for most of the composite components we have created for the "Create" page. The tests check for components existing, correct labeling of variables, and strings matching the expected constants. In future deliverables, we will be expanding on these unit tests and adding integration tests to test for more complex behaviours.

Here are the steps for running the unit tests:

1. Clone this repo

   ```
   git clone https://github.com/csc301-2023-fall/deliverable-2-44-1-chungh42-fabiann1-maijaspe.git
   ```

1. Install Nix

   ```
   sh <(curl -L https://nixos.org/nix/install) --daemon

   # You may need to add the following line in a nix.conf file
   mkdir -p ~/.config/nix/ && echo “experimental-features = nix-command flakes” >> ~/.config/nix/nix.conf
   ```

1. Run Nix
   ```
   nix develop
   ```
1. Run tests

   ```
   cd client

   # Running pnpm run test will ask you to install jsdom. Install and re-run the tests
   pnpm run test
   ```

Here is a video showing how these tests work:

## Our Application

Click [here](https://deliverable-2-44-1-chungh42-fabiann1-maijaspe-2pvj7o1hy.vercel.app/) to see our website.
