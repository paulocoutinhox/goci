package domain

type JobsByCreatedAtDesc []*Job

func (slice JobsByCreatedAtDesc) Len() int {
	return len(slice)
}

func (slice JobsByCreatedAtDesc) Less(i, j int) bool {
	return slice[i].CreatedAt < slice[j].CreatedAt
}

func (slice JobsByCreatedAtDesc) Swap(i, j int) {
	slice[i], slice[j] = slice[j], slice[i]
}
