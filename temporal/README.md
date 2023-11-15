The workflow first creates a session then starts a short activity for preparing the session. At the moment, it doesn't do anything but can be used in future to prepare some variables. It will then run the activity for generating the 3D object with some hard-coded values. This is subject to change.

### Steps to run:

1) Run the following command multiple times on different console window. This is to simulate running workers on multiple different machines.

```
go run worker/main.go
```
2) Run the following command to submit a start request for this workflow.
```
go run starter/main.go
```
3) If you want to observe the workflow recover from a failed session you can restart
the worker you launched in step 1).

You should see that all activities for one particular workflow execution are scheduled to run on the worker's logs.
