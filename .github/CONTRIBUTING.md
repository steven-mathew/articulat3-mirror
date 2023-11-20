# Contributing Guide

## GitHub Workflow

We will be aiming to maintain a linear commit history. It’s much easier to follow and track bugs (using [git bisect](http://git-scm.com/docs/git-bisect)).
- Do not push directly to main as you shouldn’t be making any changes directly in there. This could break builds by introducing potentially untested and unreviewed code!
- Keep your `main` up to date by doing the following:

```console
git fetch origin
git rebase origin/main
```

- Checkout a topic branch from a base branch (e.g. `main`) and merge back against `main`.
- When adding a new feature:
  - Add tests
- When fixing a bug:
  - If the fix is for a issue, add the issue number(s) (e.g. `fix #123` or `fix #123, #124`) to the PR title
  - e.g. `Hovering with mouse expands image (fix #123)`
- Use the PR template that best matches your needs.
- One person is required to review the PR. Either the reviewer or requester can merge the PR once approved.
- Pushing your feature branch:

```console
git checkout -b branch main
git fetch origin
git rebase origin/main
git push origin branch
```
- A branch should be named as follows: `username/description-of-branch-123` (`username` is your Github username and 123 is the corresponding issue number if the branch is related to it). Use `username/description-of-branch-123-124` for multiple issues, but ideally a branch should be targeting one issue.
- Then you should open a PR that rebases into main. Each PR should have one commit that squashes all the changes (unless you’ve created a series of commits that is logical and each has been tested independently). This can make it easier to track down changes and bugs that arose from a PR.
Note that you can use multiple commits as you work on your PR as GitHub can squash them before merging.
- Commit messages must follow the [commit message convention](https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/blob/main/.github/commit-convention.md) so that commit messages can be understood at a glance
- If you messed up, look into [dangitgit](https://dangitgit.com/en).
