<?php

namespace App\Providers;

use App\Jobs\CamundaJob;
use Illuminate\Support\ServiceProvider;
use Laravolt\Camunda\Http\ExternalTaskClient;
use Illuminate\Support\Facades\Queue;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->register(\L5Swagger\L5SwaggerServiceProvider::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        ExternalTaskClient::subscribe('charge-card', CamundaJob::class);
    }
}
