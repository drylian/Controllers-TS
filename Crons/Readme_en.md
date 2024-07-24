# Crons - Cron Job Manager

## Overview

The `Crons` class is a library for managing cron jobs in a Node.js application. It allows you to configure recurring cron jobs, unique cron jobs, and manage their execution schedules.

## Features

- **Recurring Cron Job Configuration:** Define and schedule cron jobs that run at regular intervals.
- **Unique Cron Jobs:** Configure cron jobs that should run only once.
- **Cron Job Management:** Start, remove, and update cron jobs as needed.
- **Event Management:** Use `EventEmitter` to manage cron job events.

## Usage

Import and use the `Crons` class to manage your cron jobs.

```typescript
import { Crons } from './Crons';

// Define a recurring cron job
const cronConfig = {
    name: 'ExampleCron',
    cron: '* * * * *', // Executes every minute
    exec: (cron, interval) => {
        console.log(`Cron Job "${cron.name}" executed.`);
    }
};

// Add a new cron job
const cronInstance = new Crons(cronConfig);

// Start the cron job
Crons.start(cronConfig);

// Update or add a cron job
Crons.post(cronConfig);

// Remove a cron job
Crons.remove('ExampleCron');

// Configure a unique cron job
Crons.once({
    name: 'UniqueCron',
    cron: '*/5 * * * *', // Executes every 5 minutes
    exec: (cron) => {
        console.log(`Unique Job "${cron.name}" executed.`);
    },
    metadata: {}
});
```

## Methods

### `constructor(data: CronsConfigurations<Metadata>)`

- **Description:** Constructs a new `Crons` instance with the provided configuration.
- **Parameters:**
  - `data`: Configuration for the cron job.

### `static start(cron: CronsConfigurationsSystem<Metadata>)`

- **Description:** Starts the configured cron job and schedules its next execution.
- **Parameters:**
  - `cron`: Configuration for the cron job.

### `static remove(name: string)`

- **Description:** Removes an existing cron job and cancels its interval.
- **Parameters:**
  - `name`: Name of the cron job to be removed.
- **Returns:** `true` if the cron job was successfully removed, `false` otherwise.

### `static once<MetaArgs>(cron: UniqueCron<MetaArgs>)`

- **Description:** Configures a unique cron job that will run only once.
- **Parameters:**
  - `cron`: Configuration for the unique cron job.
- **Returns:** `setTimeout` ID, which can be used for cancellation.

### `static post(cron: CronsConfigurationsSystem<Metadata>)`

- **Description:** Updates or adds a cron job.
- **Parameters:**
  - `cron`: Configuration for the cron job.

### `static date(date: Date)`

- **Description:** Generates a cron expression for a specific date.
- **Parameters:**
  - `date`: Date for which to generate the cron expression.
- **Returns:** Generated cron expression.

## Types

### `CronsConfigurations<Metadata>`

- **Description:** Configuration for recurring cron jobs.
- **Properties:**
  - `name`: Identifier for the cron job.
  - `cron`: Cron argument, e.g., "* * * * * *" for every second.
  - `exec`: Function to be executed when the cron job is triggered.
  - `metadata` (optional): Metadata for the cron job.
  - `once` (optional): Indicates if the cron job should run only once.

### `UniqueCron<MetaArgs>`

- **Description:** Configuration for unique cron jobs.
- **Properties:**
  - `name`: Identifier for the cron job.
  - `cron`: Cron argument, e.g., "* * * * * *" for every second.
  - `exec`: Function to be executed when the unique cron job is triggered.
  - `metadata`: Metadata for the cron job.

### `CronsConfigurationsSystem<Metadata>`

- **Description:** Extended configuration for cron jobs, including a UUID.
- **Properties:**
  - `uuid`: Unique identifier for the cron job.
  - `started`: Indicates if the cron job has started.
  - `next_exec`: Time until the next execution.