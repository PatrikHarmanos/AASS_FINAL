<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Camunda REST API URL
    |--------------------------------------------------------------------------
    |
    | The URL where your Camunda REST API is located.
    |
    */
    'base_uri' => env('CAMUNDA_BASE_URI', 'http://localhost:8080/engine-rest'),

    /*
    |--------------------------------------------------------------------------
    | Default credentials for Camunda REST API
    |--------------------------------------------------------------------------
    |
    | The credentials that will be used to authenticate with Camunda REST API.
    |
    */
    'credentials' => [
        'username' => env('CAMUNDA_USERNAME', 'demo'),
        'password' => env('CAMUNDA_PASSWORD', 'demo'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Default options for Guzzle HTTP client
    |--------------------------------------------------------------------------
    |
    | The options that will be passed to Guzzle HTTP client.
    |
    */
    'guzzle_options' => [
        'verify' => false, // Set to true to enable SSL certificate verification
        'timeout' => 10, // Timeout in seconds for each request
    ],

    /*
    |--------------------------------------------------------------------------
    | External Task Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration related to Camunda external task workers.
    |
    */
    'external_task' => [
        /*
        |--------------------------------------------------------------------------
        | Default topic name for external tasks
        |--------------------------------------------------------------------------
        |
        | The topic name that the external task worker should subscribe to by default.
        |
        */
        'default_topic' => env('CAMUNDA_EXTERNAL_TASK_DEFAULT_TOPIC', 'charge-card'),

        /*
        |--------------------------------------------------------------------------
        | Default lock duration for external tasks
        |--------------------------------------------------------------------------
        |
        | The lock duration (in milliseconds) for the external task worker to lock and process an external task.
        |
        */
        'default_lock_duration' => env('CAMUNDA_EXTERNAL_TASK_DEFAULT_LOCK_DURATION', 300000),

        /*
        |--------------------------------------------------------------------------
        | Default number of tasks to fetch at once
        |--------------------------------------------------------------------------
        |
        | The number of external tasks that the external task worker should fetch at once.
        |
        */
        'default_max_tasks' => env('CAMUNDA_EXTERNAL_TASK_DEFAULT_MAX_TASKS', 10),

        /*
        |--------------------------------------------------------------------------
        | Default error message for external task failures
        |--------------------------------------------------------------------------
        |
        | The error message that will be set in the external task when the worker fails to process the task.
        |
        */
        'default_error_message' => env('CAMUNDA_EXTERNAL_TASK_DEFAULT_ERROR_MESSAGE', 'External task processing failed.'),
    ],
];
