export enum STATUS {
    'timeout' = -2,
    'miningFailed' = -1,
    'unknown' = 0,
    'paid' = 1,
    'mined' = 2,
    'assigned' = 3,
    'start' = 4,
    'completed' = 5,
    'error' = 6,
    'cancelled' = 7
};

export enum STEP {
    'configuration' = 1,
    'payed' = 2,
    'submitted' = 3,
    'completed' = 4
}