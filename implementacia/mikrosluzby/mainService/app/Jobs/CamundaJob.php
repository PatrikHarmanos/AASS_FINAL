<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Laravolt\Camunda\Dto\ExternalTask;
use Laravolt\Camunda\Http\ExternalTaskClient;

class CamundaJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $workerId;
    protected $task;

    /**
     * Create a new job instance.
     *
     * @param string $workerId
     * @param ExternalTask $task
     */
    public function __construct(string $workerId, ExternalTask $task)
    {
        $this->workerId = $workerId;
        $this->task = $task;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Process the external task
        // ...
        error_log('TESTING CAMUNDA JOB');

        // Complete the task
        ExternalTaskClient::complete($this->task->id, $this->workerId);
    }
}
