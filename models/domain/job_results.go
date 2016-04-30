package domain

type JobResults []*JobResult

func (slice JobResults) Len() int {
	return len(slice)
}

func (slice JobResults) Less(i, j int) bool {
	return slice[i].CreatedAt < slice[j].CreatedAt;
}

func (slice JobResults) Swap(i, j int) {
	slice[i], slice[j] = slice[j], slice[i]
}