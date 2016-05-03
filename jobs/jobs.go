package jobs

import (
	"errors"
	"github.com/prsolucoes/goci/models/domain"
	"log"
	"time"
)

var (
	JobList            []*domain.Job
	CanRunJobs         bool
	JobProcessorTicker *time.Ticker
)

func StartJobProcessor() {
	JobProcessorTicker = time.NewTicker(time.Second * 2)

	go func() {
		for range JobProcessorTicker.C {
			if CanRunJobs {
				job, err := JobGetFirstOnQueue()

				if err == nil {
					go func() {
						job.Run()

						for i := 0; i < len(JobList); i++ {
							if JobList[i].ID == job.ID {
								JobList = append(JobList[:i], JobList[i+1:]...)
								break
							}
						}
					}()
				}
			}
		}
	}()

	log.Printf("Job processor stated : OK")
}

func JobGetFirstOnQueue() (*domain.Job, error) {
	if JobList == nil {
		return nil, errors.New("No jobs found")
	}

	if len(JobList) == 0 {
		return nil, errors.New("No jobs found")
	}

	for _, job := range JobList {
		if job.Status == domain.JOB_STATUS_ON_QUEUE {
			return job, nil
		}
	}

	return nil, errors.New("Job was not found")
}

func JobGetFirstByProjectIdAndTaskId(projectId string, taskId string) (*domain.Job, error) {
	if JobList == nil {
		return nil, errors.New("No jobs found")
	}

	if len(JobList) == 0 {
		return nil, errors.New("No jobs found")
	}

	for _, job := range JobList {
		if job.ProjectID == projectId && job.TaskID == taskId {
			return job, nil
		}
	}

	return nil, errors.New("Job was not found")
}
