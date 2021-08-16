import {TestResolver} from './test-resolver';

// This is where we add all our resolvers
// Sort of like registering them I guess
export const resolvers = [
    TestResolver,
] as const;