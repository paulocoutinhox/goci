package domain

type Jobs []*Job

func (slice Jobs) Len() int {
	return len(slice)
}

func (slice Jobs) Less(i, j int) bool {
	return slice[i].CreatedAt < slice[j].CreatedAt
}

func (slice Jobs) Swap(i, j int) {
	slice[i], slice[j] = slice[j], slice[i]
}
