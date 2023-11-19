package temporal

import (
	"testing"

	// "github.com/stretchr/testify/mock"
	"go.temporal.io/sdk/worker"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
	"go.temporal.io/sdk/testsuite"
)

type UnitTestSuite struct {
	suite.Suite
	testsuite.WorkflowTestSuite
}

func TestUnitTestSuite(t *testing.T) {
	suite.Run(t, new(UnitTestSuite))
}

func (s *UnitTestSuite) Test_Workflow() {
	env := s.NewTestWorkflowEnvironment()
	env.SetWorkerOptions(worker.Options{
		EnableSessionWorker: true,
	})
	var a *Activities
	env.OnActivity(a.TrainPrompt, mock.Anything, mock.Anything).Return(nil)
	env.RegisterActivity(a)
	env.OnActivity(a.ExportModel, mock.Anything, mock.Anything).Return(nil)
	env.RegisterActivity(a)
	env.OnActivity(a.SaveObject, mock.Anything, mock.Anything).Return(nil)
	env.RegisterActivity(a)

	env.ExecuteWorkflow(SessionFailureRecoveryWorkflow, WorkflowInput{})

	s.True(env.IsWorkflowCompleted())
	s.NoError(env.GetWorkflowError())

	env.AssertExpectations(s.T())
}
