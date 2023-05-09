<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CourseTasks extends Pivot
{
    use HasFactory;

    protected $table = 'course_tasks';

    public function course(){
        return $this->belongsTo(Course::class);
    }

    public function task(){
        return $this->belongsTo(Task::class);
    }
}
